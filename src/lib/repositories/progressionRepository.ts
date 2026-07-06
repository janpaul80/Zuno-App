import { supabaseServer } from '../supabase/server'
import { ApiError } from '../api/errors'

export interface PlayerProgressionRecord {
  player_id: string
  level: number
  xp: number
  xp_to_next: number
  updated_at: string
  created_at: string
}

// TODO: Replace manual interfaces with generated Supabase database types.

export const progressionRepository = {
  async getPlayerProgression(playerId: string): Promise<PlayerProgressionRecord | null> {
    const { data, error } = await supabaseServer
      .from('player_progression')
      .select('*')
      .eq('player_id', playerId)
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return (data as PlayerProgressionRecord) ?? null
  },

  async upsertPlayerProgression(
    record: PlayerProgressionRecord,
  ): Promise<PlayerProgressionRecord> {
    const { data, error } = await supabaseServer
      .from('player_progression')
      .upsert(record, { onConflict: 'player_id' })
      .select('*')
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    if (!data) throw new ApiError('INTERNAL_ERROR', 'Progression upsert returned no data', 500)

    return data as PlayerProgressionRecord
  },
}
