import { supabaseServer } from '../supabase/server'
import { ApiError } from '../api/errors'

export type RewardRequestStatus = 'pending' | 'processed' | 'failed' | 'ignored'

export interface RewardRequestRecord {
  request_id: string
  player_id: string
  source_domain: string
  source_reference: string
  status: RewardRequestStatus
  rewards: unknown
  metadata: Record<string, unknown>
  error_message: string | null
  processed_at: string | null
  created_at: string
}

// TODO: Replace manual interfaces with generated Supabase database types.

export interface RewardEventRecord {
  id?: number
  request_id: string
  player_id: string
  source_domain: string
  reward_type: string
  amount: number | null
  status: RewardRequestStatus
  metadata: Record<string, unknown>
  error_message: string | null
  created_at?: string
}

export const rewardEngineRepository = {
  async findRequestById(requestId: string): Promise<RewardRequestRecord | null> {
    const { data, error } = await supabaseServer
      .from('reward_requests')
      .select('*')
      .eq('request_id', requestId)
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return (data as RewardRequestRecord) ?? null
  },

  async createRewardRequest(record: RewardRequestRecord): Promise<void> {
    const { error } = await supabaseServer.from('reward_requests').insert(record)

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
  },

  async updateRewardRequestStatus(
    requestId: string,
    status: RewardRequestStatus,
    processedAt: string | null,
    errorMessage: string | null,
  ): Promise<void> {
    const { error } = await supabaseServer
      .from('reward_requests')
      .update({
        status,
        processed_at: processedAt,
        error_message: errorMessage,
      })
      .eq('request_id', requestId)

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
  },

  async createRewardEvent(record: RewardEventRecord): Promise<void> {
    const { error } = await supabaseServer.from('reward_events').insert(record)

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
  },

  async listPlayerRewardEvents(playerId: string): Promise<RewardEventRecord[]> {
    const { data, error } = await supabaseServer
      .from('reward_events')
      .select('*')
      .eq('player_id', playerId)
      .order('created_at', { ascending: false })

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return data as RewardEventRecord[]
  },
}
