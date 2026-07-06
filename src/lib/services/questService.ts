import { questRepository } from '../repositories/questRepository'
import type { QuestDefinition } from '../repositories/questRepository'
import { ApiError } from '../api/errors'
import {
  rewardEngineService,
  type RewardEntry,
  type RewardProcessingResult,
  type RewardRequest,
} from './rewardEngineService'

export interface QuestSummary {
  definitions: Awaited<ReturnType<typeof questRepository.listDefinitions>>
  progress: Awaited<ReturnType<typeof questRepository.listPlayerQuests>>
}

export interface QuestProgressResult {
  rewardProcessingResult: RewardProcessingResult | null
}

const QUEST_SOURCE_DOMAIN = 'quests'

function createQuestRewardEntry(definition: QuestDefinition): RewardEntry {
  const rewardType = definition.reward_type
  const rewardAmount = definition.reward_amount

  if (rewardType === 'coins' || rewardType === 'gems' || rewardType === 'xp') {
    return { type: rewardType, amount: rewardAmount }
  }

  throw new ApiError(
    'BAD_REQUEST',
    `Quest ${definition.key} has no supported Reward Engine reward type`,
    400,
  )
}

function createQuestRewardRequest(
  playerId: string,
  definition: QuestDefinition,
  completedAt: string,
): RewardRequest {
  return {
    requestId: `${QUEST_SOURCE_DOMAIN}:${playerId}:${definition.key}`,
    playerId,
    sourceDomain: QUEST_SOURCE_DOMAIN,
    sourceReference: definition.key,
    rewards: [createQuestRewardEntry(definition)],
    metadata: {
      questKey: definition.key,
      questName: definition.name,
      targetValue: definition.target_value,
      completedAt,
      rewardType: definition.reward_type,
      rewardAmount: definition.reward_amount,
    },
    createdAt: completedAt,
  }
}

export const questService = {
  /** Returns full quest summary for player */
  async getQuestsForPlayer(playerId: string): Promise<QuestSummary> {
    const [definitions, playerQuests] = await Promise.all([
      questRepository.listDefinitions(),
      questRepository.listPlayerQuests(playerId),
    ])
    return { definitions, progress: playerQuests }
  },

  /** Internal-only trusted call to record progress */
  async recordProgress(
    playerId: string,
    questKey: string,
    increment: number,
  ): Promise<QuestProgressResult> {
    if (increment <= 0) {
      throw new ApiError('BAD_REQUEST', 'Invalid progress increment', 400)
    }

    const definition = await questRepository.getDefinitionByKey(questKey)
    if (!definition) {
      throw new ApiError('NOT_FOUND', 'Quest definition missing', 404)
    }

    const existing = await questRepository.getPlayerQuest(playerId, questKey)

    const wasAlreadyCompleted = existing?.completed ?? false
    const currentProgress = existing?.progress ?? 0
    const newProgress = Math.min(currentProgress + increment, definition.target_value)
    const isCompleted = newProgress >= definition.target_value

    const completedAt =
      existing?.completed_at ?? (isCompleted ? new Date().toISOString() : null)

    const record = {
      player_id: playerId,
      quest_key: questKey,
      progress: newProgress,
      completed: isCompleted,
      claimed: existing?.claimed ?? false,
      completed_at: completedAt,
      claimed_at: existing?.claimed_at ?? null,
      updated_at: new Date().toISOString(),
    }

    await questRepository.upsertPlayerQuest(record)

    if (!wasAlreadyCompleted && isCompleted && completedAt) {
      const rewardRequest = createQuestRewardRequest(
        playerId,
        definition,
        completedAt,
      )
      const rewardProcessingResult = await rewardEngineService.processRewardRequest(
        rewardRequest,
      )

      return { rewardProcessingResult }
    }

    return { rewardProcessingResult: null }
  },
}
