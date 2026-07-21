import { afterEach, describe, expect, it, vi } from 'vitest'

import { meshyClient } from './meshyClient'
import { ApiError } from '@/lib/api/errors'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
})

describe('meshyClient', () => {
  it('healthCheck throws when API key is missing', async () => {
    vi.stubEnv('MESHY_AI_API', '')
    vi.stubEnv('MESHI_AI_API', '')
    await expect(meshyClient.healthCheck()).rejects.toBeInstanceOf(ApiError)
  })

  it('healthCheck passes when canonical MESHY_AI_API is set', async () => {
    vi.stubEnv('MESHY_AI_API', 'test-meshy-key')
    await expect(meshyClient.healthCheck()).resolves.toEqual({ ok: true, provider: 'meshy' })
  })

  it('runs the official preview-refine workflow and returns production formats', async () => {
    vi.stubEnv('MESHY_AI_API', 'test-meshy-key')
    vi.stubEnv('MESHY_BASE_URL', 'https://meshy.example')
    vi.spyOn(console, 'info').mockImplementation(() => undefined)
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify({ result: 'preview-1' }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'preview-1', status: 'SUCCEEDED' }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ result: 'refine-1' }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({
        id: 'refine-1',
        status: 'SUCCEEDED',
        model_urls: {
          glb: 'https://cdn.example/aelis.glb',
          fbx: 'https://cdn.example/aelis.fbx',
        },
      }), { status: 200 }))

    const result = await meshyClient.generateAsset({
      summary: 'A mobile-ready fox Guardian with clean animation topology',
      category: 'creature',
      name: 'Aelis',
      levelId: 'grasslands-01',
    })

    expect(fetchSpy).toHaveBeenCalledTimes(4)
    expect(result.jobId).toBe('refine-1')
    expect(result.assets.map((asset) => asset.format)).toEqual(['glb', 'fbx'])
    const previewBody = JSON.parse(String(fetchSpy.mock.calls[0][1]?.body))
    expect(previewBody).toMatchObject({ mode: 'preview', model_type: 'lowpoly' })
    const refineBody = JSON.parse(String(fetchSpy.mock.calls[2][1]?.body))
    expect(refineBody).toMatchObject({ mode: 'refine', preview_task_id: 'preview-1', enable_pbr: true })
  })
})
