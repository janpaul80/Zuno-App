import { ApiError } from '../api/errors'
import type { ShopItem } from '../repositories/types'
import type { SupportedCurrency } from '../repositories/economyRepository'
import type { PlayerInventoryItemRecord } from '../repositories/inventoryRepository'
import type { PlayerWalletRecord } from '../repositories/economyRepository'
import { purchaseRepository } from '../repositories/purchaseRepository'

export interface PurchaseResult {
  purchase_id: string
  item: ShopItem
  new_currency: PlayerWalletRecord
  inventory_item: PlayerInventoryItemRecord
}

export const shopPurchaseService = {
  async purchase(
    playerId: string,
    itemId: string,
    currencyType: SupportedCurrency,
    idempotencyKey: string,
  ): Promise<PurchaseResult> {
    if (!idempotencyKey) {
      throw new ApiError('BAD_REQUEST', 'idempotencyKey is required', 400)
    }

    const result = await purchaseRepository.processShopPurchase({
      playerId,
      shopItemId: itemId,
      currencyType,
      idempotencyKey,
    })

    if (!result.shop_item) {
      throw new ApiError('INTERNAL_ERROR', 'Purchase did not return shop item', 500)
    }

    if (result.status === 'failed') {
      // The purchase row is the durable audit trail for the failure.
      const code = result.error_code ?? 'PURCHASE_FAILED'
      const message = result.error_message ?? 'Purchase failed'

      if (code === 'INSUFFICIENT_FUNDS') {
        throw new ApiError('CONFLICT', 'Insufficient balance', 409)
      }

      if (code === 'ALREADY_OWNED') {
        throw new ApiError('ALREADY_OWNED', 'Item already owned', 409)
      }

      if (code === 'STACK_LIMIT_EXCEEDED') {
        throw new ApiError('CONFLICT', message, 409)
      }

      if (code === 'ITEM_INACTIVE' || code === 'ITEM_NOT_FOUND') {
        throw new ApiError('NOT_FOUND', 'Item not found or inactive', 404)
      }

      throw new ApiError('INTERNAL_ERROR', message, 500)
    }

    return {
      purchase_id: result.purchase_id,
      item: result.shop_item,
      new_currency: {
        player_id: result.player_id,
        coins: result.wallet_coins,
        gems: result.wallet_gems,
        updated_at: result.wallet_updated_at,
      },
      inventory_item: {
        player_id: result.player_id,
        item_id: result.inventory_item_id,
        quantity: result.inventory_quantity,
        metadata: result.inventory_metadata ?? {},
        updated_at: result.inventory_updated_at,
      },
    }
  },
};
