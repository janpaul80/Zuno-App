import { ApiError } from '@/lib/api/errors'
import { getHiggsfieldConfig } from '@/lib/config/aiProviders'

export type CinematicType =
  | 'game_intro'
  | 'level_intro'
  | 'boss_intro'
  | 'victory'
  | 'ending'

export interface HiggsfieldCinematicInput {
  type: CinematicType
  levelId?: string
  // The cinematic spec should be produced by AI Director + game config.
  // Includes script, shot list, style refs, etc.
  spec: Record<string, unknown>
  requestId?: string
}

export interface HiggsfieldCinematicResult {
  videoUrl: string
}

export const higgsfieldClient = {
  /**
   * Phase 1: interface only.
   *
   * This will be implemented after we define the Higgsfield request contract
   * and storage strategy for generated video assets.
   */
  async generateCinematic(_input: HiggsfieldCinematicInput): Promise<HiggsfieldCinematicResult> {
    // Validate that the environment is present when this is enabled.
    // Phase 1 does NOT perform generation.
    getHiggsfieldConfig()
    throw new ApiError(
      'INTERNAL_ERROR',
      'Higgsfield cinematic generation is not enabled yet (architecture-only in Phase 1)',
      501,
    )
  },
}
