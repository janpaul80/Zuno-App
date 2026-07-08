import { ApiError } from '../api/errors'

export interface LangdockConfig {
  apiKey: string
  baseUrl: string
  model: string
}

export interface VoiceboxConfig {
  // Local-first: the backend calls a local Voicebox HTTP service.
  // This value is optional until voice generation is enabled.
  baseUrl: string
}

export interface HiggsfieldConfig {
  apiKey: string
  baseUrl: string
}

function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new ApiError('INTERNAL_ERROR', `Missing required environment variable: ${name}`, 500)
  }
  return value
}

export function getLangdockConfig(): LangdockConfig {
  // Keep validation lazy so local builds/tests that don't use Langdock remain unblocked.
  const apiKey = requireEnv('LANGDOCK_API_KEY', process.env.LANGDOCK_API_KEY)
  const baseUrl = process.env.LANGDOCK_BASE_URL ?? 'https://api.langdock.com'
  const model = process.env.LANGDOCK_MODEL ?? 'default'
  return { apiKey, baseUrl, model }
}

export function getVoiceboxConfig(): VoiceboxConfig {
  // Voicebox should run locally; default is safe and explicit.
  const baseUrl = process.env.VOICEBOX_BASE_URL ?? 'http://127.0.0.1:3009'
  return { baseUrl }
}

export function getHiggsfieldConfig(): HiggsfieldConfig {
  const apiKey = requireEnv('HIGGSFIELD_API_KEY', process.env.HIGGSFIELD_API_KEY)
  const baseUrl = process.env.HIGGSFIELD_BASE_URL ?? 'https://api.higgsfield.ai'
  return { apiKey, baseUrl }
}
