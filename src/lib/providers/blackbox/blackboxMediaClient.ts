import { ApiError } from '@/lib/api/errors'
import { getBlackboxConfig } from '@/lib/config/aiProviders'
import { auditVideoGenerationEvent, toVideoRequestId } from '@/lib/services/videoGenerationAudit'

export interface BlackboxMediaInput {
  prompt: string
  levelId?: string
  locale?: string
  requestId?: string
  model?: string
}

export interface BlackboxMediaResult {
  assetUrl: string
  model: string
}

function toUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, '')}${path}`
}

function extractAssetUrl(value: unknown): string | null {
  if (!value || typeof value !== 'object') return null
  const choices = (value as Record<string, unknown>).choices
  if (!Array.isArray(choices) || choices.length === 0) return null
  const first = choices[0]
  if (!first || typeof first !== 'object') return null
  const message = (first as Record<string, unknown>).message
  if (!message || typeof message !== 'object') return null
  const content = (message as Record<string, unknown>).content
  if (typeof content !== 'string') return null

  try {
    const url = new URL(content.trim())
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

async function generate(
  kind: 'image' | 'video',
  input: BlackboxMediaInput,
): Promise<BlackboxMediaResult> {
  const prompt = input.prompt.trim()
  if (!prompt) throw new ApiError('BAD_REQUEST', 'Blackbox media prompt is required', 400)
  if (prompt.length > 8_000) throw new ApiError('BAD_REQUEST', 'Blackbox media prompt exceeds 8,000 characters', 400)

  const config = getBlackboxConfig()
  const model = input.model ?? (kind === 'image' ? config.imageModel : config.videoModel)
  const startedAt = Date.now()
  const response = await fetch(toUrl(config.baseUrl, '/chat/completions'), {
    method: 'POST',
    headers: {
      authorization: `Bearer ${config.apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    throw new ApiError(
      'INTERNAL_ERROR',
      `Blackbox ${kind} generation failed (${response.status})`,
      response.status >= 500 ? 503 : 500,
    )
  }

  const assetUrl = extractAssetUrl(await response.json())
  if (!assetUrl) {
    throw new ApiError('INTERNAL_ERROR', `Blackbox ${kind} response did not contain an HTTPS asset`, 502)
  }

  const requestId = input.requestId ?? toVideoRequestId(`${kind}:${prompt}`, 'blackbox')
  auditVideoGenerationEvent({
    requestId,
    provider: 'blackbox',
    model,
    levelId: input.levelId,
    type: kind,
    locale: input.locale,
    latencyMs: Date.now() - startedAt,
    inputChars: prompt.length,
    outputChars: assetUrl.length,
  })

  return { assetUrl, model }
}

export const blackboxMediaClient = {
  async healthCheck(): Promise<{ ok: true; provider: 'blackbox' }> {
    getBlackboxConfig()
    return { ok: true, provider: 'blackbox' }
  },

  generateImage(input: BlackboxMediaInput): Promise<BlackboxMediaResult> {
    return generate('image', input)
  },

  generateVideo(input: BlackboxMediaInput): Promise<BlackboxMediaResult> {
    return generate('video', input)
  },
}
