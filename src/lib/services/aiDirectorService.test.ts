import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/services/playerProfileService', () => ({
  playerProfileService: {
    getProfileSummary: vi.fn(async () => ({
      player: { id: 'p1' },
      profile: {},
      currency: {},
      inventory: [],
    })),
  },
}))

vi.mock('@/lib/services/unlockService', () => ({
  unlockService: { getPlayerUnlocks: vi.fn(async () => []) },
}))

vi.mock('@/lib/services/progressionService', () => ({
  progressionService: {
    getProgression: vi.fn(async () => ({
      player_id: 'p1',
      level: 1,
      xp: 0,
      xp_to_next: 100,
      created_at: '',
      updated_at: '',
    })),
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
  shopService: { listActiveItems: vi.fn(async () => []) },
}))

vi.mock('@/mastra', () => {
  class AiDirectorInvalidOutputError extends Error {}

  return {
    AiDirectorInvalidOutputError,
    runAiDirectorWithMastra: vi.fn(),
  }
})

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

import {
  AiDirectorInvalidOutputError,
  runAiDirectorWithMastra,
} from '@/mastra'
import { aiDirectorService } from '@/lib/services/aiDirectorService'
import { auditAiDirectorEvent } from '@/lib/services/aiDirectorAudit'
import { playerProfileService } from '@/lib/services/playerProfileService'

const safeReply =
  'I’m having trouble responding right now. Please try again in a moment.'

beforeEach(() => {
  vi.useRealTimers()
  vi.clearAllMocks()
  vi.mocked(runAiDirectorWithMastra).mockResolvedValue({
    output: {
      category: 'help',
      reply: 'hello guardian',
      suggestions: ['Open the Quests tab', 'Equip your best gear'],
    },
    inferenceProvider: 'logicc',
    model: 'test-model',
  })
})

describe('aiDirectorService', () => {
  it('builds a read-only snapshot and replies through Mastra', async () => {
    const result = await aiDirectorService.replyToPlayerMessage({
      playerId: 'p1',
      message: 'What should I do next?',
      conversationId: 'conversation-1',
    })

    expect(result).toMatchObject({
      category: 'help',
      reply: 'hello guardian',
      conversationId: 'conversation-1',
    })
    expect(runAiDirectorWithMastra).toHaveBeenCalledTimes(1)
    expect(auditAiDirectorEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        runtime: 'mastra',
        inferenceProvider: 'logicc',
        model: 'test-model',
        category: 'help',
        status: 'ok',
      }),
    )

    const audit = vi.mocked(auditAiDirectorEvent).mock.calls[0][0]
    expect('message' in audit).toBe(false)
    expect('context' in audit).toBe(false)
    expect(JSON.stringify(audit)).not.toContain('What should I do next?')
  })

  it('classifies timeout failures and aborts the runner', async () => {
    vi.useFakeTimers()
    let runnerSignal: AbortSignal | undefined
    vi.mocked(runAiDirectorWithMastra).mockImplementation(
      async (_input, signal) => {
        runnerSignal = signal
        return await new Promise<never>((_resolve, reject) => {
          signal?.addEventListener('abort', () => reject(new Error('aborted')))
        })
      },
    )

    const pending = aiDirectorService.replyToPlayerMessage({
      playerId: 'p1',
      message: 'Help me',
    })
    await vi.advanceTimersByTimeAsync(12_000)
    const result = await pending

    expect(result).toEqual({
      category: 'troubleshooting',
      reply: safeReply,
      conversationId: undefined,
    })
    expect(runnerSignal?.aborted).toBe(true)
    expect(auditAiDirectorEvent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        status: 'fallback',
        failureKind: 'timeout',
        stage: 'provider',
      }),
    )
  })

  it('returns a safe fallback when snapshot serialization fails', async () => {
    vi.mocked(playerProfileService.getProfileSummary).mockResolvedValueOnce({
      unsupported: BigInt(1),
    } as never)

    const result = await aiDirectorService.replyToPlayerMessage({
      playerId: 'p1',
      message: 'Help me',
    })

    expect(result.category).toBe('troubleshooting')
    expect(result.reply).toBe(safeReply)
    expect(runAiDirectorWithMastra).not.toHaveBeenCalled()
    expect(auditAiDirectorEvent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        inferenceProvider: 'none',
        status: 'fallback',
        failureKind: 'snapshot_error',
        stage: 'snapshot',
      }),
    )
  })

  it('classifies provider failures without leaking the raw exception', async () => {
    vi.mocked(runAiDirectorWithMastra).mockRejectedValueOnce(
      new Error('secret provider response'),
    )

    const result = await aiDirectorService.replyToPlayerMessage({
      playerId: 'p1',
      message: 'Help me',
    })

    expect(result.reply).toBe(safeReply)
    const audit = vi.mocked(auditAiDirectorEvent).mock.calls.at(-1)?.[0]
    expect(audit).toMatchObject({
      inferenceProvider: 'logicc',
      status: 'fallback',
      failureKind: 'provider_error',
      stage: 'provider',
    })
    expect(JSON.stringify(audit)).not.toContain('secret provider response')
  })

  it('classifies malformed structured results as invalid output', async () => {
    vi.mocked(runAiDirectorWithMastra).mockResolvedValueOnce({
      output: { category: 'help', reply: '' },
      inferenceProvider: 'logicc',
      model: 'test-model',
    } as never)

    const result = await aiDirectorService.replyToPlayerMessage({
      playerId: 'p1',
      message: 'Help me',
    })

    expect(result.reply).toBe(safeReply)
    expect(auditAiDirectorEvent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        status: 'fallback',
        failureKind: 'invalid_output',
        stage: 'parse',
      }),
    )
  })

  it('classifies Mastra structured-output failures as invalid output', async () => {
    vi.mocked(runAiDirectorWithMastra).mockRejectedValueOnce(
      new AiDirectorInvalidOutputError(),
    )

    const result = await aiDirectorService.replyToPlayerMessage({
      playerId: 'p1',
      message: 'Help me',
    })

    expect(result.reply).toBe(safeReply)
    expect(auditAiDirectorEvent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        status: 'fallback',
        failureKind: 'invalid_output',
        stage: 'provider',
      }),
    )
  })

  it('classifies context-building failures before selecting a provider', async () => {
    vi.mocked(playerProfileService.getProfileSummary).mockRejectedValueOnce(
      new Error('database unavailable'),
    )

    const result = await aiDirectorService.replyToPlayerMessage({
      playerId: 'p1',
      message: 'Help me',
    })

    expect(result.reply).toBe(safeReply)
    expect(auditAiDirectorEvent).toHaveBeenLastCalledWith(
      expect.objectContaining({
        inferenceProvider: 'none',
        status: 'fallback',
        failureKind: 'context_error',
        stage: 'context',
      }),
    )
  })

  it('rejects empty messages before invoking Mastra', async () => {
    await expect(
      aiDirectorService.replyToPlayerMessage({ playerId: 'p1', message: '' }),
    ).rejects.toMatchObject({ code: 'BAD_REQUEST' })
    expect(runAiDirectorWithMastra).not.toHaveBeenCalled()
  })
})
