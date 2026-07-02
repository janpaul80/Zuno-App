import { ApiError } from '../api/errors'
import {
  dailyRewardRepository,
  type DailyRewardDefinition,
  type PlayerDailyReward,
} from '../repositories/dailyRewardRepository'

export interface RewardEngineRequest {
  source: 'daily_rewards'
  playerId: string
  rewardType: string | null
  rewardAmount: number
  rewardBundle: Record<string, unknown> | null
  reason: string
}

export interface DailyRewardSummary {
  definitions: DailyRewardDefinition[]
  playerReward: PlayerDailyReward
  eligibleToClaim: boolean
  pendingReward: DailyRewardDefinition | null
  rewardRequest: RewardEngineRequest | null
}

const DAILY_REWARD_COOLDOWN_MS = 24 * 60 * 60 * 1000

function createDefaultPlayerDailyReward(playerId: string): PlayerDailyReward {
  const now = new Date().toISOString()

  return {
    player_id: playerId,
    current_streak: 0,
    total_claims: 0,
    last_claim_day: null,
    last_claimed_at: null,
    next_eligible_claim_at: null,
    updated_at: now,
    created_at: now,
  }
}

function isEligibleToClaim(nextEligibleClaimAt: string | null): boolean {
  if (!nextEligibleClaimAt) {
    return true
  }

  return Date.now() >= new Date(nextEligibleClaimAt).getTime()
}

function resolveNextRewardDay(
  definitions: DailyRewardDefinition[],
  currentStreak: number,
): number {
  if (definitions.length === 0) {
    return 1
  }

  const maxDay = definitions[definitions.length - 1].day
  const nextDay = currentStreak + 1

  return nextDay > maxDay ? 1 : nextDay
}

export const dailyRewardService = {
  async getDailyRewardSummary(playerId: string): Promise<DailyRewardSummary> {
    const definitions = await dailyRewardRepository.listDefinitions()

    const playerReward =
      (await dailyRewardRepository.getPlayerDailyReward(playerId)) ??
      createDefaultPlayerDailyReward(playerId)

    const eligibleToClaim = isEligibleToClaim(playerReward.next_eligible_claim_at)
    const nextRewardDay = resolveNextRewardDay(definitions, playerReward.current_streak)
    const pendingReward = await dailyRewardRepository.getDefinitionByDay(nextRewardDay)

    const rewardRequest = pendingReward
      ? {
          source: 'daily_rewards' as const,
          playerId,
          rewardType: pendingReward.reward_type,
          rewardAmount: pendingReward.reward_amount,
          rewardBundle: pendingReward.reward_bundle,
          reason: `daily_reward_day_${pendingReward.day}`,
        }
      : null

    return {
      definitions,
      playerReward,
      eligibleToClaim,
      pendingReward,
      rewardRequest,
    }
  },

  async claimDailyReward(playerId: string): Promise<DailyRewardSummary> {
    const summary = await this.getDailyRewardSummary(playerId)

    if (!summary.eligibleToClaim) {
      throw new ApiError('CONFLICT', 'Daily reward is not yet eligible to claim', 409)
    }

    if (!summary.pendingReward) {
      throw new ApiError('NOT_FOUND', 'No pending daily reward definition found', 404)
    }

    const now = new Date()
    const streak = summary.pendingReward.day

    const updatedRecord: PlayerDailyReward = {
      ...summary.playerReward,
      current_streak: streak,
      total_claims: summary.playerReward.total_claims + 1,
      last_claim_day: summary.pendingReward.day,
      last_claimed_at: now.toISOString(),
      next_eligible_claim_at: new Date(now.getTime() + DAILY_REWARD_COOLDOWN_MS).toISOString(),
      updated_at: now.toISOString(),
    }

    await dailyRewardRepository.upsertPlayerDailyReward(updatedRecord)

    // TODO(Reward Engine v1):
    // Submit rewardRequest to Reward Engine after successful metadata update.
    // Daily Rewards must never grant rewards directly.

    return this.getDailyRewardSummary(playerId)
  },
}
