import { ApiError } from '../api/errors'
import {
  rewardEngineRepository,
  type RewardEventRecord,
  type RewardRequestStatus,
  type ProcessRewardRequestRpcResult,
} from '../repositories/rewardEngineRepository'
import type { UnlockType } from '../repositories/unlockRepository'

const SUPPORTED_REWARD_TYPES = [
  'xp',
  'coins',
  'gems',
  'inventory_item',
  'unlock',
  'bundle',
] as const

type SupportedRewardType = (typeof SUPPORTED_REWARD_TYPES)[number]
type UnlockRewardType = Extract<SupportedRewardType, 'unlock'>

export interface RewardEntry {
  type: SupportedRewardType
  amount?: number
  itemId?: string
  unlockKey?: string
  unlockType?: UnlockType
  bundleId?: string
}

export interface RewardRequest {
  requestId: string
  playerId: string
  sourceDomain: string
  sourceReference: string
  rewards: RewardEntry[]
  metadata: Record<string, unknown>
  createdAt: string
}

export interface RewardProcessingResult {
  requestId: string
  status: RewardRequestStatus
  processedAt: string | null
  alreadyProcessed: boolean
}

function toProcessingResult(
  row: ProcessRewardRequestRpcResult,
  alreadyProcessed: boolean,
): RewardProcessingResult {
  return {
    requestId: row.request_id,
    status: row.status,
    processedAt: row.processed_at,
    alreadyProcessed,
  }
}

function isSupportedRewardType(value: string): value is SupportedRewardType {
  return SUPPORTED_REWARD_TYPES.includes(value as SupportedRewardType)
}

function isUnlockRewardType(type: SupportedRewardType): type is UnlockRewardType {
  return type === 'unlock'
}

function getMetadataString(
  metadata: Record<string, unknown>,
  keys: string[],
): string | null {
  for (const key of keys) {
    const value = metadata[key]
    if (typeof value === 'string' && value.length > 0) {
      return value
    }
  }

  return null
}

function validateRewardEntry(reward: RewardEntry): void {
  if (!isSupportedRewardType(reward.type)) {
    throw new ApiError('BAD_REQUEST', `Unsupported reward type: ${reward.type}`, 400)
  }

  if (
    reward.type === 'xp' ||
    reward.type === 'coins' ||
    reward.type === 'gems'
  ) {
    if (typeof reward.amount !== 'number' || reward.amount <= 0) {
      throw new ApiError('BAD_REQUEST', `Reward amount must be positive for ${reward.type}`, 400)
    }
  }

  if (reward.type === 'inventory_item') {
    if (!reward.itemId) {
      throw new ApiError('BAD_REQUEST', 'inventory_item rewards require itemId', 400)
    }

    if (typeof reward.amount !== 'number' || reward.amount <= 0) {
      throw new ApiError(
        'BAD_REQUEST',
        'inventory_item rewards require a positive quantity',
        400,
      )
    }
  }

  if (reward.type === 'unlock' && !reward.unlockKey) {
    throw new ApiError('BAD_REQUEST', 'unlock rewards require unlockKey', 400)
  }

  if (reward.type === 'bundle' && !reward.bundleId) {
    throw new ApiError('BAD_REQUEST', 'bundle rewards require bundleId', 400)
  }
}

function validateRewardRequest(request: RewardRequest): void {
  if (!request.requestId) {
    throw new ApiError('BAD_REQUEST', 'requestId is required', 400)
  }

  if (!request.playerId) {
    throw new ApiError('BAD_REQUEST', 'playerId is required', 400)
  }

  if (!request.sourceDomain) {
    throw new ApiError('BAD_REQUEST', 'sourceDomain is required', 400)
  }

  if (!request.sourceReference) {
    throw new ApiError('BAD_REQUEST', 'sourceReference is required', 400)
  }

  if (request.rewards.length === 0) {
    throw new ApiError('BAD_REQUEST', 'At least one reward entry is required', 400)
  }

  request.rewards.forEach(validateRewardEntry)
}

export const rewardEngineService = {
  async processRewardRequest(
    request: RewardRequest,
  ): Promise<RewardProcessingResult> {
    validateRewardRequest(request)

    const existing = await rewardEngineRepository.findRequestById(request.requestId)

    if (existing) {
      return {
        requestId: existing.request_id,
        status: existing.status,
        processedAt: existing.processed_at,
        alreadyProcessed: true,
      }
    }

    // The orchestration is now a single ACID RPC. This avoids partial success
    // across Economy/Inventory/Progression/Unlock referrals.
    const normalizedRewards = request.rewards.map((reward) => {
      if (isUnlockRewardType(reward.type)) {
        const unlockType =
          reward.unlockType ??
          (getMetadataString(request.metadata, ['unlockType', 'unlock_type']) as UnlockType | null) ??
          'reward'
        return { ...reward, unlockType }
      }
      return reward
    })

    const row = await rewardEngineRepository.processRewardRequestRpc({
      requestId: request.requestId,
      playerId: request.playerId,
      sourceDomain: request.sourceDomain,
      sourceReference: request.sourceReference,
      rewards: normalizedRewards,
      metadata: request.metadata,
      createdAt: request.createdAt,
    })

    return toProcessingResult(row, false)
  },

  async listPlayerRewardEvents(playerId: string): Promise<RewardEventRecord[]> {
    return rewardEngineRepository.listPlayerRewardEvents(playerId)
  },
}
