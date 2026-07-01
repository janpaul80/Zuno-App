import { supabaseServer } from '../supabase/server'
import { ApiError } from '../api/errors'

export interface QuestDefinition {
  key: string
  name: string
  description: string
  target_value: number
  reward_type?: string | null
  reward_amount: number
  created_at: string
}

// TODO: Replace manual interfaces with generated Supabase database types.

export interface PlayerQuest {
  player_id: string
  quest_key: string
  progress: number
  completed: boolean
  claimed: boolean
  completed_at?: string | null
  claimed_at?: string | null
  updated_at: string
}

export const questRepository = {
  async listDefinitions(): Promise<QuestDefinition[]> {
    const { data, error } = await supabaseServer
      .from('quest_definitions')
      .select('*')

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return data as QuestDefinition[]
  },

  async getDefinitionByKey(key: string): Promise<QuestDefinition | null> {
    const { data, error } = await supabaseServer
      .from('quest_definitions')
      .select('*')
      .eq('key', key)
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return (data as QuestDefinition) ?? null
  },

  async listPlayerQuests(playerId: string): Promise<PlayerQuest[]> {
    const { data, error } = await supabaseServer
      .from('player_quests')
      .select('*')
      .eq('player_id', playerId)

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return data as PlayerQuest[]
  },

  async getPlayerQuest(
    playerId: string,
    questKey: string,
  ): Promise<PlayerQuest | null> {
    const { data, error } = await supabaseServer
      .from('player_quests')
      .select('*')
      .eq('player_id', playerId)
      .eq('quest_key', questKey)
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return (data as PlayerQuest) ?? null
  },

  async upsertPlayerQuest(record: PlayerQuest): Promise<void> {
    const { error } = await supabaseServer
      .from('player_quests')
      .upsert(record, { onConflict: 'player_id,quest_key' })

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
  },
}
