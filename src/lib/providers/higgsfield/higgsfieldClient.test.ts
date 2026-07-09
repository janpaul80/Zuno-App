import { describe, expect, it, vi } from 'vitest'

import { higgsfieldClient } from './higgsfieldClient'

// Minimal unit tests: ensure the adapter is safe to import and
// surfaces missing env via ApiError without requiring real network calls.

describe('higgsfieldClient', () => {
  it('healthCheck throws when missing MUAPI_API', async () => {
    const prev = process.env.MUAPI_API
    delete process.env.MUAPI_API
    delete process.env.HIGGSFIELD_API_KEY

    await expect(higgsfieldClient.healthCheck()).rejects.toMatchObject({
      code: 'INTERNAL_ERROR',
    })

    process.env.MUAPI_API = prev
  })

  it('generateCinematic uses submit+poll and returns videoUrl', async () => {
    const prev = process.env.MUAPI_API
    process.env.MUAPI_API = 'test-key'
    process.env.MUAPI_BASE_URL = 'https://example.muapi'
    process.env.MUAPI_T2V_ENDPOINT = 'seedance-lite-t2v'

    const fetchMock = vi.fn()
    ;(globalThis as unknown as { fetch: unknown }).fetch = fetchMock as unknown

    fetchMock
      // submit
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => ({ request_id: 'req_123' }),
        text: async () => JSON.stringify({ request_id: 'req_123' }),
      })
      // poll
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => ({ status: 'completed', outputs: ['https://cdn/video.mp4'] }),
        text: async () => JSON.stringify({ status: 'completed', outputs: ['https://cdn/video.mp4'] }),
      })

    // Speed up polling.
    const sleep = vi.spyOn(globalThis, 'setTimeout')
    // @ts-expect-error vitest timer shim
    sleep.mockImplementation((fn: () => void) => {
      fn()
      return 0 as unknown as NodeJS.Timeout
    })

    const res = await higgsfieldClient.generateCinematic({
      type: 'level_intro',
      levelId: 'lvl_1',
      spec: { summary: 'hello' },
      requestId: 'r1',
    })
    expect(res.videoUrl).toBe('https://cdn/video.mp4')

    sleep.mockRestore()
    process.env.MUAPI_API = prev
  })

  it('generateCinematic times out when Muapi never completes', async () => {
    const prev = process.env.MUAPI_API
    process.env.MUAPI_API = 'test-key'
    process.env.MUAPI_BASE_URL = 'https://example.muapi'
    process.env.MUAPI_T2V_ENDPOINT = 'seedance-lite-t2v'

    const fetchMock = vi.fn()
    ;(globalThis as unknown as { fetch: unknown }).fetch = fetchMock as unknown

    // submit ok
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ request_id: 'req_123' }),
      text: async () => JSON.stringify({ request_id: 'req_123' }),
    })

    // poll always returns running
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ status: 'running' }),
      text: async () => JSON.stringify({ status: 'running' }),
    })

    const sleep = vi.spyOn(globalThis, 'setTimeout')
    // @ts-expect-error vitest timer shim
    sleep.mockImplementation((fn: () => void) => {
      fn()
      return 0 as unknown as NodeJS.Timeout
    })

    await expect(
      higgsfieldClient.generateCinematic({
        type: 'level_intro',
        levelId: 'lvl_timeout',
        spec: { summary: 'never completes' },
      }),
    ).rejects.toMatchObject({ status: 504 })

    sleep.mockRestore()
    process.env.MUAPI_API = prev
  })
})
