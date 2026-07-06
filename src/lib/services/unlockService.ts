import { ApiError } from '../api/errors'
import {
  unlockRepository,
  type PlayerUnlock,
  type UnlockType,
} from '../repositories/unlockRepository'

export interface GrantUnlockInput {
  playerId: string
  unlockKey: string
  unlockType: UnlockType
  sourceDomain: string
  sourceReference: string
  requestId: string
}

export interface UnlockGrantResult extends PlayerUnlock {
  already_unlocked: boolean
  source_domain: string
  source_reference: string
  request_id: string
}

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

export const unlockService = {
  /** Get all unlocks for a player */
  async getPlayerUnlocks(playerId: string): Promise<PlayerUnlock[]> {
    return unlockRepository.findAllByPlayerId(playerId)
  },

  /** Grant an unlock on the server if not already granted (idempotent). */
  async grantUnlock(input: GrantUnlockInput): Promise<UnlockGrantResult> {
    if (!input.playerId) {
      throw new ApiError('BAD_REQUEST', 'playerId is required', 400)
    }

    if (!input.unlockKey) {
      throw new ApiError('BAD_REQUEST', 'unlockKey is required', 400)
    }

    if (!isSupportedUnlockType(input.unlockType)) {
      throw new ApiError('BAD_REQUEST', `Unsupported unlock type: ${input.unlockType}`, 400)
    }

    if (!input.sourceDomain) {
      throw new ApiError('BAD_REQUEST', 'sourceDomain is required', 400)
    }

    if (!input.sourceReference) {
      throw new ApiError('BAD_REQUEST', 'sourceReference is required', 400)
    }

    if (!input.requestId) {
      throw new ApiError('BAD_REQUEST', 'requestId is required', 400)
    }

    const existing = await unlockRepository.findByPlayerIdAndKey(
      input.playerId,
      input.unlockKey,
    )

    if (existing) {
      return {
        ...existing,
        already_unlocked: true,
        source_domain: input.sourceDomain,
        source_reference: input.sourceReference,
        request_id: input.requestId,
      }
    }

    const record: PlayerUnlock = {
      player_id: input.playerId,
      unlock_key: input.unlockKey,
      unlock_type: input.unlockType,
      granted_at: new Date().toISOString(),
    }

    const inserted = await unlockRepository.insertUnlock(record)

    return {
      ...inserted,
      already_unlocked: false,
      source_domain: input.sourceDomain,
      source_reference: input.sourceReference,
      request_id: input.requestId,
    }
  },
}
