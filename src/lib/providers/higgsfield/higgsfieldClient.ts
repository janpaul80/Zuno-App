import { ApiError, ERROR_CODES } from '@/lib/api/errors'
import { getHiggsfieldConfig } from '@/lib/config/aiProviders'
import { auditVideoGenerationEvent, toVideoRequestId } from '@/lib/services/videoGenerationAudit'

export type CinematicType =
  | 'game_intro'
  | 'level_intro'
  | 'boss_intro'
  | 'victory'
  | 'ending'

export interface HiggsfieldCinematicInput {
  type: CinematicType
  levelId?: string
  /**
   * The cinematic spec is produced by AI Director + game config.
   * It should include script, shot list, style references, etc.
   *
   * IMPORTANT: Raw text should never be logged; audit logging uses
   * derived metadata only (see `auditAiDirectorEvent`).
   */
  spec: {
    title?: string
    locale?: string
    /**
     * High-level description of the cinematic, used for prompt building.
     * This is treated as provider input and must not be stored outside
     * the provider pipeline.
     */
    summary?: string
    /**
     * Optional duration in seconds; if omitted, a provider default is used.
     */
    durationSeconds?: number
    /**
     * Optional preferred aspect ratio (e.g. "9:16", "16:9").
     */
    aspectRatio?: string
    /**
     * Optional target resolution label (e.g. "480p", "720p").
     */
    resolution?: string
    /**
     * Free-form provider-specific config object.
     */
    providerConfig?: Record<string, unknown>
    /**
     * Optional player identifier for auditing.
     */
    playerId?: string
    /**
     * Optional conversation identifier for hashing.
     */
    conversationId?: string
  }
  /**
   * Optional request id from upstream; if provided, it is used for
   * audit correlation only. MuAPI still issues its own request_id.
   */
  requestId?: string
}

export interface HiggsfieldCinematicResult {
  videoUrl: string
}

export interface HiggsfieldHealth {
  ok: boolean
  provider: 'muapi'
  baseUrl: string
}

// ---- MuAPI models ----

export interface MuapiSubmitRequest {
  prompt: string
  aspect_ratio: string
  duration: number
  resolution: string
  // Additional provider-specific configuration; structure taken from
  // the upstream open-higgsfield-ai repo.
  [key: string]: unknown
}

export interface MuapiSubmitResponse {
  request_id?: string
  id?: string
  // Some endpoints may return the result directly.
  outputs?: unknown
  url?: unknown
  error?: unknown
}

export interface MuapiPollResponse {
  status?: string
  outputs?: unknown
  url?: unknown
  output?: { url?: unknown }
  error?: unknown
}

function toUrl(baseUrl: string, path: string): string {
  const normalized = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  return `${normalized}${path}`
}

function toVideoUrlFromPollResult(result: MuapiPollResponse): string | null {
  if (Array.isArray(result.outputs) && result.outputs.length > 0) {
    const first = result.outputs[0]
    if (typeof first === 'string' && first.length > 0) return first
  }
  if (typeof result.url === 'string' && result.url.length > 0) return result.url
  const nested = result.output?.url
  if (typeof nested === 'string' && nested.length > 0) return nested
  return null
}

async function postJson(url: string, apiKey: string, body: unknown, opts?: { timeoutMs?: number; retries?: number }): Promise<unknown> {
  const timeoutMs = opts?.timeoutMs ?? 30_000
  const retries = opts?.retries ?? 2

  let lastError: unknown

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // Muapi uses x-api-key, not Bearer auth.
        'x-api-key': apiKey,
      },
        body: JSON.stringify(body),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        // Surface MuAPI failures as INTERNAL_ERROR with HTTP status passthrough.
        throw new ApiError(
          ERROR_CODES.INTERNAL_ERROR,
          `Muapi request failed (${res.status}): ${text || res.statusText}`,
          res.status,
        )
      }

      return (await res.json()) as unknown
    } catch (err) {
      clearTimeout(timeoutId)
      lastError = err
      // Retry only on network-level or timeout errors; if we received an
      // ApiError from the provider, do not retry.
      if (err instanceof ApiError) {
        break
      }
      if (attempt === retries) {
        break
      }
    }
  }

  if (lastError instanceof ApiError) throw lastError
  throw new ApiError(ERROR_CODES.INTERNAL_ERROR, 'Muapi request failed (network/timeout)', 504, lastError)
}

async function getJson(url: string, apiKey: string, opts?: { timeoutMs?: number; retries?: number }): Promise<unknown> {
  const timeoutMs = opts?.timeoutMs ?? 30_000
  const retries = opts?.retries ?? 2

  let lastError: unknown

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new ApiError(
          ERROR_CODES.INTERNAL_ERROR,
          `Muapi request failed (${res.status}): ${text || res.statusText}`,
          res.status,
        )
      }

      return (await res.json()) as unknown
    } catch (err) {
      clearTimeout(timeoutId)
      lastError = err
      if (err instanceof ApiError) {
        break
      }
      if (attempt === retries) {
        break
      }
    }
  }

  if (lastError instanceof ApiError) throw lastError
  throw new ApiError(ERROR_CODES.INTERNAL_ERROR, 'Muapi request failed (network/timeout)', 504, lastError)
}

async function pollForResult(
  baseUrl: string,
  apiKey: string,
  requestId: string,
  opts?: { maxAttempts?: number; intervalMs?: number },
): Promise<MuapiPollResponse> {
  const maxAttempts = opts?.maxAttempts ?? 60
  const intervalMs = opts?.intervalMs ?? 2000
  const pollUrl = toUrl(baseUrl, `/api/v1/predictions/${requestId}/result`)

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise((r) => setTimeout(r, intervalMs))

    try {
       const json = (await getJson(pollUrl, apiKey)) as unknown
       if (!json || typeof json !== 'object') {
         throw new ApiError(ERROR_CODES.INTERNAL_ERROR, 'Muapi poll response malformed', 500)
      }

      const data = json as MuapiPollResponse
       const status = typeof data.status === 'string' ? data.status.toLowerCase() : ''
       if (status === 'completed' || status === 'succeeded' || status === 'success') return data
       if (status === 'failed' || status === 'error') {
         const msg = typeof data.error === 'string' ? data.error : 'Muapi generation failed'
         throw new ApiError(ERROR_CODES.INTERNAL_ERROR, msg, 500, data.error)
      }
    } catch (err) {
      if (attempt === maxAttempts) throw err
    }
  }

   throw new ApiError(ERROR_CODES.INTERNAL_ERROR, 'Muapi generation timed out while polling', 504)
}

function buildMuapiPrompt(input: HiggsfieldCinematicInput): string {
  const { type, levelId, spec } = input
  const summary = spec.summary ?? 'Cinematic sequence'
  const title = spec.title ?? `${type} cinematic`

  const lines: string[] = []
  lines.push(title)
  if (levelId) {
    lines.push(`Level: ${levelId}`)
  }
  lines.push(`Type: ${type}`)
  lines.push(`Summary: ${summary}`)

  // We deliberately avoid embedding the full spec JSON to keep prompts
  // compact and avoid leaking internal structure. Provider-specific
  // configuration is passed separately via `providerConfig`.

  return lines.join('\n')
}

function buildMuapiSubmitRequest(input: HiggsfieldCinematicInput): MuapiSubmitRequest {
  const prompt = buildMuapiPrompt(input)

  const aspect_ratio = input.spec.aspectRatio ?? '9:16'
  const duration = input.spec.durationSeconds ?? 5
  const resolution = input.spec.resolution ?? '480p'

  const base: MuapiSubmitRequest = {
    prompt,
    aspect_ratio,
    duration,
    resolution,
  }

  const providerConfig = input.spec.providerConfig ?? {}
  return { ...base, ...providerConfig }
}

export const higgsfieldClient = {
  /**
   * Checks whether Higgsfield/Muapi is configured.
   * Does not make a network call because Muapi does not document a public health endpoint.
   */
  async healthCheck(): Promise<HiggsfieldHealth> {
    const cfg = getHiggsfieldConfig()
    return { ok: true, provider: 'muapi', baseUrl: cfg.baseUrl }
  },

  /**
   * Generates a cinematic clip through Muapi.
   *
   * This is presentation-only. It must not mutate gameplay state.
   */
  async generateCinematic(_input: HiggsfieldCinematicInput): Promise<HiggsfieldCinematicResult> {
    const cfg = getHiggsfieldConfig()
    const modelEndpoint = process.env.MUAPI_T2V_ENDPOINT ?? 'seedance-lite-t2v'

    const submitUrl = toUrl(cfg.baseUrl, `/api/v1/${modelEndpoint}`)
    const submitPayload = buildMuapiSubmitRequest(_input)

    const submitJson = (await postJson(submitUrl, cfg.apiKey, submitPayload)) as unknown
    if (!submitJson || typeof submitJson !== 'object') {
      throw new ApiError(ERROR_CODES.INTERNAL_ERROR, 'Muapi submit response malformed', 500)
    }
    const submit = submitJson as MuapiSubmitResponse

    const requestId =
      (typeof submit.request_id === 'string' && submit.request_id.length > 0
        ? submit.request_id
        : undefined) ??
      (typeof submit.id === 'string' && submit.id.length > 0 ? submit.id : undefined)

    if (!requestId) {
      // Some endpoints may respond with a direct URL.
      if (typeof submit.url === 'string' && submit.url.length > 0) {
        const videoUrl = submit.url
        auditVideoGenerationEvent({
          requestId:
            _input.requestId ?? toVideoRequestId(`${modelEndpoint}:direct`, 'muapi'),
          provider: 'muapi',
          model: modelEndpoint,
          levelId: _input.levelId,
          type: _input.type,
          playerId: _input.spec.playerId ?? 'unknown',
          locale: _input.spec.locale,
          latencyMs: 0,
          inputChars: submitPayload.prompt.length,
          outputChars: videoUrl.length,
        })
        return { videoUrl }
      }
      throw new ApiError(ERROR_CODES.INTERNAL_ERROR, 'Muapi submit response missing request_id', 500)
    }

    const startedAt = Date.now()
    const result = await pollForResult(cfg.baseUrl, cfg.apiKey, requestId)
    const latencyMs = Date.now() - startedAt
    const videoUrl = toVideoUrlFromPollResult(result)
    if (!videoUrl) {
      throw new ApiError(ERROR_CODES.INTERNAL_ERROR, 'Muapi result missing video URL', 500)
    }

    auditVideoGenerationEvent({
      requestId:
        _input.requestId ?? toVideoRequestId(requestId, 'muapi'),
      provider: 'muapi',
      model: modelEndpoint,
      levelId: _input.levelId,
      type: _input.type,
      playerId: _input.spec.playerId ?? 'unknown',
      locale: _input.spec.locale,
      latencyMs,
      inputChars: submitPayload.prompt.length,
      outputChars: videoUrl.length,
    })

    return { videoUrl }
  },
}
