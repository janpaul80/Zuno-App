import { supabaseServer } from '../supabase/server'
import { ApiError } from '../api/errors'

export type SupportedCurrency = 'coins' | 'gems'

export interface PlayerWalletRecord {
  player_id: string
  coins: number
  gems: number
  updated_at: string
}

// TODO: Replace manual interfaces with generated Supabase database types.

export interface EconomyTransactionRecord {
  transaction_id: string
  player_id: string
  currency: SupportedCurrency
  amount: number
  balance_before: number
  balance_after: number
  source_domain: string
  source_reference: string
  request_id: string
  created_at: string
}

export const economyRepository = {
  async getWallet(playerId: string): Promise<PlayerWalletRecord | null> {
    const { data, error } = await supabaseServer
      .from('player_wallets')
      .select('*')
      .eq('player_id', playerId)
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return (data as PlayerWalletRecord) ?? null
  },

  async upsertWallet(record: PlayerWalletRecord): Promise<void> {
    const { error } = await supabaseServer
      .from('player_wallets')
      .upsert(record, { onConflict: 'player_id' })

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
  },

  async createTransaction(record: EconomyTransactionRecord): Promise<void> {
    const { error } = await supabaseServer
      .from('economy_transactions')
      .insert(record)

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
  },

  async listTransactions(playerId: string): Promise<EconomyTransactionRecord[]> {
    const { data, error } = await supabaseServer
      .from('economy_transactions')
      .select('*')
      .eq('player_id', playerId)
      .order('created_at', { ascending: false })

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return data as EconomyTransactionRecord[]
  },
}
