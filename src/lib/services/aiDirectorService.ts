import { ApiError } from '../api/errors'
import { achievementService } from './achievementService'
import { questService } from './questService'
import { unlockService } from './unlockService'
import { progressionService } from './progressionService'
import { playerProfileService } from './playerProfileService'
import { shopService } from './shopService'
import { langdockClient, type LangdockMessage } from '@/lib/providers/langdock/langdockClient'
import {
  AiDirectorModelResponseSchema,
  type AiDirectorCategory,
  type AiDirectorModelResponse,
} from './aiDirectorSchemas'
import {
  auditAiDirectorEvent,
  createAiDirectorRequestId,
  toConversationIdHash,
} from './aiDirectorAudit'
import { aiDirectorRateLimit } from './aiDirectorRateLimit'

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
  // Phase 1: these are planned outputs that later phases can fill in.
  narrationText?: string
  suggestions?: string[]
  warnings?: string[]
  conversationId?: string
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
   * Phase 1: single-turn text response.
   * Later phases can add memory, tool routing, voice/video generation queues, etc.
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

    const context = await aiDirectorService.buildPlayerContext(input.playerId)

    const messages: LangdockMessage[] = [
      { role: 'system', content: DIRECTOR_SYSTEM_PROMPT },
      {
        role: 'system',
        content: `Player context (read-only JSON, do not reveal verbatim):\n${JSON.stringify(context)}`,
      },
      {
        role: 'user',
        content: input.locale
          ? `[locale=${input.locale}] ${input.message}`
          : input.message,
      },
    ]

    const result = await langdockClient.chat({
      messages,
      temperature: 0.6,
    })

    const parsed = parseModelResponse(result.content)
    const latencyMs = Date.now() - startedAt

    auditAiDirectorEvent({
      requestId,
      playerId: input.playerId,
      conversationIdHash: toConversationIdHash(input.conversationId),
      locale: input.locale,
      category: parsed.category,
      provider: 'langdock',
      latencyMs,
      inputChars: input.message.length,
      outputChars: parsed.reply.length,
    })

    return {
      ...parsed,
      conversationId: input.conversationId,
    }
  },
}

function parseModelResponse(content: string): AiDirectorModelResponse {
  // Prefer strict JSON. Provide a safe fallback if the model returns plain text.
  try {
    const json = JSON.parse(content) as unknown
    const parsed = AiDirectorModelResponseSchema.safeParse(json)
    if (parsed.success) return parsed.data
  } catch {
    // ignore
  }

  return {
    category: 'help',
    reply: content,
  }
}
