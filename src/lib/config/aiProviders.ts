import { ApiError } from '../api/errors'

export interface LangdockConfig {
  apiKey: string
  baseUrl: string
  model: string
}

export interface LogiccConfig {
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
  /**
   * Open Higgsfield AI is a UI over Muapi.ai.
   * We use Muapi as the backend generation service.
   */
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
  // Support existing .env.local keys.
  const apiKey = requireEnv(
    'LANGDOCK_API_KEY (or LANGDOCK_API_CODE)',
    process.env.LANGDOCK_API_KEY ?? process.env.LANGDOCK_API_CODE,
  )

  const rawBaseUrl =
    process.env.LANGDOCK_BASE_URL ??
    process.env.LANGDOCK_ENDPOINT_URL ??
    // Default to the OpenAI-compatible EU endpoint.
    'https://api.langdock.com/openai/eu/v1'

  // Some env files include leading/trailing spaces (e.g. `LANGDOCK_ENDPOINT_URL= https://...`).
  const baseUrl = rawBaseUrl.trim()

  const model = (process.env.LANGDOCK_MODEL ?? process.env.MODEL ?? 'default').trim()
  return { apiKey, baseUrl, model }
}

export function getLogiccConfig(): LogiccConfig {
  // Logicc is the explicit default inference provider for the AI Director.
  // Keep validation lazy so builds and tests that do not invoke the Director
  // do not require production credentials.
  const apiKey = requireEnv('LOGICC_API_KEY', process.env.LOGICC_API_KEY)
  const baseUrl = requireEnv('LOGICC_BASE_URL', process.env.LOGICC_BASE_URL).trim()
  const model = (process.env.LOGICC_MODEL ?? 'default').trim()

  return { apiKey, baseUrl, model }
}

export function getVoiceboxConfig(): VoiceboxConfig {
  // Voicebox should run locally; default is safe and explicit.
  const baseUrl = process.env.VOICEBOX_BASE_URL ?? 'http://127.0.0.1:3009'
  return { baseUrl }
}

export function getHiggsfieldConfig(): HiggsfieldConfig {
  // Support existing .env.local keys used by the open-higgsfield-ai project.
  // Never log keys.
  const apiKey = requireEnv(
    'MUAPI_API (or HIGGSFIELD_API_KEY)',
    process.env.MUAPI_API ?? process.env.HIGGSFIELD_API_KEY,
  )

  // Muapi base is fixed in their UI project, but support override for testing.
  const baseUrl = (process.env.MUAPI_BASE_URL ?? process.env.HIGGSFIELD_BASE_URL ?? 'https://api.muapi.ai').trim()
  return { apiKey, baseUrl }
}
