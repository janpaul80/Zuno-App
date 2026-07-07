import { ApiError } from '../api/errors'
import {
  inventoryRepository,
  type InventoryTransactionRecord,
  type PlayerInventoryItemRecord,
  type InventoryRpcResult,
} from '../repositories/inventoryRepository'

// InventoryRepository remains the persistence boundary; direct transaction writes
// are still supported for rare administrative/repair operations.

const DEFAULT_STACK_LIMIT = 999

export interface InventoryOperation {
  transactionId: string
  playerId: string
  itemId: string
  quantity: number
  sourceDomain: string
  sourceReference: string
  requestId: string
  metadata?: Record<string, unknown>
}

function assertPositiveQuantity(quantity: number): void {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new ApiError('BAD_REQUEST', 'Quantity must be a positive integer', 400)
  }
}

function resolveStackLimit(metadata: Record<string, unknown>): number {
  const stackLimit = metadata.stackLimit

  if (typeof stackLimit === 'number' && Number.isInteger(stackLimit) && stackLimit > 0) {
    return stackLimit
  }

  return DEFAULT_STACK_LIMIT
}

function validateStackLimits(
  quantityAfter: number,
  metadata: Record<string, unknown>,
): void {
  const stackLimit = resolveStackLimit(metadata)

  if (quantityAfter > stackLimit) {
    throw new ApiError(
      'CONFLICT',
      `Stack limit exceeded for item (max ${stackLimit})`,
      409,
    )
  }
}

function mapInventoryRpcResultToItem(
  playerId: string,
  itemId: string,
  result: InventoryRpcResult,
): PlayerInventoryItemRecord {
  return {
    player_id: playerId,
    item_id: itemId,
    quantity: result.item_quantity,
    metadata: result.item_metadata ?? {},
    updated_at: result.item_updated_at,
  }
}


export const inventoryService = {
  validateStackLimits,

  async getInventory(playerId: string): Promise<PlayerInventoryItemRecord[]> {
    return inventoryRepository.listInventory(playerId)
  },

  async grantItem(operation: InventoryOperation): Promise<PlayerInventoryItemRecord> {
    assertPositiveQuantity(operation.quantity)

    // Stack limit enforcement remains in service based on metadata; stackLimit is passed
    // explicitly to the RPC to keep the mutation atomic.
    const existing = await inventoryRepository.getInventoryItem(operation.playerId, operation.itemId)
    const existingMetadata = existing?.metadata ?? (operation.metadata ?? {})
    const mergedMetadata = {
      ...existingMetadata,
      ...(operation.metadata ?? {}),
    }

    const stackLimit = resolveStackLimit(mergedMetadata)
    const quantityAfter = (existing?.quantity ?? 0) + operation.quantity
    validateStackLimits(quantityAfter, mergedMetadata)

    const result = await inventoryRepository.grantInventoryItem({
      transactionId: operation.transactionId,
      playerId: operation.playerId,
      itemId: operation.itemId,
      quantity: operation.quantity,
      sourceDomain: operation.sourceDomain,
      sourceReference: operation.sourceReference,
      requestId: operation.requestId,
      metadata: operation.metadata,
      stackLimit,
    })

    return mapInventoryRpcResultToItem(operation.playerId, operation.itemId, result)
  },

  // Ensures a starter inventory item exists without writing legacy tables.
  // Uses Inventory v2 upsert + ledgering through the existing grantItem path.
  async ensureItem(
    input: Omit<InventoryOperation, 'transactionId' | 'quantity'> & {
      transactionId: string
      quantity?: number
    },
  ): Promise<PlayerInventoryItemRecord> {
    const existing = await inventoryRepository.getInventoryItem(
      input.playerId,
      input.itemId,
    )

    if (existing && existing.quantity > 0) {
      return existing
    }

    return inventoryService.grantItem({
      transactionId: input.transactionId,
      playerId: input.playerId,
      itemId: input.itemId,
      quantity: input.quantity ?? 1,
      sourceDomain: input.sourceDomain,
      sourceReference: input.sourceReference,
      requestId: input.requestId,
      metadata: input.metadata,
    })
  },

  async removeItem(operation: InventoryOperation): Promise<PlayerInventoryItemRecord> {
    assertPositiveQuantity(operation.quantity)

    const result = await inventoryRepository.removeInventoryItem({
      transactionId: operation.transactionId,
      playerId: operation.playerId,
      itemId: operation.itemId,
      quantity: operation.quantity,
      sourceDomain: operation.sourceDomain,
      sourceReference: operation.sourceReference,
      requestId: operation.requestId,
    })

    return mapInventoryRpcResultToItem(operation.playerId, operation.itemId, result)
  },

  async recordInventoryTransaction(
    record: InventoryTransactionRecord,
  ): Promise<void> {
    await inventoryRepository.createInventoryTransaction(record)
  },

  async listInventoryTransactions(
    playerId: string,
  ): Promise<InventoryTransactionRecord[]> {
    return inventoryRepository.listInventoryTransactions(playerId)
  },
}
