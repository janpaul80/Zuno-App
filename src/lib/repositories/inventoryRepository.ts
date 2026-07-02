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
}
