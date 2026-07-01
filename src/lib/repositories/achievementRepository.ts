import { supabaseServer } from '../supabase/server'
import { ApiError } from '../api/errors'

export interface AchievementDefinition {
  key: string
  name: string
  description: string
  target_value: number
  reward_type?: string | null
  reward_amount: number
  created_at: string
}

// TODO: Replace manual interfaces with generated Supabase database types.

export interface PlayerAchievement {
  player_id: string
  achievement_key: string
  progress: number
  completed: boolean
  completed_at?: string | null
  updated_at: string
}

export const achievementRepository = {
  async listDefinitions(): Promise<AchievementDefinition[]> {
    const { data, error } = await supabaseServer
      .from('achievement_definitions')
      .select('*')

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return data as AchievementDefinition[]
  },

  async getDefinitionByKey(key: string): Promise<AchievementDefinition | null> {
    const { data, error } = await supabaseServer
      .from('achievement_definitions')
      .select('*')
      .eq('key', key)
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return (data as AchievementDefinition) ?? null
  },

  async listPlayerAchievements(playerId: string): Promise<PlayerAchievement[]> {
    const { data, error } = await supabaseServer
      .from('player_achievements')
      .select('*')
      .eq('player_id', playerId)

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return data as PlayerAchievement[]
  },

  async getPlayerAchievement(
    playerId: string,
    achievementKey: string,
  ): Promise<PlayerAchievement | null> {
    const { data, error } = await supabaseServer
      .from('player_achievements')
      .select('*')
      .eq('player_id', playerId)
      .eq('achievement_key', achievementKey)
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return (data as PlayerAchievement) ?? null
  },

  async upsertPlayerAchievement(record: PlayerAchievement): Promise<void> {
    const { error } = await supabaseServer
      .from('player_achievements')
      .upsert(record, { onConflict: 'player_id,achievement_key' })

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
  },
}
