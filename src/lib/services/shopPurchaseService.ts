import { randomUUID } from 'crypto';
import { ApiError } from '../api/errors';
import { economyService } from './economyService';
import { inventoryService } from './inventoryService';
import { supabaseServer } from '../supabase/server';
import type { ShopItem } from '../repositories/types';
import type { PlayerWalletRecord, SupportedCurrency } from '../repositories/economyRepository';
import type { PlayerInventoryItemRecord } from '../repositories/inventoryRepository';

export interface PurchaseResult {
  purchase_id: string;
  item: ShopItem;
  new_currency: PlayerWalletRecord;
  inventory_item: PlayerInventoryItemRecord;
}

interface PurchaseAuditRecord {
  id: string;
  player_id: string;
  item_id: string;
  quantity: number;
  total_cost_coins: number;
  total_cost_gems: number;
  currency_type: SupportedCurrency;
  price: number;
  idempotency_key: string;
  status: 'pending' | 'completed' | 'failed';
  completed_at: string | null;
  created_at: string;
}

async function updatePurchaseStatus(
  purchaseId: string,
  status: PurchaseAuditRecord['status'],
  completedAt: string | null,
): Promise<void> {
  const { error } = await supabaseServer
    .from('purchases')
    .update({ status, completed_at: completedAt })
    .eq('id', purchaseId);

  if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500);
}

export const shopPurchaseService = {
  async purchase(
    playerId: string,
    itemId: string,
    currencyType: SupportedCurrency,
    idempotencyKey: string,
  ): Promise<PurchaseResult> {
    const client = supabaseServer;

    // TECHNICAL NOTE:
    // This flow now routes balance and inventory mutations through Economy v2 and Inventory v2.
    // It still performs multiple sequential Supabase/service calls and is therefore NOT fully atomic.
    // A later revision should replace this orchestration with a single Postgres RPC or database transaction.

    if (!idempotencyKey) {
      throw new ApiError('BAD_REQUEST', 'idempotencyKey is required', 400);
    }

    // 1. Load item from shop_items using server-authoritative catalog data.
    const { data: item, error: itemErr } = await client
      .from('shop_items')
      .select('*')
      .eq('id', itemId)
      .eq('is_active', true)
      .maybeSingle();

    if (itemErr) throw new ApiError('INTERNAL_ERROR', itemErr.message, 500);
    if (!item) throw new ApiError('NOT_FOUND', 'Item not found or inactive', 404);

    const shopItem = item as ShopItem;

    // Prevent duplicate non-consumable purchases through Inventory v2 ownership state.
    if (!shopItem.is_consumable) {
      const inventory = await inventoryService.getInventory(playerId);
      const owned = inventory.some(
        (inventoryItem) => inventoryItem.item_id === itemId && inventoryItem.quantity > 0,
      );

      if (owned) throw new ApiError('ALREADY_OWNED', 'Item already owned', 409);
    }

    // Idempotency check (duplicate transaction replay detection).
    const { data: existingPurchase, error: existErr } = await client
      .from('purchases')
      .select('*')
      .eq('player_id', playerId)
      .eq('idempotency_key', idempotencyKey)
      .maybeSingle();

    if (existErr) throw new ApiError('INTERNAL_ERROR', existErr.message, 500);
    if (existingPurchase) {
      throw new ApiError('IDEMPOTENT_REPLAY', 'Duplicate request: purchase already processed', 409);
    }

    const price = currencyType === 'coins' ? shopItem.price_coins : shopItem.price_gems;
    if (price <= 0) throw new ApiError('BAD_REQUEST', 'Item cannot be purchased with this currency', 400);

    // 2. Create purchase audit record before authority-service mutations.
    const purchaseId = randomUUID();
    const createdAt = new Date().toISOString();
    const purchaseRecord: PurchaseAuditRecord = {
      id: purchaseId,
      player_id: playerId,
      item_id: itemId,
      quantity: 1,
      total_cost_coins: currencyType === 'coins' ? price : 0,
      total_cost_gems: currencyType === 'gems' ? price : 0,
      currency_type: currencyType,
      price,
      idempotency_key: idempotencyKey,
      status: 'pending',
      completed_at: null,
      created_at: createdAt,
    };

    const { error: purErr } = await client
      .from('purchases')
      .insert(purchaseRecord);

    if (purErr) throw new ApiError('INTERNAL_ERROR', purErr.message, 500);

    try {
      // 3. Debit through Economy v2 authority.
      const updatedCurrency = await economyService.debit({
        transactionId: `${idempotencyKey}:shop-debit`,
        playerId,
        currency: currencyType,
        amount: price,
        sourceDomain: 'shop',
        sourceReference: purchaseId,
        requestId: idempotencyKey,
      });

      // 4. Grant through Inventory v2 authority.
      const inventoryItem = await inventoryService.grantItem({
        transactionId: `${idempotencyKey}:inventory-grant`,
        playerId,
        itemId,
        quantity: 1,
        sourceDomain: 'shop',
        sourceReference: purchaseId,
        requestId: idempotencyKey,
        metadata: {
          purchaseId,
          idempotencyKey,
          isConsumable: shopItem.is_consumable,
        },
      });

      await updatePurchaseStatus(purchaseId, 'completed', new Date().toISOString());

      return {
        purchase_id: purchaseId,
        item: shopItem,
        new_currency: updatedCurrency,
        inventory_item: inventoryItem,
      };
    } catch (error) {
      await updatePurchaseStatus(purchaseId, 'failed', null);

      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError('INTERNAL_ERROR', 'Purchase processing failed', 500);
    }
  },
};
