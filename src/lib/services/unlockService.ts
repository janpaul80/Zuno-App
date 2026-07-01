import { unlockRepository, PlayerUnlock } from '../repositories/unlockRepository'
import { ApiError } from '../api/errors'

export const unlockService = {
  /** Get all unlocks for a player */
  async getPlayerUnlocks(playerId: string): Promise<PlayerUnlock[]> {
    return await unlockRepository.findAllByPlayerId(playerId)
  },

  /** Grant an unlock on the server if not already granted (idempotent) */
  async grantUnlock(
    playerId: string,
    unlockKey: string,
    unlockType: PlayerUnlock['unlock_type'],
  ): Promise<PlayerUnlock> {
    const existing = await unlockRepository.findByPlayerIdAndKey(playerId, unlockKey)

    // Idempotent: if already unlocked, return existing
    if (existing) return existing

    const record: PlayerUnlock = {
      player_id: playerId,
      unlock_key: unlockKey,
      unlock_type: unlockType,
      granted_at: new Date().toISOString(),
    }

    const inserted = await unlockRepository.insertUnlock(record)

    // Future hooks for achievements / rewards
    // await rewardService.handleUnlockReward(playerId, inserted)

    return inserted
  },
}
