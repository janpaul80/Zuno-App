import { describe, expect, it, vi } from 'vitest'

import type { RewardEntry } from './rewardEngineService'

vi.mock('../repositories/rewardEngineRepository', () => {
  return {
    rewardEngineRepository: {
      findRequestById: vi.fn(async () => null),
      processRewardRequestRpc: vi.fn(async () => {
        throw new Error('processRewardRequestRpc should not be called for validation failures')
      }),
      listPlayerRewardEvents: vi.fn(async () => []),
    },
  }
})

function baseRequest(overrides?: Partial<Parameters<typeof rewardEngineService.processRewardRequest>[0]>) {
  return {
    requestId: 'test-request-id',
    playerId: 'test-player-id',
    sourceDomain: 'test-domain',
    sourceReference: 'test-reference',
    rewards: [{ type: 'coins' as const, amount: 10 }],
    metadata: {},
    createdAt: new Date().toISOString(),
    ...(overrides ?? {}),
  }
}

describe('rewardEngineService validation', () => {
  it('rejects unsupported reward type', async () => {
    const { rewardEngineService } = await import('./rewardEngineService')
    const request = baseRequest({
      rewards: [{ type: 'not-a-real-type', amount: 1 } as unknown as RewardEntry],
    })

    await expect(rewardEngineService.processRewardRequest(request)).rejects.toMatchObject({
      code: 'BAD_REQUEST',
      status: 400,
    })
  })

  it('rejects non-positive coins amount', async () => {
    const { rewardEngineService } = await import('./rewardEngineService')
    const request = baseRequest({
      rewards: [{ type: 'coins', amount: 0 }],
    })

    await expect(rewardEngineService.processRewardRequest(request)).rejects.toMatchObject({
      code: 'BAD_REQUEST',
      status: 400,
    })
  })

  it('rejects inventory_item reward without itemId', async () => {
    const { rewardEngineService } = await import('./rewardEngineService')
    const request = baseRequest({
      rewards: [{ type: 'inventory_item', amount: 1 } as unknown as RewardEntry],
    })

    await expect(rewardEngineService.processRewardRequest(request)).rejects.toMatchObject({
      code: 'BAD_REQUEST',
      status: 400,
    })
  })

  it('rejects unlock reward without unlockKey', async () => {
    const { rewardEngineService } = await import('./rewardEngineService')
    const request = baseRequest({
      rewards: [{ type: 'unlock' } as unknown as RewardEntry],
    })

    await expect(rewardEngineService.processRewardRequest(request)).rejects.toMatchObject({
      code: 'BAD_REQUEST',
      status: 400,
    })
  })

  it('rejects bundle reward without bundleId', async () => {
    const { rewardEngineService } = await import('./rewardEngineService')
    const request = baseRequest({
      rewards: [{ type: 'bundle' } as unknown as RewardEntry],
    })

    await expect(rewardEngineService.processRewardRequest(request)).rejects.toMatchObject({
      code: 'BAD_REQUEST',
      status: 400,
    })
  })
})
