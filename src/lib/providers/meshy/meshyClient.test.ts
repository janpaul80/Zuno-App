import { describe, expect, it, vi } from 'vitest'

import { meshyClient } from './meshyClient'
import { ApiError } from '@/lib/api/errors'

describe('meshyClient', () => {
  it('healthCheck throws when API key is missing', async () => {
    const prevCanonical = process.env.MESHY_AI_API
    const prevLegacy = process.env.MESHI_AI_API
    delete process.env.MESHY_AI_API
    delete process.env.MESHI_AI_API

    await expect(meshyClient.healthCheck()).rejects.toBeInstanceOf(ApiError)

    process.env.MESHY_AI_API = prevCanonical
    process.env.MESHI_AI_API = prevLegacy
  })

  it('healthCheck passes when canonical MESHY_AI_API is set', async () => {
    const prevCanonical = process.env.MESHY_AI_API
    process.env.MESHY_AI_API = 'test-meshy-key'

    const res = await meshyClient.healthCheck()
    expect(res).toEqual({ ok: true, provider: 'meshy' })

    process.env.MESHY_AI_API = prevCanonical
  })

  it('generateAsset returns a stub asset and emits audit-friendly metadata', async () => {
    const prevCanonical = process.env.MESHY_AI_API
    process.env.MESHY_AI_API = 'test-meshy-key'

    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {})

    const result = await meshyClient.generateAsset({
      summary: 'A legendary sword',
      category: 'weapon',
      name: 'Blade of Zunlandia',
      levelId: 'lvl_1',
      playerId: 'player_123',
      locale: 'en-US',
    })

    expect(result.jobId).toMatch(/^meshy:/)
    expect(result.assets).toHaveLength(1)
    expect(result.assets[0].category).toBe('weapon')
    expect(result.assets[0].url).toContain('/meshy/asset.glb')

    // Ensure audit log was emitted without leaking secrets or prompts.
    expect(consoleSpy).toHaveBeenCalledTimes(1)
    const [[tag, payload]] = consoleSpy.mock.calls
    expect(tag).toBe('[video_generation_audit]')
    const parsed = JSON.parse(payload as string)
    expect(parsed.provider).toBe('meshy')
    expect(typeof parsed.requestId).toBe('string')
    // We log char counts, not the prompt text or API key.
    expect(typeof parsed.inputChars).toBe('number')
    expect(typeof parsed.outputChars).toBe('number')

    consoleSpy.mockRestore()
    process.env.MESHY_AI_API = prevCanonical
  })
})
