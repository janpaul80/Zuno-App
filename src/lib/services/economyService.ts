import { ApiError } from '../api/errors'
import {
  economyRepository,
  type EconomyTransactionRecord,
  type PlayerWalletRecord,
  type SupportedCurrency,
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

function resolveNextBalance(
  balance: number,
  delta: number,
): number {
  const nextBalance = balance + delta

  if (nextBalance < 0) {
    throw new ApiError('CONFLICT', 'Insufficient balance', 409)
  }

  return nextBalance
}

function createTransactionRecord(
  operation: EconomyOperation,
  balanceBefore: number,
  balanceAfter: number,
): EconomyTransactionRecord {
  return {
    transaction_id: operation.transactionId,
    player_id: operation.playerId,
    currency: operation.currency,
    amount: operation.amount,
    balance_before: balanceBefore,
    balance_after: balanceAfter,
    source_domain: operation.sourceDomain,
    source_reference: operation.sourceReference,
    request_id: operation.requestId,
    created_at: new Date().toISOString(),
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

    const wallet = await this.getBalance(operation.playerId)
    const balanceBefore = wallet[operation.currency]
    const balanceAfter = resolveNextBalance(balanceBefore, operation.amount)
    const updatedAt = new Date().toISOString()

    const updatedWallet: PlayerWalletRecord = {
      ...wallet,
      [operation.currency]: balanceAfter,
      updated_at: updatedAt,
    }

    await economyRepository.upsertWallet(updatedWallet)
    await economyRepository.createTransaction(
      createTransactionRecord(operation, balanceBefore, balanceAfter),
    )

    return updatedWallet
  },

  async debit(operation: EconomyOperation): Promise<PlayerWalletRecord> {
    assertPositiveAmount(operation.amount)

    const wallet = await this.getBalance(operation.playerId)
    const balanceBefore = wallet[operation.currency]
    const balanceAfter = resolveNextBalance(balanceBefore, -operation.amount)
    const updatedAt = new Date().toISOString()

    const updatedWallet: PlayerWalletRecord = {
      ...wallet,
      [operation.currency]: balanceAfter,
      updated_at: updatedAt,
    }

    await economyRepository.upsertWallet(updatedWallet)
    await economyRepository.createTransaction(
      createTransactionRecord(
        { ...operation, amount: -operation.amount },
        balanceBefore,
        balanceAfter,
      ),
    )

    return updatedWallet
  },

  async recordTransaction(record: EconomyTransactionRecord): Promise<void> {
    await economyRepository.createTransaction(record)
  },

  async listTransactions(playerId: string): Promise<EconomyTransactionRecord[]> {
    return economyRepository.listTransactions(playerId)
  },
}
