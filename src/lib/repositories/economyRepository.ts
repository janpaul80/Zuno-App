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

export interface WalletRpcResult {
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
  wallet_coins: number
  wallet_gems: number
  wallet_updated_at: string
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

  async creditWallet(args: {
    transactionId: string
    playerId: string
    currency: SupportedCurrency
    amount: number
    sourceDomain: string
    sourceReference: string
    requestId: string
  }): Promise<WalletRpcResult> {
    const { data, error } = await supabaseServer.rpc('credit_wallet_rpc', {
      p_transaction_id: args.transactionId,
      p_player_id: args.playerId,
      p_currency: args.currency,
      p_amount: args.amount,
      p_source_domain: args.sourceDomain,
      p_source_reference: args.sourceReference,
      p_request_id: args.requestId,
    })

    if (error) {
      if (/amount must be a positive integer/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'Amount must be a positive integer', 400)
      }
      if (/unsupported currency/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'Unsupported currency', 400)
      }
      throw new ApiError('INTERNAL_ERROR', error.message, 500)
    }
    return (data as WalletRpcResult[])[0]
  },

  async debitWallet(args: {
    transactionId: string
    playerId: string
    currency: SupportedCurrency
    amount: number
    sourceDomain: string
    sourceReference: string
    requestId: string
  }): Promise<WalletRpcResult> {
    const { data, error } = await supabaseServer.rpc('debit_wallet_rpc', {
      p_transaction_id: args.transactionId,
      p_player_id: args.playerId,
      p_currency: args.currency,
      p_amount: args.amount,
      p_source_domain: args.sourceDomain,
      p_source_reference: args.sourceReference,
      p_request_id: args.requestId,
    })

    if (error) {
      // RPC raises exceptions; map a few known cases from message text.
      if (/amount must be a positive integer/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'Amount must be a positive integer', 400)
      }

      if (/unsupported currency/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'Unsupported currency', 400)
      }

      if (/insufficient balance/i.test(error.message)) {
        throw new ApiError('CONFLICT', 'Insufficient balance', 409)
      }

      throw new ApiError('INTERNAL_ERROR', error.message, 500)
    }
    return (data as WalletRpcResult[])[0]
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
