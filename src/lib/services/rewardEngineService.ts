import { ApiError } from '../api/errors'
import {
  rewardEngineRepository,
  type RewardEventRecord,
  type RewardRequestRecord,
  type RewardRequestStatus,
} from '../repositories/rewardEngineRepository'

const SUPPORTED_REWARD_TYPES = [
  'xp',
  'coins',
  'gems',
  'inventory_item',
  'unlock',
  'bundle',
] as const

type SupportedRewardType = (typeof SUPPORTED_REWARD_TYPES)[number]

export interface RewardEntry {
  type: SupportedRewardType
  amount?: number
  itemId?: string
  unlockKey?: string
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

function isSupportedRewardType(value: string): value is SupportedRewardType {
  return SUPPORTED_REWARD_TYPES.includes(value as SupportedRewardType)
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

  if (reward.type === 'inventory_item' && !reward.itemId) {
    throw new ApiError('BAD_REQUEST', 'inventory_item rewards require itemId', 400)
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

function createRewardRequestRecord(request: RewardRequest): RewardRequestRecord {
  return {
    request_id: request.requestId,
    player_id: request.playerId,
    source_domain: request.sourceDomain,
    source_reference: request.sourceReference,
    status: 'pending',
    rewards: request.rewards,
    metadata: request.metadata,
    error_message: null,
    processed_at: null,
    created_at: request.createdAt,
  }
}

function createRewardEventRecord(
  request: RewardRequest,
  reward: RewardEntry,
  status: RewardRequestStatus,
  errorMessage: string | null,
): RewardEventRecord {
  return {
    request_id: request.requestId,
    player_id: request.playerId,
    source_domain: request.sourceDomain,
    reward_type: reward.type,
    amount: reward.amount ?? null,
    status,
    metadata: {
      ...request.metadata,
      itemId: reward.itemId ?? null,
      unlockKey: reward.unlockKey ?? null,
      bundleId: reward.bundleId ?? null,
    },
    error_message: errorMessage,
  }
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

    await rewardEngineRepository.createRewardRequest(createRewardRequestRecord(request))

    try {
      for (const reward of request.rewards) {
        // TODO(Reward Engine v1): fan out to Economy / Inventory / Progression / Unlocks.
        // This v1 milestone establishes the canonical pipeline, validation, idempotency,
        // and audit trail without performing full downstream mutations.
        await rewardEngineRepository.createRewardEvent(
          createRewardEventRecord(request, reward, 'processed', null),
        )
      }

      const processedAt = new Date().toISOString()
      await rewardEngineRepository.updateRewardRequestStatus(
        request.requestId,
        'processed',
        processedAt,
        null,
      )

      return {
        requestId: request.requestId,
        status: 'processed',
        processedAt,
        alreadyProcessed: false,
      }
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Reward processing failed'

      for (const reward of request.rewards) {
        await rewardEngineRepository.createRewardEvent(
          createRewardEventRecord(request, reward, 'failed', message),
        )
      }

      await rewardEngineRepository.updateRewardRequestStatus(
        request.requestId,
        'failed',
        null,
        message,
      )

      if (error instanceof ApiError) {
        throw error
      }

      throw new ApiError('INTERNAL_ERROR', message, 500)
    }
  },

  async listPlayerRewardEvents(playerId: string): Promise<RewardEventRecord[]> {
    return rewardEngineRepository.listPlayerRewardEvents(playerId)
  },
}
