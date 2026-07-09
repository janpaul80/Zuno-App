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
    chat: vi.fn(async () => ({
      content: JSON.stringify({
        category: 'help',
        reply: 'hello guardian',
        suggestions: ['Open the Quests tab', 'Equip your best gear'],
      }),
    })),
  },
}))

vi.mock('@/lib/services/aiDirectorAudit', () => ({
  auditAiDirectorEvent: vi.fn(),
  createAiDirectorRequestId: () => 'ai_director:test',
  toConversationIdHash: () => 'convhash',
}))

vi.mock('@/lib/services/aiDirectorRateLimit', () => ({
  aiDirectorRateLimit: {
    checkOrThrow: vi.fn(async () => undefined),
  },
}))

import { aiDirectorService } from '@/lib/services/aiDirectorService'

describe('aiDirectorService', () => {
  it('builds read-only context and replies via LLM', async () => {
    const { langdockClient } = await import('@/lib/providers/langdock/langdockClient')
    const { auditAiDirectorEvent } = await import('@/lib/services/aiDirectorAudit')
    const { aiDirectorRateLimit } = await import('@/lib/services/aiDirectorRateLimit')

    const res = await aiDirectorService.replyToPlayerMessage({
      playerId: 'p1',
      message: 'What should I do next?',
    })

    expect(res.category).toBe('help')
    expect(res.reply).toBe('hello guardian')
    expect(res.suggestions).toEqual(['Open the Quests tab', 'Equip your best gear'])
    expect(aiDirectorRateLimit.checkOrThrow).toHaveBeenCalledWith({ playerId: 'p1' })
    expect(langdockClient.chat).toHaveBeenCalledTimes(1)
    expect(auditAiDirectorEvent).toHaveBeenCalledTimes(1)

    const [auditArg] = vi.mocked(auditAiDirectorEvent).mock.calls[0]
    expect(auditArg).toMatchObject({
      playerId: 'p1',
      provider: 'langdock',
      category: 'help',
    })
    expect('inputChars' in auditArg).toBe(true)
    expect('outputChars' in auditArg).toBe(true)
    // Must not contain raw user input or full context.
    expect('message' in auditArg).toBe(false)
    expect('context' in auditArg).toBe(false)
  })

  it('falls back to category=help when model returns non-JSON', async () => {
    const { langdockClient } = await import('@/lib/providers/langdock/langdockClient')

    vi.mocked(langdockClient.chat).mockResolvedValueOnce({ content: 'plain text reply' })
    const res = await aiDirectorService.replyToPlayerMessage({
      playerId: 'p1',
      message: 'Help me',
    })

    expect(res.category).toBe('help')
    expect(res.reply).toBe('plain text reply')
  })

  it('rejects empty messages', async () => {
    await expect(
      aiDirectorService.replyToPlayerMessage({ playerId: 'p1', message: '' }),
    ).rejects.toMatchObject({ code: 'BAD_REQUEST' })
  })
})
