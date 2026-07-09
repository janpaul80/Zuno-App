import { ApiError } from '../api/errors'

export interface AiDirectorRateLimitInput {
  playerId: string
}

export interface AiDirectorRateLimitResult {
  allowed: boolean
  reason?: string
}

/**
 * Phase 2 placeholder.
 *
 * In production, this should be implemented with a shared store (Upstash/Redis)
 * or platform-native rate limiting.
 */
export const aiDirectorRateLimit = {
  async check(input: AiDirectorRateLimitInput): Promise<AiDirectorRateLimitResult> {
    void input
    return { allowed: true }
  },

  async checkOrThrow(input: AiDirectorRateLimitInput): Promise<void> {
    const result = await aiDirectorRateLimit.check(input)
    if (!result.allowed) {
      throw new ApiError('RATE_LIMITED', result.reason ?? 'Rate limit exceeded', 429)
    }
  },
}
