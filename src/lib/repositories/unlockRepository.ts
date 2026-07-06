import { supabaseServer } from '../supabase/server'
import { ApiError } from '../api/errors'

export type UnlockType =
  | 'character'
  | 'cosmetic'
  | 'reward'
  | 'weapon'
  | 'ability'
  | 'feature'

export interface PlayerUnlock {
  player_id: string
  unlock_key: string
  unlock_type: UnlockType
  granted_at: string
}

// TODO: Replace manual interfaces with generated Supabase database types.

export const unlockRepository = {
  async findAllByPlayerId(playerId: string): Promise<PlayerUnlock[]> {
    const { data, error } = await supabaseServer
      .from('player_unlocks')
      .select('*')
      .eq('player_id', playerId)

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return (data as PlayerUnlock[]) ?? []
  },

  async findByPlayerIdAndKey(playerId: string, unlockKey: string): Promise<PlayerUnlock | null> {
    const { data, error } = await supabaseServer
      .from('player_unlocks')
      .select('*')
      .eq('player_id', playerId)
      .eq('unlock_key', unlockKey)
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return (data as PlayerUnlock) ?? null
  },

  async insertUnlock(record: PlayerUnlock): Promise<PlayerUnlock> {
    const { data, error } = await supabaseServer
      .from('player_unlocks')
      .upsert(record, {
        onConflict: 'player_id,unlock_key',
        ignoreDuplicates: true,
      })
      .select()
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)

    if (data) {
      return data as PlayerUnlock
    }

    const existing = await unlockRepository.findByPlayerIdAndKey(
      record.player_id,
      record.unlock_key,
    )

    if (existing) {
      return existing
    }

    throw new ApiError('INTERNAL_ERROR', 'Failed to insert unlock', 500)
  },
}
