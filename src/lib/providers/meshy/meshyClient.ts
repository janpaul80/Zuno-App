import { ApiError, ERROR_CODES } from '@/lib/api/errors'
import { auditVideoGenerationEvent, toVideoRequestId } from '@/lib/services/videoGenerationAudit'

export type MeshyAssetCategory =
  | 'weapon'
  | 'armor'
  | 'gadget'
  | 'npc'
  | 'creature'
  | 'environment_prop'

export interface MeshyAssetSpec {
  name?: string
  locale?: string
  summary: string
  category: MeshyAssetCategory
  style?: string
  levelId?: string
  playerId?: string
  providerConfig?: Record<string, unknown>
}

export interface MeshyGenerationResult {
  jobId: string
  assets: readonly MeshyGeneratedAsset[]
}

export interface MeshyGeneratedAsset {
  id: string
  url: string
  format: 'glb' | 'fbx'
  category: MeshyAssetCategory
}

export interface MeshyHealth {
  ok: boolean
  provider: 'meshy'
}

interface MeshyTask {
  id?: string
  status?: string
  progress?: number
  task_error?: { message?: string }
  model_urls?: { glb?: string; fbx?: string }
}

function getMeshyConfig(): { apiKey: string; baseUrl: string } {
  const apiKey = (process.env.MESHY_AI_API ?? process.env.MESHI_AI_API)?.trim()
  if (!apiKey) {
    throw new ApiError(
      ERROR_CODES.INTERNAL_ERROR,
      'Meshy API key missing (set MESHY_AI_API in .env.local)',
      500,
    )
  }
  return {
    apiKey,
    baseUrl: (process.env.MESHY_BASE_URL ?? 'https://api.meshy.ai').replace(/\/$/, ''),
  }
}

function buildPrompt(spec: MeshyAssetSpec): string {
  const lines = [spec.name ?? `${spec.category} asset`, `Category: ${spec.category}`, spec.summary]
  if (spec.levelId) lines.push(`ZUNO mission: ${spec.levelId}`)
  if (spec.style) lines.push(`Style: ${spec.style}`)
  return lines.join('\n').slice(0, 600)
}

async function requestJson(
  url: string,
  apiKey: string,
  init: Omit<RequestInit, 'headers'>,
  timeoutMs = 120_000,
): Promise<unknown> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      signal: controller.signal,
    })
    if (!response.ok) {
      throw new ApiError(
        ERROR_CODES.INTERNAL_ERROR,
        `Meshy request failed (${response.status})`,
        response.status >= 500 ? 503 : 500,
      )
    }
    return await response.json()
  } finally {
    clearTimeout(timer)
  }
}

function readTaskId(value: unknown): string {
  if (!value || typeof value !== 'object') {
    throw new ApiError(ERROR_CODES.INTERNAL_ERROR, 'Meshy task response was malformed', 502)
  }
  const result = (value as Record<string, unknown>).result
  if (typeof result !== 'string' || !result) {
    throw new ApiError(ERROR_CODES.INTERNAL_ERROR, 'Meshy task response did not contain an id', 502)
  }
  return result
}

async function pollTask(baseUrl: string, apiKey: string, taskId: string): Promise<MeshyTask> {
  for (let attempt = 0; attempt < 120; attempt++) {
    if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, 2_000))
    const task = await requestJson(
      `${baseUrl}/openapi/v2/text-to-3d/${encodeURIComponent(taskId)}`,
      apiKey,
      { method: 'GET' },
    ) as MeshyTask
    const status = task.status?.toUpperCase()
    if (status === 'SUCCEEDED') return task
    if (status === 'FAILED' || status === 'EXPIRED') {
      throw new ApiError(
        ERROR_CODES.INTERNAL_ERROR,
        task.task_error?.message || `Meshy task ended with status ${status}`,
        502,
      )
    }
  }
  throw new ApiError(ERROR_CODES.INTERNAL_ERROR, 'Meshy generation timed out', 504)
}

export const meshyClient = {
  async healthCheck(): Promise<MeshyHealth> {
    getMeshyConfig()
    return { ok: true, provider: 'meshy' }
  },

  async generateAsset(spec: MeshyAssetSpec): Promise<MeshyGenerationResult> {
    const summary = spec.summary.trim()
    if (!summary) throw new ApiError('BAD_REQUEST', 'Meshy asset summary is required', 400)

    const { apiKey, baseUrl } = getMeshyConfig()
    const endpoint = `${baseUrl}/openapi/v2/text-to-3d`
    const prompt = buildPrompt({ ...spec, summary })
    const startedAt = Date.now()

    const previewId = readTaskId(await requestJson(endpoint, apiKey, {
      method: 'POST',
      body: JSON.stringify({
        ...(spec.providerConfig ?? {}),
        mode: 'preview',
        prompt,
        model_type: 'lowpoly',
        target_formats: ['glb', 'fbx'],
      }),
    }))
    await pollTask(baseUrl, apiKey, previewId)

    const refineId = readTaskId(await requestJson(endpoint, apiKey, {
      method: 'POST',
      body: JSON.stringify({
        mode: 'refine',
        preview_task_id: previewId,
        enable_pbr: true,
        target_formats: ['glb', 'fbx'],
      }),
    }))
    const refined = await pollTask(baseUrl, apiKey, refineId)

    const assets: MeshyGeneratedAsset[] = []
    if (refined.model_urls?.glb) assets.push({ id: refineId, url: refined.model_urls.glb, format: 'glb', category: spec.category })
    if (refined.model_urls?.fbx) assets.push({ id: refineId, url: refined.model_urls.fbx, format: 'fbx', category: spec.category })
    if (assets.length === 0) {
      throw new ApiError(ERROR_CODES.INTERNAL_ERROR, 'Meshy completed without GLB or FBX output', 502)
    }

    const requestId = toVideoRequestId(`meshy:${refineId}`, 'meshy')
    auditVideoGenerationEvent({
      requestId,
      provider: 'meshy',
      model: 'text-to-3d-v2',
      levelId: spec.levelId,
      type: spec.category,
      playerId: spec.playerId,
      locale: spec.locale,
      latencyMs: Date.now() - startedAt,
      inputChars: prompt.length,
      outputChars: assets.reduce((total, asset) => total + asset.url.length, 0),
    })

    return { jobId: refineId, assets }
  },
}
