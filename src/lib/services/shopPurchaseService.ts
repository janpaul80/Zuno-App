import { supabaseServer } from '../supabase/server';
import { ApiError } from '../api/errors';
import type {
  ShopItem,
  PlayerCurrency,
  PlayerInventoryItem,
} from '../repositories/types';

export interface PurchaseResult {
  purchase_id: string;
  item: ShopItem;
  new_currency: PlayerCurrency;
  inventory_item: PlayerInventoryItem;
}

export const shopPurchaseService = {
  async purchase(
    playerId: string,
    itemId: string,
    currencyType: 'coins' | 'gems',
    idempotencyKey?: string
  ): Promise<PurchaseResult> {
    const client = supabaseServer;

    // TECHNICAL NOTE:
    // The current implementation performs multiple sequential Supabase calls and is therefore NOT fully atomic.
    // A later revision will replace this logic with a single Postgres RPC or database transaction to ensure atomicity.

    // 1. Load item from shop_items
    const { data: item, error: itemErr } = await client
      .from('shop_items')
      .select('*')
      .eq('id', itemId)
      .eq('is_active', true)
      .maybeSingle();
    if (itemErr) throw new ApiError('INTERNAL_ERROR', itemErr.message, 500);
    if (!item) throw new ApiError('NOT_FOUND', 'Item not found or inactive', 404);

    // Prevent duplicate non-consumable purchases
    if (!item.is_consumable) {
      const { data: owned, error: ownedErr } = await client
        .from('player_inventory')
        .select('item_id')
        .eq('player_id', playerId)
        .eq('item_id', itemId)
        .maybeSingle();
      if (ownedErr) throw new ApiError('INTERNAL_ERROR', ownedErr.message, 500);
      if (owned) throw new ApiError('ALREADY_OWNED', 'Item already owned', 409);
    }

    // Idempotency check (duplicate transaction replay detection)
    if (idempotencyKey) {
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
    }

    const price = currencyType === 'coins' ? item.price_coins : item.price_gems;
    if (price <= 0) throw new ApiError('BAD_REQUEST', 'Item cannot be purchased with this currency', 400);

    // 2. Load player currency
    const { data: currency, error: cErr } = await client
      .from('player_currency')
      .select('*')
      .eq('player_id', playerId)
      .maybeSingle();
    if (cErr) throw new ApiError('INTERNAL_ERROR', cErr.message, 500);
    if (!currency) throw new ApiError('NOT_FOUND', 'Currency record not found', 404);

    // 3. Check balance
    const balance = currency[currencyType];
    if (balance < price) throw new ApiError('INSUFFICIENT_FUNDS', 'Not enough currency', 402);

    // 4. Deduct currency (update)
    const newBalance = balance - price;
    const { error: updErr, data: updatedCurrencyArr } = await client
      .from('player_currency')
      .update({ [currencyType]: newBalance })
      .eq('player_id', playerId)
      .select();
    if (updErr) throw new ApiError('INTERNAL_ERROR', updErr.message, 500);

    const updatedCurrency = updatedCurrencyArr?.[0] as PlayerCurrency;

    // 5. Add inventory item (upsert)
    const { data: invData, error: invErr } = await client
      .from('player_inventory')
      .upsert({ player_id: playerId, item_id: itemId, quantity: 1 }, { onConflict: 'player_id,item_id' })
      .select();
    if (invErr) throw new ApiError('INTERNAL_ERROR', invErr.message, 500);

    const inventoryItem = invData?.[0] as PlayerInventoryItem;

    // 6. Record purchase
    const { data: purchaseData, error: purErr } = await client
      .from('purchases')
      .insert({
        player_id: playerId,
        item_id: itemId,
        currency_type: currencyType,
        price,
        idempotency_key: idempotencyKey ?? null,
      })
      .select();
    if (purErr) throw new ApiError('INTERNAL_ERROR', purErr.message, 500);

    const purchase = purchaseData?.[0];

    // 7. Ledger record
    await client.from('currency_ledger').insert({
      player_id: playerId,
      currency_type: currencyType,
      delta: -price,
      reason: 'purchase',
      reference_id: purchase.id,
    });

    // 8. Inventory event record
    await client.from('inventory_events').insert({
      player_id: playerId,
      item_id: itemId,
      event_type: 'purchase',
    });

    return {
      purchase_id: purchase.id,
      item: item as ShopItem,
      new_currency: updatedCurrency,
      inventory_item: inventoryItem,
    };
  },
};
