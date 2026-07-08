import { ApiError } from '@/lib/api/errors'
import { getLangdockConfig, type LangdockConfig } from '@/lib/config/aiProviders'

export type LangdockRole = 'system' | 'user' | 'assistant'

export interface LangdockMessage {
  role: LangdockRole
  content: string
}

export interface LangdockChatCompletionInput {
  messages: LangdockMessage[]
  model?: string
  temperature?: number
}

export interface LangdockChatCompletionResult {
  content: string
  raw?: unknown
}

function toUrl(baseUrl: string, path: string): string {
  const normalized = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  return `${normalized}${path}`
}

async function postJson(
  url: string,
  apiKey: string,
  body: unknown,
): Promise<unknown> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new ApiError(
      'INTERNAL_ERROR',
      `Langdock request failed (${res.status}): ${text || res.statusText}`,
      500,
    )
  }

  return (await res.json()) as unknown
}

function extractContent(json: unknown): string | null {
  if (!json || typeof json !== 'object') return null

  const obj = json as Record<string, unknown>

  // Common chat-completions shape.
  const choices = obj.choices
  if (Array.isArray(choices) && choices.length > 0) {
    const first = choices[0]
    if (first && typeof first === 'object') {
      const message = (first as Record<string, unknown>).message
      if (message && typeof message === 'object') {
        const content = (message as Record<string, unknown>).content
        if (typeof content === 'string' && content.length > 0) return content
      }
    }
  }

  // Fallback keys for provider adapters.
  const outputText = obj.output_text
  if (typeof outputText === 'string' && outputText.length > 0) return outputText

  const content = obj.content
  if (typeof content === 'string' && content.length > 0) return content

  return null
}

export const langdockClient = {
  /**
   * Minimal chat completion wrapper.
   *
   * NOTE: We intentionally keep this thin and adapter-style. The project can
   * evolve this to match Langdock's latest API once we lock an endpoint.
   */
  async chat(input: LangdockChatCompletionInput): Promise<LangdockChatCompletionResult> {
    let cfg: LangdockConfig
    try {
      cfg = getLangdockConfig()
    } catch (err) {
      // Surface a clean, actionable failure when local env isn't configured.
      if (err instanceof ApiError) throw err
      throw new ApiError('INTERNAL_ERROR', 'Langdock configuration error', 500)
    }

    // Generic "chat completions" contract. If Langdock differs, update this adapter.
    const url = toUrl(cfg.baseUrl, '/v1/chat/completions')
    const payload = {
      model: input.model ?? cfg.model,
      temperature: input.temperature ?? 0.7,
      messages: input.messages,
    }

    const json = await postJson(url, cfg.apiKey, payload)
    const content = extractContent(json)

    if (!content) {
      throw new ApiError('INTERNAL_ERROR', 'Langdock response missing content', 500)
    }

    return { content, raw: json }
  },
}
