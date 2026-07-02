import { ApiError } from '../api/errors'
import {
  inventoryRepository,
  type InventoryTransactionRecord,
  type PlayerInventoryItemRecord,
} from '../repositories/inventoryRepository'

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

function createDefaultInventoryItem(
  playerId: string,
  itemId: string,
  metadata: Record<string, unknown>,
): PlayerInventoryItemRecord {
  return {
    player_id: playerId,
    item_id: itemId,
    quantity: 0,
    metadata,
    updated_at: new Date().toISOString(),
  }
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

function createInventoryTransaction(
  operation: InventoryOperation,
  quantityDelta: number,
  quantityBefore: number,
  quantityAfter: number,
): InventoryTransactionRecord {
  return {
    transaction_id: operation.transactionId,
    player_id: operation.playerId,
    item_id: operation.itemId,
    quantity_delta: quantityDelta,
    quantity_before: quantityBefore,
    quantity_after: quantityAfter,
    source_domain: operation.sourceDomain,
    source_reference: operation.sourceReference,
    request_id: operation.requestId,
    created_at: new Date().toISOString(),
  }
}

export const inventoryService = {
  validateStackLimits,

  async getInventory(playerId: string): Promise<PlayerInventoryItemRecord[]> {
    return inventoryRepository.listInventory(playerId)
  },

  async grantItem(operation: InventoryOperation): Promise<PlayerInventoryItemRecord> {
    assertPositiveQuantity(operation.quantity)

    const existing =
      (await inventoryRepository.getInventoryItem(operation.playerId, operation.itemId)) ??
      createDefaultInventoryItem(
        operation.playerId,
        operation.itemId,
        operation.metadata ?? {},
      )

    const quantityBefore = existing.quantity
    const quantityAfter = quantityBefore + operation.quantity
    const mergedMetadata = {
      ...existing.metadata,
      ...(operation.metadata ?? {}),
    }

    validateStackLimits(quantityAfter, mergedMetadata)

    const updatedItem: PlayerInventoryItemRecord = {
      ...existing,
      quantity: quantityAfter,
      metadata: mergedMetadata,
      updated_at: new Date().toISOString(),
    }

    await inventoryRepository.upsertInventoryItem(updatedItem)
    await inventoryRepository.createInventoryTransaction(
      createInventoryTransaction(
        operation,
        operation.quantity,
        quantityBefore,
        quantityAfter,
      ),
    )

    return updatedItem
  },

  async removeItem(operation: InventoryOperation): Promise<PlayerInventoryItemRecord> {
    assertPositiveQuantity(operation.quantity)

    const existing = await inventoryRepository.getInventoryItem(
      operation.playerId,
      operation.itemId,
    )

    if (!existing) {
      throw new ApiError('NOT_FOUND', 'Inventory item not found', 404)
    }

    const quantityBefore = existing.quantity
    const quantityAfter = quantityBefore - operation.quantity

    if (quantityAfter < 0) {
      throw new ApiError('CONFLICT', 'Insufficient item quantity', 409)
    }

    const updatedItem: PlayerInventoryItemRecord = {
      ...existing,
      quantity: quantityAfter,
      updated_at: new Date().toISOString(),
    }

    await inventoryRepository.upsertInventoryItem(updatedItem)
    await inventoryRepository.createInventoryTransaction(
      createInventoryTransaction(
        operation,
        -operation.quantity,
        quantityBefore,
        quantityAfter,
      ),
    )

    return updatedItem
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
