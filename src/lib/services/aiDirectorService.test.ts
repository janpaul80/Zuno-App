import { describe, expect, it, vi } from 'vitest'

// Mock all downstream services so tests don't touch Supabase env/network.
vi.mock('@/lib/services/playerProfileService', () => ({
  playerProfileService: {
    getProfileSummary: vi.fn(async () => ({ player: { id: 'p1' }, profile: {}, currency: {}, inventory: [] })),
  },
}))

vi.mock('@/lib/services/unlockService', () => ({
  unlockService: {
    getPlayerUnlocks: vi.fn(async () => []),
  },
}))

vi.mock('@/lib/services/progressionService', () => ({
  progressionService: {
    getProgression: vi.fn(async () => ({ player_id: 'p1', level: 1, xp: 0, xp_to_next: 100, created_at: '', updated_at: '' })),
  },
}))

vi.mock('@/lib/services/questService', () => ({
  questService: {
    getQuestsForPlayer: vi.fn(async () => ({ definitions: [], progress: [] })),
  },
}))

vi.mock('@/lib/services/achievementService', () => ({
  achievementService: {
    getAchievementsForPlayer: vi.fn(async () => ({ definitions: [], progress: [] })),
  },
}))

vi.mock('@/lib/services/shopService', () => ({
  shopService: {
    listActiveItems: vi.fn(async () => []),
  },
}))

vi.mock('@/lib/providers/langdock/langdockClient', () => ({
  langdockClient: {
    chat: vi.fn(async () => ({ content: 'hello guardian' })),
  },
}))

import { aiDirectorService } from '@/lib/services/aiDirectorService'

describe('aiDirectorService', () => {
  it('builds read-only context and replies via LLM', async () => {
    const { langdockClient } = await import('@/lib/providers/langdock/langdockClient')

    const res = await aiDirectorService.replyToPlayerMessage({
      playerId: 'p1',
      message: 'What should I do next?',
    })

    expect(res.reply).toBe('hello guardian')
    expect(langdockClient.chat).toHaveBeenCalledTimes(1)
  })

  it('rejects empty messages', async () => {
    await expect(
      aiDirectorService.replyToPlayerMessage({ playerId: 'p1', message: '' }),
    ).rejects.toMatchObject({ code: 'BAD_REQUEST' })
  })
})
