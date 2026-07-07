import { ApiError } from '../api/errors'
import { supabaseServer } from '../supabase/server'
import type { ShopItem } from './types'

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

type JsonbShopItem = ShopItem | Record<string, unknown> | null

export interface ProcessShopPurchaseResult {
  purchase_id: string
  status: 'pending' | 'completed' | 'failed'
  error_code: string | null
  error_message: string | null
  player_id: string
  shop_item_id: string
  shop_item: ShopItem | null
  quantity: number
  currency_type: 'coins' | 'gems'
  price: number
  total_cost: number
  created_at: string
  completed_at: string | null
  wallet_coins: number
  wallet_gems: number
  wallet_updated_at: string
  inventory_item_id: string
  inventory_quantity: number
  inventory_metadata: Record<string, unknown>
  inventory_updated_at: string
}

export interface PurchaseRepository {
  processShopPurchase(args: {
    playerId: string
    shopItemId: string
    currencyType: 'coins' | 'gems'
    idempotencyKey: string
  }): Promise<ProcessShopPurchaseResult>
}

export const purchaseRepository: PurchaseRepository = {
  async processShopPurchase(args): Promise<ProcessShopPurchaseResult> {
    const { data, error } = await supabaseServer.rpc('process_shop_purchase_rpc', {
      p_player_id: args.playerId,
      p_shop_item_id: args.shopItemId,
      p_currency_type: args.currencyType,
      p_idempotency_key: args.idempotencyKey,
      p_quantity: 1,
    })

    if (error) {
      // RPC raises exceptions, but Supabase surfaces them as errors.
      // Map a few known cases from message text.
      if (/idempotency_key is required/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'idempotencyKey is required', 400)
      }
      if (/unsupported currency/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'Unsupported currency', 400)
      }
      if (/quantity must be a positive integer/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'Quantity must be a positive integer', 400)
      }
      if (/quantity greater than 1 is not supported/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'Quantity greater than 1 is not supported', 400)
      }
      throw new ApiError('INTERNAL_ERROR', error.message, 500)
    }

    // Supabase returns rpc rows as `unknown` shapes; we normalize JSONB fields below.
    const row = (data as unknown as (ProcessShopPurchaseResult & {
      shop_item: JsonbShopItem
      inventory_metadata: unknown
    })[] | null)?.[0]
    if (!row) {
      throw new ApiError('INTERNAL_ERROR', 'Purchase RPC returned no result', 500)
    }

    const normalizedShopItem = isPlainObject(row.shop_item)
      ? (row.shop_item as unknown as ShopItem)
      : row.shop_item

    const normalizedInventoryMetadata = isPlainObject(row.inventory_metadata)
      ? row.inventory_metadata
      : {}

    const normalized: ProcessShopPurchaseResult = {
      ...row,
      shop_item: normalizedShopItem as ShopItem | null,
      inventory_metadata: normalizedInventoryMetadata,
    }

    return normalized
  },
}
