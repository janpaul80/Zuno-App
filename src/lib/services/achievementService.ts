import { achievementRepository } from '../repositories/achievementRepository'
import type { AchievementDefinition } from '../repositories/achievementRepository'
import { ApiError } from '../api/errors'
import {
  rewardEngineService,
  type RewardEntry,
  type RewardProcessingResult,
  type RewardRequest,
} from './rewardEngineService'

export interface AchievementSummary {
  definitions: Awaited<ReturnType<typeof achievementRepository.listDefinitions>>
  progress: Awaited<ReturnType<typeof achievementRepository.listPlayerAchievements>>
}

export interface AchievementProgressResult {
  rewardProcessingResult: RewardProcessingResult | null
}

const ACHIEVEMENT_SOURCE_DOMAIN = 'achievements'

function createAchievementRewardEntry(definition: AchievementDefinition): RewardEntry {
  const rewardType = definition.reward_type
  const rewardAmount = definition.reward_amount

  if (rewardType === 'coins' || rewardType === 'gems' || rewardType === 'xp') {
    return { type: rewardType, amount: rewardAmount }
  }

  throw new ApiError(
    'BAD_REQUEST',
    `Achievement ${definition.key} has no supported Reward Engine reward type`,
    400,
  )
}

function createAchievementRewardRequest(
  playerId: string,
  definition: AchievementDefinition,
  completedAt: string,
): RewardRequest {
  return {
    requestId: `${ACHIEVEMENT_SOURCE_DOMAIN}:${playerId}:${definition.key}`,
    playerId,
    sourceDomain: ACHIEVEMENT_SOURCE_DOMAIN,
    sourceReference: definition.key,
    rewards: [createAchievementRewardEntry(definition)],
    metadata: {
      achievementKey: definition.key,
      achievementName: definition.name,
      targetValue: definition.target_value,
      completedAt,
      rewardType: definition.reward_type,
      rewardAmount: definition.reward_amount,
    },
    createdAt: completedAt,
  }
}

export const achievementService = {
  /** Return composite achievement summary for a player */
  async getAchievementsForPlayer(playerId: string): Promise<AchievementSummary> {
    const [definitions, playerAchievements] = await Promise.all([
      achievementRepository.listDefinitions(),
      achievementRepository.listPlayerAchievements(playerId),
    ])

    return { definitions, progress: playerAchievements }
  },

  /** Internal-only trusted server call to record progress */
  async recordProgress(
    playerId: string,
    achievementKey: string,
    increment: number,
  ): Promise<AchievementProgressResult> {
    if (increment <= 0) {
      throw new ApiError('BAD_REQUEST', 'Invalid progress increment', 400)
    }

    const definition = await achievementRepository.getDefinitionByKey(achievementKey)
    if (!definition) {
      throw new ApiError('NOT_FOUND', 'Achievement definition missing', 404)
    }

    const existing = await achievementRepository.getPlayerAchievement(playerId, achievementKey)

    const wasAlreadyCompleted = existing?.completed ?? false
    const newProgress = Math.min(
      (existing?.progress ?? 0) + increment,
      definition.target_value,
    )
    const isCompleted = newProgress >= definition.target_value

    const completedAt =
      existing?.completed_at ?? (isCompleted ? new Date().toISOString() : null)

    const record = {
      player_id: playerId,
      achievement_key: achievementKey,
      progress: newProgress,
      completed: isCompleted,
      completed_at: completedAt,
      updated_at: new Date().toISOString(),
    }

    await achievementRepository.upsertPlayerAchievement(record)

    if (!wasAlreadyCompleted && isCompleted && completedAt) {
      const rewardRequest = createAchievementRewardRequest(
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
