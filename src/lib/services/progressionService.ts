import { ApiError } from '../api/errors'
import {
  progressionRepository,
  type PlayerProgressionRecord,
} from '../repositories/progressionRepository'

const BASE_XP_TO_NEXT_LEVEL = 100
const XP_GROWTH_RATE = 1.2

export interface GrantXpInput {
  playerId: string
  amount: number
  sourceDomain: string
  sourceReference: string
  requestId: string
}

export interface ProgressionGrantResult extends PlayerProgressionRecord {
  levels_gained: number
  xp_granted: number
  source_domain: string
  source_reference: string
  request_id: string
}

function calculateXpToNextLevel(level: number): number {
  return Math.floor(BASE_XP_TO_NEXT_LEVEL * XP_GROWTH_RATE ** (level - 1))
}

function createDefaultProgression(playerId: string): PlayerProgressionRecord {
  const now = new Date().toISOString()

  return {
    player_id: playerId,
    level: 1,
    xp: 0,
    xp_to_next: calculateXpToNextLevel(1),
    created_at: now,
    updated_at: now,
  }
}

function applyXpGrant(
  progression: PlayerProgressionRecord,
  xpAmount: number,
): { record: PlayerProgressionRecord; levelsGained: number } {
  let level = progression.level
  let xp = progression.xp + xpAmount
  let xpToNext = progression.xp_to_next || calculateXpToNextLevel(level)
  let levelsGained = 0

  while (xp >= xpToNext) {
    xp -= xpToNext
    level += 1
    levelsGained += 1
    xpToNext = calculateXpToNextLevel(level)
  }

  return {
    record: {
      ...progression,
      level,
      xp,
      xp_to_next: xpToNext,
      updated_at: new Date().toISOString(),
    },
    levelsGained,
  }
}

export const progressionService = {
  calculateXpToNextLevel,

  async getProgression(playerId: string): Promise<PlayerProgressionRecord> {
    return (
      (await progressionRepository.getPlayerProgression(playerId)) ??
      createDefaultProgression(playerId)
    )
  },

  async grantXp(input: GrantXpInput): Promise<ProgressionGrantResult> {
    if (!input.playerId) {
      throw new ApiError('BAD_REQUEST', 'playerId is required', 400)
    }

    if (typeof input.amount !== 'number' || input.amount <= 0) {
      throw new ApiError('BAD_REQUEST', 'XP grant amount must be positive', 400)
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

    const currentProgression = await progressionService.getProgression(input.playerId)
    const { record, levelsGained } = applyXpGrant(currentProgression, input.amount)
    const savedRecord = await progressionRepository.upsertPlayerProgression(record)

    return {
      ...savedRecord,
      levels_gained: levelsGained,
      xp_granted: input.amount,
      source_domain: input.sourceDomain,
      source_reference: input.sourceReference,
      request_id: input.requestId,
    }
  },
}
