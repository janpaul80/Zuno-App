import { describe, expect, it, vi } from 'vitest'

vi.mock('../repositories/economyRepository', () => {
  return {
    economyRepository: {
      getWallet: vi.fn(async () => null),
      upsertWallet: vi.fn(async () => undefined),
      creditWallet: vi.fn(async () => ({
        player_id: 'p1',
        wallet_coins: 10,
        wallet_gems: 0,
        wallet_updated_at: new Date().toISOString(),
      })),
      debitWallet: vi.fn(async () => ({
        player_id: 'p1',
        wallet_coins: 0,
        wallet_gems: 0,
        wallet_updated_at: new Date().toISOString(),
      })),
      createTransaction: vi.fn(async () => undefined),
      listTransactions: vi.fn(async () => []),
    },
  }
})

describe('economyService validation', () => {
  it('credit rejects non-integer amount', async () => {
    const { economyService } = await import('./economyService')

    await expect(
      economyService.credit({
        transactionId: 't1',
        playerId: 'p1',
        currency: 'coins',
        amount: 1.5,
        sourceDomain: 'test',
        sourceReference: 'ref',
        requestId: 'r',
      }),
    ).rejects.toMatchObject({ code: 'BAD_REQUEST', status: 400 })
  })

  it('debit rejects non-positive amount', async () => {
    const { economyService } = await import('./economyService')

    await expect(
      economyService.debit({
        transactionId: 't1',
        playerId: 'p1',
        currency: 'coins',
        amount: 0,
        sourceDomain: 'test',
        sourceReference: 'ref',
        requestId: 'r',
      }),
    ).rejects.toMatchObject({ code: 'BAD_REQUEST', status: 400 })
  })
})
