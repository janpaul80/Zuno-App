import { randomUUID, createHash } from 'crypto'

import type { AiDirectorCategory } from './aiDirectorSchemas'

export interface AiDirectorAuditEvent {
  requestId: string
  timestamp: string
  playerId: string
  conversationIdHash?: string
  locale?: string
  category: AiDirectorCategory
  provider: 'langdock'
  model?: string
  latencyMs: number
  inputChars: number
  outputChars: number
}

function safeHash(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 16)
}

/**
 * Phase 2: audit logging without storing user text.
 *
 * - No raw prompt/input/output is logged.
 * - This is deliberately console-only until a persistence policy is defined.
 */
export function auditAiDirectorEvent(event: Omit<AiDirectorAuditEvent, 'timestamp'>) {
  const payload: AiDirectorAuditEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  }

  // JSON log line for future ingestion.
  console.info('[ai_director_audit]', JSON.stringify(payload))
}

export function createAiDirectorRequestId(): string {
  return `ai_director:${randomUUID()}`
}

export function toConversationIdHash(conversationId: string | undefined): string | undefined {
  if (!conversationId) return undefined
  return safeHash(conversationId)
}
