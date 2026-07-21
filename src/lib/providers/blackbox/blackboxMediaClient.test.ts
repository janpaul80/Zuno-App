import { afterEach, describe, expect, it, vi } from 'vitest'

import { blackboxMediaClient } from './blackboxMediaClient'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
})

describe('blackboxMediaClient', () => {
  it.each([
    ['image', 'flux-pro', 'https://cdn.example/zuno.webp'],
    ['video', 'veo-2', 'https://cdn.example/zuno.mp4'],
  ] as const)('generates a %s through the official chat-completions contract', async (kind, model, assetUrl) => {
    vi.stubEnv('BLACKBOX_API_KEY', 'blackbox-test-key')
    vi.stubEnv('BLACKBOX_BASE_URL', 'https://api.blackbox.test')
    vi.stubEnv('BLACKBOX_IMAGE_MODEL', 'flux-pro')
    vi.stubEnv('BLACKBOX_VIDEO_MODEL', 'veo-2')
    let requestUrl = ''
    let authorization = ''
    let body: Record<string, unknown> = {}
    vi.spyOn(console, 'info').mockImplementation(() => undefined)

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input, init) => {
      requestUrl = String(input)
      authorization = new Headers(init?.headers).get('authorization') ?? ''
      body = JSON.parse(String(init?.body)) as Record<string, unknown>
      return new Response(JSON.stringify({
        choices: [{ message: { role: 'assistant', content: assetUrl } }],
      }), { status: 200, headers: { 'content-type': 'application/json' } })
    })

    const input = { prompt: 'Aelis protects the Heartwood Beacon', levelId: 'grasslands-01' }
    const result = kind === 'image'
      ? await blackboxMediaClient.generateImage(input)
      : await blackboxMediaClient.generateVideo(input)

    expect(requestUrl).toBe('https://api.blackbox.test/chat/completions')
    expect(authorization).toBe('Bearer blackbox-test-key')
    expect(body).toMatchObject({ model })
    expect(result).toEqual({ assetUrl, model })
  })

  it('never treats non-HTTPS provider text as an asset', async () => {
    vi.stubEnv('BLACKBOX_API_KEY', 'blackbox-test-key')
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({
      choices: [{ message: { content: 'generation failed: internal prompt data' } }],
    }), { status: 200, headers: { 'content-type': 'application/json' } }))

    await expect(
      blackboxMediaClient.generateVideo({ prompt: 'test prompt' }),
    ).rejects.toMatchObject({ status: 502 })
  })
})
