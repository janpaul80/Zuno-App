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
  /**
   * Free-form provider-specific configuration.
   */
  providerConfig?: Record<string, unknown>
}

export interface MeshyGenerationRequest {
  prompt: string
  category: MeshyAssetCategory
  style?: string
  /**
   * Additional Meshy-specific configuration fields.
   * These will be populated once the official SDK/docs are wired.
   */
  [key: string]: unknown
}

export interface MeshyJobStatusResponse {
  id?: string
  status?: string
  error?: string
  /**
   * Provider-specific result payload.
   */
  result?: unknown
}

export interface MeshyGenerationResult {
  jobId: string
  assets: readonly MeshyGeneratedAsset[]
}

export interface MeshyGeneratedAsset {
  id: string
  url: string
  category: MeshyAssetCategory
}

export interface MeshyHealth {
  ok: boolean
  provider: 'meshy'
}

function getMeshyApiKey(): string {
  const canonical = process.env.MESHY_AI_API
  const legacy = process.env.MESHI_AI_API

  const key = (canonical ?? legacy)?.trim()
  if (!key) {
    throw new ApiError(
      ERROR_CODES.INTERNAL_ERROR,
      'Meshy API key missing (set MESHY_AI_API or MESHI_AI_API in .env.local)',
      500,
    )
  }
  return key
}

function buildMeshyGenerationRequest(spec: MeshyAssetSpec): MeshyGenerationRequest {
  const title = spec.name ?? `${spec.category} asset`
  const summary = spec.summary
  const lines: string[] = []
  lines.push(title)
  lines.push(`Category: ${spec.category}`)
  if (spec.levelId) lines.push(`Level: ${spec.levelId}`)
  lines.push(`Summary: ${summary}`)
  if (spec.style) lines.push(`Style: ${spec.style}`)

  const prompt = lines.join('\n')

  const base: MeshyGenerationRequest = {
    prompt,
    category: spec.category,
  }

  if (spec.style) base.style = spec.style

  const providerConfig = spec.providerConfig ?? {}
  return { ...base, ...providerConfig }
}

export const meshyClient = {
  /**
   * Health check for Meshy provider configuration.
   *
   * We only validate presence of the API key here. Network health checks
   * must be implemented once the official Meshy REST/SDK endpoints are
   * wired.
   */
  async healthCheck(): Promise<MeshyHealth> {
    getMeshyApiKey()
    return { ok: true, provider: 'meshy' }
  },

  /**
   * Generates an asset via Meshy.
   *
   * IMPORTANT: This is a provider/advisory layer only. It must not
   * directly mutate gameplay state. Any usage should be treated as
   * tooling for asset pipelines, not runtime gameplay mutation.
   *
   * The current implementation does not make a real network call; it
   * is a structural foundation that can be wired to the official Meshy
   * API once available. Tests and the smoke script exercise this adapter
   * via mocked responses.
   */
  async generateAsset(spec: MeshyAssetSpec): Promise<MeshyGenerationResult> {
    const apiKey = getMeshyApiKey()
    const payload = buildMeshyGenerationRequest(spec)

    // Placeholder: the actual submit + poll flow will be implemented
    // using the official Meshy REST/SDK once wired. For now, we treat
    // this as a synchronous stub so that unit tests and architecture
    // can be validated.
    const fakeJobId = toVideoRequestId(`meshy:${spec.category}:${spec.summary}`, 'meshy')
    const fakeAsset: MeshyGeneratedAsset = {
      id: fakeJobId,
      url: 'https://example.com/meshy/asset.glb',
      category: spec.category,
    }

    // Structured audit: no prompts, result payloads, or secrets.
    auditVideoGenerationEvent({
      requestId: fakeJobId,
      provider: 'meshy',
      model: undefined,
      levelId: spec.levelId,
      type: spec.category,
      playerId: spec.playerId ?? 'unknown',
      locale: spec.locale,
      latencyMs: 0,
      inputChars: payload.prompt.length,
      outputChars: fakeAsset.url.length,
    })

    // apiKey is only read to validate configuration and is never logged.
    void apiKey

    return {
      jobId: fakeJobId,
      assets: [fakeAsset],
    }
  },
}
