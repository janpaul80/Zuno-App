-- Phase 15: Shop Purchase - Transactional Orchestration RPC

-- Purpose:
-- Provide a single atomic purchase path that:
-- - validates shop item + active flag server-side
-- - prevents duplicate non-consumable ownership
-- - debits wallet (Economy v2)
-- - grants inventory (Inventory v2)
-- - creates/updates purchases audit record
-- - supports idempotency via p_idempotency_key
--
-- Invocation:
-- Server-side only using Supabase service role.

-- Add error fields for durable failure summaries.
ALTER TABLE purchases
  ADD COLUMN IF NOT EXISTS error_code TEXT,
  ADD COLUMN IF NOT EXISTS error_message TEXT;

CREATE OR REPLACE FUNCTION process_shop_purchase_rpc(
  p_player_id UUID,
  p_shop_item_id UUID,
  p_currency_type TEXT,
  p_idempotency_key TEXT,
  p_quantity BIGINT DEFAULT 1
)
RETURNS TABLE(
  purchase_id UUID,
  status TEXT,
  error_code TEXT,
  error_message TEXT,
  player_id UUID,
  shop_item_id UUID,
  shop_item JSONB,
  quantity BIGINT,
  currency_type TEXT,
  price BIGINT,
  total_cost BIGINT,
  created_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  wallet_coins BIGINT,
  wallet_gems BIGINT,
  wallet_updated_at TIMESTAMPTZ,
  inventory_item_id TEXT,
  inventory_quantity BIGINT,
  inventory_metadata JSONB,
  inventory_updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_existing purchases;
  v_purchase purchases;
  v_item shop_items;
  v_qty BIGINT;
  v_price BIGINT;
  v_total_cost BIGINT;
  v_now TIMESTAMPTZ;
  v_purchase_id UUID;
  v_wallet player_wallets;
  v_inventory player_inventory_items;
  v_debit_tx_id TEXT;
  v_grant_tx_id TEXT;
  v_error_code TEXT;
  v_error_message TEXT;
  v_wallet_coins BIGINT;
  v_wallet_gems BIGINT;
  v_wallet_updated_at TIMESTAMPTZ;
  v_inventory_quantity BIGINT;
  v_inventory_metadata JSONB;
  v_inventory_updated_at TIMESTAMPTZ;
BEGIN
  IF auth.role() <> 'service_role' THEN
    RAISE EXCEPTION 'Forbidden' USING ERRCODE = '42501';
  END IF;

  IF p_idempotency_key IS NULL OR length(trim(p_idempotency_key)) = 0 THEN
    RAISE EXCEPTION 'idempotency_key is required' USING ERRCODE = '22023';
  END IF;

  IF p_currency_type NOT IN ('coins', 'gems') THEN
    RAISE EXCEPTION 'Unsupported currency' USING ERRCODE = '22023';
  END IF;

  v_qty := COALESCE(p_quantity, 1);
  IF v_qty IS NULL OR v_qty <= 0 THEN
    RAISE EXCEPTION 'Quantity must be a positive integer' USING ERRCODE = '22023';
  END IF;

  IF v_qty > 1 THEN
    -- Current shop supports single-unit purchases only. This prevents accidental
    -- large-stack buys until UI/flow explicitly supports it.
    RAISE EXCEPTION 'Quantity greater than 1 is not supported' USING ERRCODE = '22023';
  END IF;

  -- Idempotency: if purchase exists for this player+key, return it with current wallet+inventory.
  SELECT * INTO v_existing
    FROM purchases
    WHERE purchases.player_id = p_player_id
      AND purchases.idempotency_key = p_idempotency_key;

  IF FOUND THEN
    -- Ensure wallet exists for consistent return shapes.
    INSERT INTO player_wallets (player_id) VALUES (p_player_id)
    ON CONFLICT (player_id) DO NOTHING;

    SELECT * INTO v_wallet FROM player_wallets WHERE player_wallets.player_id = p_player_id;
    v_wallet_coins := COALESCE(v_wallet.coins, 0);
    v_wallet_gems := COALESCE(v_wallet.gems, 0);
    v_wallet_updated_at := COALESCE(v_wallet.updated_at, timezone('utc', now()));

    SELECT * INTO v_item FROM shop_items WHERE shop_items.id = v_existing.item_id;

    -- Inventory row may not exist (failed purchase, post-failure retry); default to 0/empty.
    SELECT * INTO v_inventory FROM player_inventory_items
      WHERE player_inventory_items.player_id = p_player_id
        AND player_inventory_items.item_id = v_existing.item_id::text;
    v_inventory_quantity := COALESCE(v_inventory.quantity, 0);
    v_inventory_metadata := COALESCE(v_inventory.metadata, '{}'::jsonb);
    v_inventory_updated_at := COALESCE(v_inventory.updated_at, timezone('utc', now()));

    RETURN QUERY
    SELECT
      v_existing.id,
      v_existing.status,
      v_existing.error_code,
      v_existing.error_message,
      v_existing.player_id,
      v_existing.item_id,
      to_jsonb(v_item),
      v_existing.quantity,
      v_existing.currency_type,
      v_existing.price,
      CASE
        WHEN v_existing.currency_type = 'coins' THEN v_existing.total_cost_coins
        ELSE v_existing.total_cost_gems
      END,
      v_existing.created_at,
      v_existing.completed_at,
      v_wallet_coins,
      v_wallet_gems,
      v_wallet_updated_at,
      COALESCE(v_inventory.item_id, v_existing.item_id::text),
      v_inventory_quantity,
      v_inventory_metadata,
      v_inventory_updated_at;
    RETURN;
  END IF;

  -- Load canonical item state from shop_items.
  SELECT * INTO v_item
    FROM shop_items
    WHERE shop_items.id = p_shop_item_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Item not found' USING ERRCODE = 'P0001';
  END IF;

  IF v_item.is_active IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'Item not found or inactive' USING ERRCODE = 'P0001';
  END IF;

  IF p_currency_type = 'coins' THEN
    v_price := COALESCE(v_item.price_coins, 0);
  ELSE
    v_price := COALESCE(v_item.price_gems, 0);
  END IF;

  IF v_price <= 0 THEN
    RAISE EXCEPTION 'Item cannot be purchased with this currency' USING ERRCODE = 'P0001';
  END IF;

  v_total_cost := v_price * v_qty;
  v_now := timezone('utc', now());
  v_purchase_id := gen_random_uuid();

  -- Duplicate non-consumable ownership guard.
  IF v_item.is_consumable IS DISTINCT FROM true THEN
    -- Ensure row exists and lock it to prevent concurrent duplicate purchases.
    INSERT INTO player_inventory_items (player_id, item_id)
    VALUES (p_player_id, p_shop_item_id::text)
    ON CONFLICT (player_id, item_id) DO NOTHING;

    SELECT * INTO v_inventory
      FROM player_inventory_items
      WHERE player_inventory_items.player_id = p_player_id
        AND player_inventory_items.item_id = p_shop_item_id::text
      FOR UPDATE;

    IF FOUND AND v_inventory.quantity > 0 THEN
      RAISE EXCEPTION 'Item already owned' USING ERRCODE = 'P0001';
    END IF;
  END IF;

  -- Create pending purchase record (inside the same transaction).
  INSERT INTO purchases (
    id,
    player_id,
    item_id,
    quantity,
    total_cost_coins,
    total_cost_gems,
    currency_type,
    price,
    idempotency_key,
    status,
    error_code,
    error_message,
    completed_at,
    created_at
  ) VALUES (
    v_purchase_id,
    p_player_id,
    p_shop_item_id,
    v_qty,
    CASE WHEN p_currency_type = 'coins' THEN v_total_cost ELSE 0 END,
    CASE WHEN p_currency_type = 'gems' THEN v_total_cost ELSE 0 END,
    p_currency_type,
    v_price,
    p_idempotency_key,
    'pending',
    NULL,
    NULL,
    NULL,
    v_now
  );

  -- Perform atomic side effects via sub-RPCs.
  v_debit_tx_id := p_idempotency_key || ':shop-debit';
  v_grant_tx_id := p_idempotency_key || ':inventory-grant';

  -- Run debit+grant+finalize inside a subtransaction so failures can be recorded
  -- without leaving partial writes.
  BEGIN
    -- Wallet debit (raises on insufficient balance).
    PERFORM 1 FROM debit_wallet_rpc(
      v_debit_tx_id,
      p_player_id,
      p_currency_type,
      v_total_cost,
      'shop',
      v_purchase_id::text,
      p_idempotency_key
    );

    -- Inventory grant (enforces stack limits and positive quantities).
    PERFORM 1 FROM grant_inventory_item_rpc(
      v_grant_tx_id,
      p_player_id,
      p_shop_item_id::text,
      v_qty,
      'shop',
      v_purchase_id::text,
      p_idempotency_key,
      jsonb_build_object(
        'purchaseId', v_purchase_id::text,
        'idempotencyKey', p_idempotency_key,
        'isConsumable', v_item.is_consumable
      ),
      999
    );

    -- Mark purchase completed.
    UPDATE purchases
      SET status = 'completed',
          completed_at = v_now
      WHERE purchases.id = v_purchase_id;
  EXCEPTION
    WHEN others THEN
      v_error_message := SQLERRM;
      v_error_code := 'INTERNAL_ERROR';

      IF v_error_message ILIKE '%insufficient balance%' THEN
        v_error_code := 'INSUFFICIENT_FUNDS';
      ELSIF v_error_message ILIKE '%item already owned%' THEN
        v_error_code := 'ALREADY_OWNED';
      ELSIF v_error_message ILIKE '%stack limit exceeded%' THEN
        v_error_code := 'STACK_LIMIT_EXCEEDED';
      ELSIF v_error_message ILIKE '%item not found or inactive%' THEN
        v_error_code := 'ITEM_INACTIVE';
      ELSIF v_error_message ILIKE '%item not found%' THEN
        v_error_code := 'ITEM_NOT_FOUND';
      END IF;

      UPDATE purchases
        SET status = 'failed',
            error_code = v_error_code,
            error_message = v_error_message,
            completed_at = NULL
        WHERE purchases.id = v_purchase_id;
  END;

  SELECT * INTO v_purchase FROM purchases WHERE purchases.id = v_purchase_id;
  SELECT * INTO v_wallet FROM player_wallets WHERE player_wallets.player_id = p_player_id;
  v_wallet_coins := COALESCE(v_wallet.coins, 0);
  v_wallet_gems := COALESCE(v_wallet.gems, 0);
  v_wallet_updated_at := COALESCE(v_wallet.updated_at, timezone('utc', now()));

  SELECT * INTO v_inventory FROM player_inventory_items
    WHERE player_inventory_items.player_id = p_player_id
      AND player_inventory_items.item_id = p_shop_item_id::text;
  v_inventory_quantity := COALESCE(v_inventory.quantity, 0);
  v_inventory_metadata := COALESCE(v_inventory.metadata, '{}'::jsonb);
  v_inventory_updated_at := COALESCE(v_inventory.updated_at, timezone('utc', now()));

  RETURN QUERY
  SELECT
    v_purchase.id,
    v_purchase.status,
    v_purchase.error_code,
    v_purchase.error_message,
    v_purchase.player_id,
    v_purchase.item_id,
    to_jsonb(v_item),
    v_purchase.quantity,
    v_purchase.currency_type,
    v_purchase.price,
    CASE
      WHEN v_purchase.currency_type = 'coins' THEN v_purchase.total_cost_coins
      ELSE v_purchase.total_cost_gems
    END,
    v_purchase.created_at,
    v_purchase.completed_at,
    v_wallet_coins,
    v_wallet_gems,
    v_wallet_updated_at,
    COALESCE(v_inventory.item_id, p_shop_item_id::text),
    v_inventory_quantity,
    v_inventory_metadata,
    v_inventory_updated_at;
END;
$$;
