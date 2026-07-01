import { supabaseServer } from '../supabase/server'
import { ApiError } from '../api/errors'

export interface PlayerUnlock {
  player_id: string
  unlock_key: string
  unlock_type: 'character' | 'cosmetic' | 'reward'
  granted_at: string
}

export const unlockRepository = {
  async findAllByPlayerId(playerId: string): Promise<PlayerUnlock[]> {
    const { data, error } = await supabaseServer
      .from('player_unlocks')
      .select('*')
      .eq('player_id', playerId)

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return data ?? []
  },

  async findByPlayerIdAndKey(playerId: string, unlockKey: string): Promise<PlayerUnlock | null> {
    const { data, error } = await supabaseServer
      .from('player_unlocks')
      .select('*')
      .eq('player_id', playerId)
      .eq('unlock_key', unlockKey)
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return data ?? null
  },

  async insertUnlock(record: PlayerUnlock): Promise<PlayerUnlock> {
    const { data, error } = await supabaseServer
      .from('player_unlocks')
      .insert(record)
      .select()
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    if (!data) throw new ApiError('INTERNAL_ERROR', 'Failed to insert unlock', 500)
    return data
  },
}
