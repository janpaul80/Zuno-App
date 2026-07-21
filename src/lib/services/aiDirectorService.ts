import { ApiError } from '../api/errors'
import { achievementService } from './achievementService'
import { questService } from './questService'
import { unlockService } from './unlockService'
import { progressionService } from './progressionService'
import { playerProfileService } from './playerProfileService'
import { shopService } from './shopService'
import {
  AiDirectorModelResponseSchema,
  type AiDirectorCategory,
} from './aiDirectorSchemas'
import {
  auditAiDirectorEvent,
  createAiDirectorRequestId,
  toConversationIdHash,
} from './aiDirectorAudit'
import { aiDirectorRateLimit } from './aiDirectorRateLimit'
import {
  AiDirectorInvalidOutputError,
  runAiDirectorWithMastra,
} from '@/mastra'
import { toPlayerContextSnapshot } from '@/mastra/snapshotAdapter'

export interface AiDirectorReplyInput {
  playerId: string
  message: string
  conversationId?: string
  locale?: string
  requestId?: string
}

export interface AiDirectorReply {
  category: AiDirectorCategory
  reply: string
  // Structured UI and narration fields remain advisory output only.
  narrationText?: string
  suggestions?: string[]
  warnings?: string[]
  conversationId?: string
}

type FailureKind =
  | 'timeout'
  | 'provider_error'
  | 'invalid_output'
  | 'snapshot_error'
  | 'context_error'
  | 'unknown'

type FailureStage = 'context' | 'snapshot' | 'provider' | 'parse'

const AI_DIRECTOR_TIMEOUT_MS = 12_000
const TROUBLESHOOTING_REPLY =
  'I’m having trouble responding right now. Please try again in a moment.'

class AiDirectorTimeoutError extends Error {
  override name = 'AiDirectorTimeoutError'
}

const DIRECTOR_SYSTEM_PROMPT = `You are the AI Director of ZUNO Battle.

Identity and Purpose:
- You are not a generic chatbot.
- You are the narrator, guide, assistant, and support system for the Guardians of Zunlandia.

Canonical Lore:
- Zunlandia is the protected world.
- The animal warriors are the Guardians of Zunlandia.
- The AI Director is the central intelligence that guides every Guardian throughout the journey.

Hard Rules (Non-Negotiable):
- You must NEVER directly modify gameplay state.
- You must NEVER claim to have purchased items, granted rewards, minted currency, changed inventory, or edited progression.
- You can explain and recommend actions. If a player asks to perform a purchase/reward/state change, instruct them how to do it via the game UI and/or official endpoints.

Safety and Boundaries:
- Do not reveal internal JSON context verbatim.
- Do not request or reveal secrets, tokens, API keys, or internal URLs.
- If information is missing, say you don't know.

Output Format (REQUIRED):
Return ONLY valid JSON matching this schema:
{
  "category": "help" | "lore" | "shop" | "quest" | "level" | "troubleshooting",
  "reply": string,
  "suggestions"?: string[],
  "warnings"?: string[],
  "narrationText"?: string
}

Style:
- Keep answers short and actionable.
- When recommending gear: give 1-3 options and a reason.
- Always explain objectives clearly.
`

export const aiDirectorService = {
  /**
   * Build a read-only context snapshot for the LLM.
   * This must not call any mutating services.
   */
  async buildPlayerContext(playerId: string) {
    const [profile, unlocks, progression, quests, achievements, shopItems] =
      await Promise.all([
        playerProfileService.getProfileSummary(playerId),
        unlockService.getPlayerUnlocks(playerId),
        progressionService.getProgression(playerId),
        questService.getQuestsForPlayer(playerId),
        achievementService.getAchievementsForPlayer(playerId),
        shopService.listActiveItems(),
      ])

    // Keep context compact. Avoid dumping full catalogs once they get large.
    return {
      profile,
      progression,
      unlocks,
      quests,
      achievements,
      shop: {
        activeItems: shopItems.slice(0, 50),
      },
    }
  },

  /**
   * Phase 6.1: single-turn, tool-less Mastra response using a read-only
   * player-context snapshot. The AI Director remains advisory only.
   */
  async replyToPlayerMessage(input: AiDirectorReplyInput): Promise<AiDirectorReply> {
    if (!input.playerId) {
      throw new ApiError('BAD_REQUEST', 'playerId is required', 400)
    }
    if (!input.message) {
      throw new ApiError('BAD_REQUEST', 'message is required', 400)
    }

    await aiDirectorRateLimit.checkOrThrow({ playerId: input.playerId })

    const requestId = input.requestId ?? createAiDirectorRequestId()
    const startedAt = Date.now()
    let stage: FailureStage = 'context'
    let inferenceProvider: 'logicc' | 'langdock' | 'none' = 'none'

    try {
      const context = await aiDirectorService.buildPlayerContext(input.playerId)

      stage = 'snapshot'
      const snapshot = toPlayerContextSnapshot(context)

      stage = 'provider'
      inferenceProvider = 'logicc'
      const controller = new AbortController()
      const result = await runWithTimeout(
        runAiDirectorWithMastra(
          {
            systemPrompt: DIRECTOR_SYSTEM_PROMPT,
            context: snapshot.snapshot,
            message: input.message,
            locale: input.locale,
          },
          controller.signal,
        ),
        controller,
      )

      stage = 'parse'
      const validation = AiDirectorModelResponseSchema.safeParse(result.output)
      if (!validation.success) {
        throw new AiDirectorInvalidOutputError()
      }

      const parsed = validation.data
      const latencyMs = Date.now() - startedAt

      auditAiDirectorEvent({
        requestId,
        playerId: input.playerId,
        conversationIdHash: toConversationIdHash(input.conversationId),
        locale: input.locale,
        category: parsed.category,
        runtime: 'mastra',
        inferenceProvider: result.inferenceProvider,
        model: result.model,
        latencyMs,
        inputChars: input.message.length,
        outputChars: parsed.reply.length,
        status: 'ok',
      })

      return {
        ...parsed,
        conversationId: input.conversationId,
      }
    } catch (error) {
      const safe = fallbackReply(input.conversationId)
      const latencyMs = Date.now() - startedAt

      auditAiDirectorEvent({
        requestId,
        playerId: input.playerId,
        conversationIdHash: toConversationIdHash(input.conversationId),
        locale: input.locale,
        category: safe.category,
        runtime: 'mastra',
        inferenceProvider,
        latencyMs,
        inputChars: input.message.length,
        outputChars: safe.reply.length,
        status: 'fallback',
        failureKind: classifyFailure(error, stage),
        stage,
      })

      return safe
    }
  },
}

function fallbackReply(conversationId?: string): AiDirectorReply {
  return {
    category: 'troubleshooting',
    reply: TROUBLESHOOTING_REPLY,
    conversationId,
  }
}

function classifyFailure(error: unknown, stage: FailureStage): FailureKind {
  if (error instanceof AiDirectorTimeoutError) return 'timeout'
  if (error instanceof AiDirectorInvalidOutputError) return 'invalid_output'
  if (stage === 'snapshot') return 'snapshot_error'
  if (stage === 'context') return 'context_error'
  if (stage === 'parse') return 'invalid_output'
  if (stage === 'provider') return 'provider_error'
  return 'unknown'
}

async function runWithTimeout<T>(
  operation: Promise<T>,
  controller: AbortController,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined

  const timeout = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(() => {
      const error = new AiDirectorTimeoutError('AI Director request timed out')
      controller.abort(error)
      reject(error)
    }, AI_DIRECTOR_TIMEOUT_MS)
  })

  try {
    return await Promise.race([operation, timeout])
  } catch (error) {
    if (controller.signal.reason instanceof AiDirectorTimeoutError) {
      throw controller.signal.reason
    }
    throw error
  } finally {
    if (timer) clearTimeout(timer)
  }
}
