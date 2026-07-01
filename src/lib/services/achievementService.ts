import { achievementRepository } from '../repositories/achievementRepository'
import { ApiError } from '../api/errors'

export interface AchievementSummary {
  definitions: Awaited<ReturnType<typeof achievementRepository.listDefinitions>>
  progress: Awaited<ReturnType<typeof achievementRepository.listPlayerAchievements>>
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
  async recordProgress(playerId: string, achievementKey: string, increment: number): Promise<void> {
    if (increment <= 0) {
      throw new ApiError('BAD_REQUEST', 'Invalid progress increment', 400)
    }

    const definition = await achievementRepository.getDefinitionByKey(achievementKey)
    if (!definition) {
      throw new ApiError('NOT_FOUND', 'Achievement definition missing', 404)
    }

    const existing = await achievementRepository.getPlayerAchievement(playerId, achievementKey)

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

    // TODO: reward hooks for completed achievements in future domains
  },
}
