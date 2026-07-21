import { ApiError } from '@/lib/api/errors'
import { getVoiceboxConfig } from '@/lib/config/aiProviders'

export type VoiceboxVoiceRole = 'narrator' | 'npc' | 'mission' | 'cinematic'

export interface VoiceboxSynthesisInput {
  text: string
  voiceRole: VoiceboxVoiceRole
  voiceId?: string
  locale?: string
  requestId?: string
}

export interface VoiceboxSynthesisResult {
  audioUrl: string
  generationId?: string
}

function toUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, '')}${path}`
}

function readString(object: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = object[key]
    if (typeof value === 'string' && value.length > 0) return value
  }
  return undefined
}

function extractAudioResult(value: unknown, baseUrl: string): VoiceboxSynthesisResult | null {
  if (!value || typeof value !== 'object') return null
  const object = value as Record<string, unknown>
  const nested = object.result && typeof object.result === 'object'
    ? (object.result as Record<string, unknown>)
    : object
  const rawUrl = readString(nested, ['audio_url', 'audioUrl', 'file_url', 'url', 'path'])
  if (!rawUrl) return null

  let audioUrl: string
  try {
    audioUrl = new URL(rawUrl, `${baseUrl.replace(/\/$/, '')}/`).toString()
  } catch {
    return null
  }

  return {
    audioUrl,
    generationId: readString(nested, ['id', 'generation_id', 'generationId']),
  }
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 120_000): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

export const voiceboxClient = {
  async healthCheck(): Promise<{ ok: true; provider: 'voicebox' }> {
    const config = getVoiceboxConfig()
    const response = await fetchWithTimeout(toUrl(config.baseUrl, '/health'), { method: 'GET' }, 5_000)
    if (!response.ok) {
      throw new ApiError('INTERNAL_ERROR', `Voicebox health check failed (${response.status})`, 503)
    }
    return { ok: true, provider: 'voicebox' }
  },

  async synthesize(input: VoiceboxSynthesisInput): Promise<VoiceboxSynthesisResult> {
    const text = input.text.trim()
    if (!text) throw new ApiError('BAD_REQUEST', 'Voicebox text is required', 400)
    if (text.length > 12_000) throw new ApiError('BAD_REQUEST', 'Voicebox text exceeds 12,000 characters', 400)

    const config = getVoiceboxConfig()
    const profileId = input.voiceId ?? config.profiles[input.voiceRole]
    if (!profileId) {
      throw new ApiError(
        'INTERNAL_ERROR',
        `Voicebox profile is not configured for role: ${input.voiceRole}`,
        500,
      )
    }

    const response = await fetchWithTimeout(toUrl(config.baseUrl, '/generate'), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-voicebox-client-id': 'zuno-cinematic-pipeline',
      },
      body: JSON.stringify({
        text,
        profile_id: profileId,
        language: input.locale ?? 'en',
      }),
    })

    if (!response.ok) {
      throw new ApiError(
        'INTERNAL_ERROR',
        `Voicebox generation failed (${response.status})`,
        response.status >= 500 ? 503 : 500,
      )
    }

    const result = extractAudioResult(await response.json(), config.baseUrl)
    if (!result) {
      throw new ApiError('INTERNAL_ERROR', 'Voicebox response did not contain an audio asset', 502)
    }
    return result
  },
}
