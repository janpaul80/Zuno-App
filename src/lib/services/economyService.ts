import { ApiError } from '../api/errors'
import {
  economyRepository,
  type EconomyTransactionRecord,
  type PlayerWalletRecord,
  type SupportedCurrency,
  type WalletRpcResult,
} from '../repositories/economyRepository'

export interface EconomyOperation {
  transactionId: string
  playerId: string
  currency: SupportedCurrency
  amount: number
  sourceDomain: string
  sourceReference: string
  requestId: string
}

function createDefaultWallet(playerId: string): PlayerWalletRecord {
  return {
    player_id: playerId,
    coins: 0,
    gems: 0,
    updated_at: new Date().toISOString(),
  }
}

function assertPositiveAmount(amount: number): void {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new ApiError('BAD_REQUEST', 'Amount must be a positive integer', 400)
  }
}

function mapWalletRpcResultToWallet(result: WalletRpcResult): PlayerWalletRecord {
  return {
    player_id: result.player_id,
    coins: result.wallet_coins,
    gems: result.wallet_gems,
    updated_at: result.wallet_updated_at,
  }
}

export const economyService = {
  async getBalance(playerId: string): Promise<PlayerWalletRecord> {
    return (await economyRepository.getWallet(playerId)) ?? createDefaultWallet(playerId)
  },

  // Creates a zero-balance wallet row if it doesn't exist.
  // Intentionally does not create a ledger entry.
  async ensureWallet(playerId: string): Promise<PlayerWalletRecord> {
    const existing = await economyRepository.getWallet(playerId)
    if (existing) return existing

    const record = createDefaultWallet(playerId)
    await economyRepository.upsertWallet(record)
    return record
  },

  async credit(operation: EconomyOperation): Promise<PlayerWalletRecord> {
    assertPositiveAmount(operation.amount)

    const result = await economyRepository.creditWallet({
      transactionId: operation.transactionId,
      playerId: operation.playerId,
      currency: operation.currency,
      amount: operation.amount,
      sourceDomain: operation.sourceDomain,
      sourceReference: operation.sourceReference,
      requestId: operation.requestId,
    })

    return mapWalletRpcResultToWallet(result)
  },

  async debit(operation: EconomyOperation): Promise<PlayerWalletRecord> {
    assertPositiveAmount(operation.amount)

    const result = await economyRepository.debitWallet({
      transactionId: operation.transactionId,
      playerId: operation.playerId,
      currency: operation.currency,
      amount: operation.amount,
      sourceDomain: operation.sourceDomain,
      sourceReference: operation.sourceReference,
      requestId: operation.requestId,
    })

    return mapWalletRpcResultToWallet(result)
  },

  async recordTransaction(record: EconomyTransactionRecord): Promise<void> {
    await economyRepository.createTransaction(record)
  },

  async listTransactions(playerId: string): Promise<EconomyTransactionRecord[]> {
    return economyRepository.listTransactions(playerId)
  },
}
