import { createHash } from 'crypto'

export interface VideoGenerationAuditEvent {
  requestId: string
  timestamp: string
  provider: 'muapi' | 'meshy' | 'blackbox'
  model?: string
  levelId?: string
  type?: string
  playerId?: string
  locale?: string
  latencyMs: number
  inputChars: number
  outputChars: number
}

function safeHash(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 16)
}

/**
 * Video/cinematic generation audit logging.
 *
 * - No raw prompt/input/output is logged.
 * - This is console-only until a persistence policy is defined.
 */
export function auditVideoGenerationEvent(
  event: Omit<VideoGenerationAuditEvent, 'timestamp'>,
): void {
  const payload: VideoGenerationAuditEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  }

  console.info('[video_generation_audit]', JSON.stringify(payload))
}

export function toVideoRequestId(base: string, provider: 'muapi' | 'meshy' | 'blackbox'): string {
  return `${provider}:${safeHash(base)}`
}
