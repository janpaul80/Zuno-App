import { describe, expect, it, vi } from 'vitest'

vi.mock('../repositories/progressionRepository', () => {
  return {
    progressionRepository: {
      getPlayerProgression: vi.fn(async () => null),
      upsertPlayerProgression: vi.fn(async (record: Record<string, unknown>) => record),
    },
  }
})

describe('progressionService XP math', () => {
  it('calculateXpToNextLevel grows with level (1.2^)', async () => {
    const { progressionService } = await import('./progressionService')

    const lvl1 = progressionService.calculateXpToNextLevel(1)
    const lvl2 = progressionService.calculateXpToNextLevel(2)
    const lvl3 = progressionService.calculateXpToNextLevel(3)

    expect(lvl1).toBe(100)
    expect(lvl2).toBeGreaterThan(lvl1)
    expect(lvl3).toBeGreaterThan(lvl2)
  })
})
