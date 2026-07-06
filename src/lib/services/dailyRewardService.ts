import { ApiError } from '../api/errors'
import {
  dailyRewardRepository,
  type DailyRewardDefinition,
  type PlayerDailyReward,
} from '../repositories/dailyRewardRepository'
import {
  rewardEngineService,
  type RewardEntry,
  type RewardProcessingResult,
  type RewardRequest,
} from './rewardEngineService'
import type { UnlockType } from '../repositories/unlockRepository'

export interface DailyRewardSummary {
  definitions: DailyRewardDefinition[]
  playerReward: PlayerDailyReward
  eligibleToClaim: boolean
  pendingReward: DailyRewardDefinition | null
  rewardRequest: RewardRequest | null
  rewardProcessingResult: RewardProcessingResult | null
}

const DAILY_REWARD_COOLDOWN_MS = 24 * 60 * 60 * 1000
const DAILY_REWARD_SOURCE_DOMAIN = 'daily_rewards'
const SUPPORTED_UNLOCK_TYPES: readonly UnlockType[] = [
  'character',
  'cosmetic',
  'reward',
  'weapon',
  'ability',
  'feature',
]

function isSupportedUnlockType(value: string): value is UnlockType {
  return SUPPORTED_UNLOCK_TYPES.includes(value as UnlockType)
}

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

function getStringField(
  record: Record<string, unknown> | null,
  keys: string[],
): string | null {
  if (!record) return null

  for (const key of keys) {
    const value = record[key]
    if (typeof value === 'string' && value.length > 0) {
      return value
    }
  }

  return null
}

function createRewardEntry(definition: DailyRewardDefinition): RewardEntry {
  const rewardType = definition.reward_type
  const amount = definition.reward_amount

  if (rewardType === 'coins' || rewardType === 'gems' || rewardType === 'xp') {
    return { type: rewardType, amount }
  }

  if (rewardType === 'inventory_item') {
    const itemId = getStringField(definition.reward_bundle, ['itemId', 'item_id'])
    if (!itemId) {
      throw new ApiError(
        'BAD_REQUEST',
        'Daily reward inventory_item definitions require itemId in reward_bundle',
        400,
      )
    }

    return { type: 'inventory_item', itemId, amount }
  }

  if (rewardType === 'unlock') {
    const unlockKey = getStringField(definition.reward_bundle, ['unlockKey', 'unlock_key'])
    const unlockType = getStringField(definition.reward_bundle, ['unlockType', 'unlock_type'])
    if (!unlockKey) {
      throw new ApiError(
        'BAD_REQUEST',
        'Daily reward unlock definitions require unlockKey in reward_bundle',
        400,
      )
    }

    return {
      type: 'unlock',
      unlockKey,
      unlockType:
        unlockType !== null && isSupportedUnlockType(unlockType) ? unlockType : undefined,
    }
  }

  if (rewardType === 'bundle' || (!rewardType && definition.reward_bundle)) {
    const bundleId = getStringField(definition.reward_bundle, ['bundleId', 'bundle_id', 'id', 'key'])
    if (!bundleId) {
      throw new ApiError(
        'BAD_REQUEST',
        'Daily reward bundle definitions require bundleId in reward_bundle',
        400,
      )
    }

    return { type: 'bundle', bundleId }
  }

  throw new ApiError('BAD_REQUEST', 'Daily reward definition has no supported reward type', 400)
}

function createDailyRewardRequest(
  playerId: string,
  definition: DailyRewardDefinition,
  claimNumber: number,
  createdAt: string,
): RewardRequest {
  const sourceReference = `daily_reward_day_${definition.day}:claim_${claimNumber}`

  return {
    requestId: `${DAILY_REWARD_SOURCE_DOMAIN}:${playerId}:claim:${claimNumber}`,
    playerId,
    sourceDomain: DAILY_REWARD_SOURCE_DOMAIN,
    sourceReference,
    rewards: [createRewardEntry(definition)],
    metadata: {
      rewardDay: definition.day,
      claimNumber,
      rewardType: definition.reward_type,
      rewardAmount: definition.reward_amount,
      rewardBundle: definition.reward_bundle,
    },
    createdAt,
  }
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

    const nextClaimNumber = playerReward.total_claims + 1
    const rewardRequest = pendingReward
      ? createDailyRewardRequest(
          playerId,
          pendingReward,
          nextClaimNumber,
          new Date().toISOString(),
        )
      : null

    return {
      definitions,
      playerReward,
      eligibleToClaim,
      pendingReward,
      rewardRequest,
      rewardProcessingResult: null,
    }
  },

  async claimDailyReward(playerId: string): Promise<DailyRewardSummary> {
    const summary = await dailyRewardService.getDailyRewardSummary(playerId)

    if (!summary.eligibleToClaim) {
      throw new ApiError('CONFLICT', 'Daily reward is not yet eligible to claim', 409)
    }

    if (!summary.pendingReward) {
      throw new ApiError('NOT_FOUND', 'No pending daily reward definition found', 404)
    }

    const now = new Date()
    const claimNumber = summary.playerReward.total_claims + 1
    const streak = summary.pendingReward.day

    const updatedRecord: PlayerDailyReward = {
      ...summary.playerReward,
      current_streak: streak,
      total_claims: claimNumber,
      last_claim_day: summary.pendingReward.day,
      last_claimed_at: now.toISOString(),
      next_eligible_claim_at: new Date(now.getTime() + DAILY_REWARD_COOLDOWN_MS).toISOString(),
      updated_at: now.toISOString(),
    }

    await dailyRewardRepository.upsertPlayerDailyReward(updatedRecord)

    const rewardRequest = createDailyRewardRequest(
      playerId,
      summary.pendingReward,
      claimNumber,
      now.toISOString(),
    )

    const rewardProcessingResult = await rewardEngineService.processRewardRequest(
      rewardRequest,
    )

    const updatedSummary = await dailyRewardService.getDailyRewardSummary(playerId)

    return {
      ...updatedSummary,
      rewardRequest,
      rewardProcessingResult,
    }
  },
}
