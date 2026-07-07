import { supabaseServer } from '../supabase/server'
import { ApiError } from '../api/errors'

export interface PlayerInventoryItemRecord {
  player_id: string
  item_id: string
  quantity: number
  metadata: Record<string, unknown>
  updated_at: string
}

// TODO: Replace manual interfaces with generated Supabase database types.

export interface InventoryTransactionRecord {
  transaction_id: string
  player_id: string
  item_id: string
  quantity_delta: number
  quantity_before: number
  quantity_after: number
  source_domain: string
  source_reference: string
  request_id: string
  created_at: string
}

export interface InventoryRpcResult {
  transaction_id: string
  player_id: string
  item_id: string
  quantity_delta: number
  quantity_before: number
  quantity_after: number
  source_domain: string
  source_reference: string
  request_id: string
  created_at: string
  item_quantity: number
  item_metadata: Record<string, unknown>
  item_updated_at: string
}

export const inventoryRepository = {
  async getInventoryItem(
    playerId: string,
    itemId: string,
  ): Promise<PlayerInventoryItemRecord | null> {
    const { data, error } = await supabaseServer
      .from('player_inventory_items')
      .select('*')
      .eq('player_id', playerId)
      .eq('item_id', itemId)
      .maybeSingle()

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return (data as PlayerInventoryItemRecord) ?? null
  },

  async upsertInventoryItem(record: PlayerInventoryItemRecord): Promise<void> {
    const { error } = await supabaseServer
      .from('player_inventory_items')
      .upsert(record, { onConflict: 'player_id,item_id' })

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
  },

  async listInventory(playerId: string): Promise<PlayerInventoryItemRecord[]> {
    const { data, error } = await supabaseServer
      .from('player_inventory_items')
      .select('*')
      .eq('player_id', playerId)
      .order('updated_at', { ascending: false })

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return data as PlayerInventoryItemRecord[]
  },

  async createInventoryTransaction(
    record: InventoryTransactionRecord,
  ): Promise<void> {
    const { error } = await supabaseServer
      .from('inventory_transactions')
      .insert(record)

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
  },

  async listInventoryTransactions(
    playerId: string,
  ): Promise<InventoryTransactionRecord[]> {
    const { data, error } = await supabaseServer
      .from('inventory_transactions')
      .select('*')
      .eq('player_id', playerId)
      .order('created_at', { ascending: false })

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500)
    return data as InventoryTransactionRecord[]
  },

  async grantInventoryItem(args: {
    transactionId: string
    playerId: string
    itemId: string
    quantity: number
    sourceDomain: string
    sourceReference: string
    requestId: string
    metadata?: Record<string, unknown>
    stackLimit?: number
  }): Promise<InventoryRpcResult> {
    const { data, error } = await supabaseServer.rpc('grant_inventory_item_rpc', {
      p_transaction_id: args.transactionId,
      p_player_id: args.playerId,
      p_item_id: args.itemId,
      p_quantity: args.quantity,
      p_source_domain: args.sourceDomain,
      p_source_reference: args.sourceReference,
      p_request_id: args.requestId,
      p_metadata: args.metadata ?? {},
      p_stack_limit: args.stackLimit ?? 999,
    })

    if (error) {
      if (/quantity must be a positive integer/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'Quantity must be a positive integer', 400)
      }
      if (/invalid itemid/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'Invalid itemId', 400)
      }
      if (/stack limit exceeded/i.test(error.message)) {
        throw new ApiError('CONFLICT', error.message, 409)
      }
      throw new ApiError('INTERNAL_ERROR', error.message, 500)
    }

    return (data as InventoryRpcResult[])[0]
  },

  async removeInventoryItem(args: {
    transactionId: string
    playerId: string
    itemId: string
    quantity: number
    sourceDomain: string
    sourceReference: string
    requestId: string
  }): Promise<InventoryRpcResult> {
    const { data, error } = await supabaseServer.rpc('remove_inventory_item_rpc', {
      p_transaction_id: args.transactionId,
      p_player_id: args.playerId,
      p_item_id: args.itemId,
      p_quantity: args.quantity,
      p_source_domain: args.sourceDomain,
      p_source_reference: args.sourceReference,
      p_request_id: args.requestId,
    })

    if (error) {
      if (/quantity must be a positive integer/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'Quantity must be a positive integer', 400)
      }
      if (/invalid itemid/i.test(error.message)) {
        throw new ApiError('BAD_REQUEST', 'Invalid itemId', 400)
      }
      if (/inventory item not found/i.test(error.message)) {
        throw new ApiError('NOT_FOUND', 'Inventory item not found', 404)
      }
      if (/insufficient item quantity/i.test(error.message)) {
        throw new ApiError('CONFLICT', 'Insufficient item quantity', 409)
      }
      throw new ApiError('INTERNAL_ERROR', error.message, 500)
    }

    return (data as InventoryRpcResult[])[0]
  },
}
