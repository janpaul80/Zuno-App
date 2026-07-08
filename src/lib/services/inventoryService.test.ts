import { describe, expect, it, vi } from 'vitest'

vi.mock('../repositories/inventoryRepository', () => {
  return {
    inventoryRepository: {
      listInventory: vi.fn(async () => []),
      getInventoryItem: vi.fn(async () => null),
      grantInventoryItem: vi.fn(async (args: { quantity: number; metadata?: Record<string, unknown> }) => ({
        item_quantity: args.quantity,
        item_metadata: args.metadata ?? {},
        item_updated_at: new Date().toISOString(),
      })),
      removeInventoryItem: vi.fn(async () => ({
        item_quantity: 0,
        item_metadata: {},
        item_updated_at: new Date().toISOString(),
      })),
      createInventoryTransaction: vi.fn(async () => undefined),
      listInventoryTransactions: vi.fn(async () => []),
    },
  }
})

describe('inventoryService validation', () => {
  it('grantItem rejects non-integer quantity', async () => {
    const { inventoryService } = await import('./inventoryService')

    await expect(
      inventoryService.grantItem({
        transactionId: 't1',
        playerId: 'p1',
        itemId: 'item1',
        quantity: 1.1,
        sourceDomain: 'test',
        sourceReference: 'ref',
        requestId: 'r',
      }),
    ).rejects.toMatchObject({ code: 'BAD_REQUEST', status: 400 })
  })

  it('removeItem rejects non-positive quantity', async () => {
    const { inventoryService } = await import('./inventoryService')

    await expect(
      inventoryService.removeItem({
        transactionId: 't1',
        playerId: 'p1',
        itemId: 'item1',
        quantity: 0,
        sourceDomain: 'test',
        sourceReference: 'ref',
        requestId: 'r',
      }),
    ).rejects.toMatchObject({ code: 'BAD_REQUEST', status: 400 })
  })
})
