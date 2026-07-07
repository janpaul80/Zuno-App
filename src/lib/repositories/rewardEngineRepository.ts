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
  error_code?: string | null
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

export interface ProcessRewardRequestRpcResult {
  request_id: string
  status: RewardRequestStatus
  error_code: string | null
  error_message: string | null
  processed_at: string | null
  wallet_coins: number
  wallet_gems: number
  wallet_updated_at: string
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

  async processRewardRequestRpc(args: {
    requestId: string
    playerId: string
    sourceDomain: string
    sourceReference: string
    rewards: unknown
    metadata: Record<string, unknown>
    createdAt: string
  }): Promise<ProcessRewardRequestRpcResult> {
    const { data, error } = await supabaseServer.rpc('process_reward_request_rpc', {
      p_request_id: args.requestId,
      p_player_id: args.playerId,
      p_source_domain: args.sourceDomain,
      p_source_reference: args.sourceReference,
      p_rewards: args.rewards,
      p_metadata: args.metadata,
      p_created_at: args.createdAt,
    })

    if (error) {
      // Like other RPCs, errors come back as structured error objects.
      // We map only a small set of likely caller faults.
      if (/requestId is required/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'requestId is required', 400)
      }
      if (/playerId is required/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'playerId is required', 400)
      }
      if (/sourceDomain is required/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'sourceDomain is required', 400)
      }
      if (/sourceReference is required/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'sourceReference is required', 400)
      }
      if (/rewards must be an array/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'rewards must be an array', 400)
      }
      if (/At least one reward entry is required/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'At least one reward entry is required', 400)
      }
      if (/Unsupported reward type/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', error.message, 400)
      }

      throw new ApiError('INTERNAL_ERROR', error.message, 500)
    }

    const row = (data as unknown as ProcessRewardRequestRpcResult[] | null)?.[0]
    if (!row) {
      throw new ApiError('INTERNAL_ERROR', 'Reward RPC returned no result', 500)
    }

    return row
  },
}
