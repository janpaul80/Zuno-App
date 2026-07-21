import { afterEach, describe, expect, it, vi } from 'vitest'

import { voiceboxClient } from './voiceboxClient'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
})

describe('voiceboxClient', () => {
  it('calls the local Voicebox generation contract without an API key', async () => {
    vi.stubEnv('VOICEBOX_BASE_URL', 'http://127.0.0.1:17493')
    vi.stubEnv('VOICEBOX_NARRATOR_PROFILE_ID', 'narrator-profile')
    let body: Record<string, unknown> = {}

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (_input, init) => {
      body = JSON.parse(String(init?.body)) as Record<string, unknown>
      return new Response(JSON.stringify({ id: 'generation-1', audio_url: '/audio/narration.wav' }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    })

    const result = await voiceboxClient.synthesize({
      text: 'Guardians, the Heartwood Beacon is under attack.',
      voiceRole: 'narrator',
      locale: 'en',
    })

    expect(body).toEqual({
      text: 'Guardians, the Heartwood Beacon is under attack.',
      profile_id: 'narrator-profile',
      language: 'en',
    })
    expect(result).toEqual({
      audioUrl: 'http://127.0.0.1:17493/audio/narration.wav',
      generationId: 'generation-1',
    })
  })

  it('requires a configured voice profile', async () => {
    vi.stubEnv('VOICEBOX_NARRATOR_PROFILE_ID', '')
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    await expect(
      voiceboxClient.synthesize({ text: 'Hello', voiceRole: 'narrator' }),
    ).rejects.toMatchObject({ status: 500 })
    expect(fetchSpy).not.toHaveBeenCalled()
  })
})
