import { ApiError } from '@/lib/api/errors'
import { getVoiceboxConfig } from '@/lib/config/aiProviders'

export type VoiceboxVoiceRole = 'narrator' | 'npc' | 'mission' | 'cinematic'

export interface VoiceboxSynthesisInput {
  text: string
  voiceRole: VoiceboxVoiceRole
  // Optional future selectors.
  voiceId?: string
  locale?: string
  // Stable idempotency for generation jobs.
  requestId?: string
}

export interface VoiceboxSynthesisResult {
  // The backend should return an internal URL for an audio asset.
  // Phase 1 returns a plan-only placeholder.
  audioUrl: string
}

export const voiceboxClient = {
  /**
   * Phase 1: interface only.
   *
   * This will be implemented once we stand up the local Voicebox service and
   * decide on output storage (local cache vs Supabase Storage vs CDN).
   */
  async synthesize(_input: VoiceboxSynthesisInput): Promise<VoiceboxSynthesisResult> {
    // Accessing config is intentionally cheap and doesn't enforce any keys.
    getVoiceboxConfig()
    throw new ApiError(
      'INTERNAL_ERROR',
      'Voicebox synthesis is not enabled yet (architecture-only in Phase 1)',
      501,
    )
  },
}
