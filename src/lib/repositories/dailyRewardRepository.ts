import { supabaseServer } from '../supabase/server'
import { ApiError } from '../api/errors'

export interface DailyRewardDefinition {
  day: number
  reward_type: string | null
  reward_amount: number
  reward_bundle: Record<string, unknown> | null
  created_at: string
}

// TODO: Replace manual interfaces with generated Supabase database types.

export interface PlayerDailyReward {
  player_id: string
  current_streak: number
  total_claims: number
  last_claim_day: number | null
  last_claimed_at: string | null
  next_eligible_claim_at: string | null
  updated_at: string
  created_at: string
}

export const dailyRewardRepository = {
  async listDefinitions(): Promise<DailyRewardDefinition[]> {
    const { data, error } = await supabaseServer
      .from('daily_reward_definitions')
      .select('*')
      .order('day', { ascending: true })

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return data as DailyRewardDefinition[]
  },

  async getDefinitionByDay(day: number): Promise<DailyRewardDefinition | null> {
    const { data, error } = await supabaseServer
      .from('daily_reward_definitions')
      .select('*')
      .eq('day', day)
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return (data as DailyRewardDefinition) ?? null
  },

  async getPlayerDailyReward(playerId: string): Promise<PlayerDailyReward | null> {
    const { data, error } = await supabaseServer
      .from('player_daily_rewards')
      .select('*')
      .eq('player_id', playerId)
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return (data as PlayerDailyReward) ?? null
  },

  async upsertPlayerDailyReward(record: PlayerDailyReward): Promise<void> {
    const { error } = await supabaseServer
      .from('player_daily_rewards')
      .upsert(record, { onConflict: 'player_id' })

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
  },
}
