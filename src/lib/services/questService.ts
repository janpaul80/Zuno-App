import { questRepository } from '../repositories/questRepository'
import { ApiError } from '../api/errors'

export interface QuestSummary {
  definitions: Awaited<ReturnType<typeof questRepository.listDefinitions>>
  progress: Awaited<ReturnType<typeof questRepository.listPlayerQuests>>
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
  async recordProgress(playerId: string, questKey: string, increment: number): Promise<void> {
    if (increment <= 0) {
      throw new ApiError('BAD_REQUEST', 'Invalid progress increment', 400)
    }

    const definition = await questRepository.getDefinitionByKey(questKey)
    if (!definition) {
      throw new ApiError('NOT_FOUND', 'Quest definition missing', 404)
    }

    const existing = await questRepository.getPlayerQuest(playerId, questKey)

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

    // TODO: reward hooks for completed/claimed quests (future integration)
  },
}
