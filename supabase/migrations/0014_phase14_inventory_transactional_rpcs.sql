-- Phase 14: Inventory Enhancements v2 - Transactional RPCs

-- NOTE: These RPCs are intended to be invoked by server-side code using the
-- Supabase service role key. They enforce atomicity for inventory mutations.

-- Default stack limit mirrors application DEFAULT_STACK_LIMIT.
-- Keep this aligned with src/lib/services/inventoryService.ts.
DO $$ BEGIN
  -- no-op block to allow future constants; kept for migration consistency
END $$;


CREATE OR REPLACE FUNCTION grant_inventory_item_rpc(
  p_transaction_id TEXT,
  p_player_id UUID,
  p_item_id TEXT,
  p_quantity BIGINT,
  p_source_domain TEXT,
  p_source_reference TEXT,
  p_request_id TEXT,
  p_metadata JSONB DEFAULT '{}'::jsonb,
  p_stack_limit BIGINT DEFAULT 999
)
RETURNS TABLE(
  transaction_id TEXT,
  player_id UUID,
  item_id TEXT,
  quantity_delta BIGINT,
  quantity_before BIGINT,
  quantity_after BIGINT,
  source_domain TEXT,
  source_reference TEXT,
  request_id TEXT,
  created_at TIMESTAMPTZ,
  item_quantity BIGINT,
  item_metadata JSONB,
  item_updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_existing inventory_transactions;
  v_item player_inventory_items;
  v_quantity_before BIGINT;
  v_quantity_after BIGINT;
  v_now TIMESTAMPTZ;
  v_stack_limit BIGINT;
BEGIN
  IF auth.role() <> 'service_role' THEN
    RAISE EXCEPTION 'Forbidden' USING ERRCODE = '42501';
  END IF;

  IF p_item_id IS NULL OR length(trim(p_item_id)) = 0 THEN
    RAISE EXCEPTION 'Invalid itemId' USING ERRCODE = '22023';
  END IF;

  IF p_quantity IS NULL OR p_quantity <= 0 THEN
    RAISE EXCEPTION 'Quantity must be a positive integer' USING ERRCODE = '22023';
  END IF;

  v_stack_limit := COALESCE(p_stack_limit, 999);
  IF v_stack_limit <= 0 THEN
    v_stack_limit := 999;
  END IF;

  -- Idempotency: if transaction already exists, return it with current item.
  SELECT * INTO v_existing FROM inventory_transactions WHERE inventory_transactions.transaction_id = p_transaction_id;
  IF FOUND THEN
    SELECT * INTO v_item
      FROM player_inventory_items
      WHERE player_inventory_items.player_id = p_player_id
        AND player_inventory_items.item_id = p_item_id;

    RETURN QUERY
    SELECT
      v_existing.transaction_id,
      v_existing.player_id,
      v_existing.item_id,
      v_existing.quantity_delta,
      v_existing.quantity_before,
      v_existing.quantity_after,
      v_existing.source_domain,
      v_existing.source_reference,
      v_existing.request_id,
      v_existing.created_at,
      COALESCE(v_item.quantity, 0),
      COALESCE(v_item.metadata, '{}'::jsonb),
      COALESCE(v_item.updated_at, timezone('utc', now()));
    RETURN;
  END IF;

  -- Ensure inventory row exists, then lock it for update.
  INSERT INTO player_inventory_items (player_id, item_id)
  VALUES (p_player_id, p_item_id)
  ON CONFLICT (player_id, item_id) DO NOTHING;

  SELECT * INTO v_item
    FROM player_inventory_items
    WHERE player_inventory_items.player_id = p_player_id
      AND player_inventory_items.item_id = p_item_id
    FOR UPDATE;

  v_now := timezone('utc', now());
  v_quantity_before := v_item.quantity;
  v_quantity_after := v_quantity_before + p_quantity;

  IF v_quantity_after > v_stack_limit THEN
    RAISE EXCEPTION 'Stack limit exceeded for item (max %)', v_stack_limit USING ERRCODE = 'P0001';
  END IF;

  UPDATE player_inventory_items
    SET quantity = v_quantity_after,
        metadata = COALESCE(v_item.metadata, '{}'::jsonb) || COALESCE(p_metadata, '{}'::jsonb),
        updated_at = v_now
    WHERE player_inventory_items.player_id = p_player_id
      AND player_inventory_items.item_id = p_item_id;

  BEGIN
    INSERT INTO inventory_transactions (
      transaction_id,
      player_id,
      item_id,
      quantity_delta,
      quantity_before,
      quantity_after,
      source_domain,
      source_reference,
      request_id,
      created_at
    ) VALUES (
      p_transaction_id,
      p_player_id,
      p_item_id,
      p_quantity,
      v_quantity_before,
      v_quantity_after,
      p_source_domain,
      p_source_reference,
      p_request_id,
      v_now
    );
  EXCEPTION WHEN unique_violation THEN
    -- Another concurrent call created the transaction; treat as idempotent.
  END;

  SELECT * INTO v_existing FROM inventory_transactions WHERE inventory_transactions.transaction_id = p_transaction_id;
  SELECT * INTO v_item
    FROM player_inventory_items
    WHERE player_inventory_items.player_id = p_player_id
      AND player_inventory_items.item_id = p_item_id;

  RETURN QUERY
  SELECT
    v_existing.transaction_id,
    v_existing.player_id,
    v_existing.item_id,
    v_existing.quantity_delta,
    v_existing.quantity_before,
    v_existing.quantity_after,
    v_existing.source_domain,
    v_existing.source_reference,
    v_existing.request_id,
    v_existing.created_at,
    v_item.quantity,
    v_item.metadata,
    v_item.updated_at;
END;
$$;


CREATE OR REPLACE FUNCTION remove_inventory_item_rpc(
  p_transaction_id TEXT,
  p_player_id UUID,
  p_item_id TEXT,
  p_quantity BIGINT,
  p_source_domain TEXT,
  p_source_reference TEXT,
  p_request_id TEXT
)
RETURNS TABLE(
  transaction_id TEXT,
  player_id UUID,
  item_id TEXT,
  quantity_delta BIGINT,
  quantity_before BIGINT,
  quantity_after BIGINT,
  source_domain TEXT,
  source_reference TEXT,
  request_id TEXT,
  created_at TIMESTAMPTZ,
  item_quantity BIGINT,
  item_metadata JSONB,
  item_updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_existing inventory_transactions;
  v_item player_inventory_items;
  v_quantity_before BIGINT;
  v_quantity_after BIGINT;
  v_now TIMESTAMPTZ;
BEGIN
  IF auth.role() <> 'service_role' THEN
    RAISE EXCEPTION 'Forbidden' USING ERRCODE = '42501';
  END IF;

  IF p_item_id IS NULL OR length(trim(p_item_id)) = 0 THEN
    RAISE EXCEPTION 'Invalid itemId' USING ERRCODE = '22023';
  END IF;

  IF p_quantity IS NULL OR p_quantity <= 0 THEN
    RAISE EXCEPTION 'Quantity must be a positive integer' USING ERRCODE = '22023';
  END IF;

  -- Idempotency: if transaction already exists, return it with current item.
  SELECT * INTO v_existing FROM inventory_transactions WHERE inventory_transactions.transaction_id = p_transaction_id;
  IF FOUND THEN
    SELECT * INTO v_item
      FROM player_inventory_items
      WHERE player_inventory_items.player_id = p_player_id
        AND player_inventory_items.item_id = p_item_id;

    RETURN QUERY
    SELECT
      v_existing.transaction_id,
      v_existing.player_id,
      v_existing.item_id,
      v_existing.quantity_delta,
      v_existing.quantity_before,
      v_existing.quantity_after,
      v_existing.source_domain,
      v_existing.source_reference,
      v_existing.request_id,
      v_existing.created_at,
      COALESCE(v_item.quantity, 0),
      COALESCE(v_item.metadata, '{}'::jsonb),
      COALESCE(v_item.updated_at, timezone('utc', now()));
    RETURN;
  END IF;

  -- Lock the item row. Removal requires it to exist.
  SELECT * INTO v_item
    FROM player_inventory_items
    WHERE player_inventory_items.player_id = p_player_id
      AND player_inventory_items.item_id = p_item_id
    FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Inventory item not found' USING ERRCODE = 'P0001';
  END IF;

  v_now := timezone('utc', now());
  v_quantity_before := v_item.quantity;
  v_quantity_after := v_quantity_before - p_quantity;

  IF v_quantity_after < 0 THEN
    RAISE EXCEPTION 'Insufficient item quantity' USING ERRCODE = 'P0001';
  END IF;

  UPDATE player_inventory_items
    SET quantity = v_quantity_after,
        updated_at = v_now
    WHERE player_inventory_items.player_id = p_player_id
      AND player_inventory_items.item_id = p_item_id;

  BEGIN
    INSERT INTO inventory_transactions (
      transaction_id,
      player_id,
      item_id,
      quantity_delta,
      quantity_before,
      quantity_after,
      source_domain,
      source_reference,
      request_id,
      created_at
    ) VALUES (
      p_transaction_id,
      p_player_id,
      p_item_id,
      -p_quantity,
      v_quantity_before,
      v_quantity_after,
      p_source_domain,
      p_source_reference,
      p_request_id,
      v_now
    );
  EXCEPTION WHEN unique_violation THEN
    -- Another concurrent call created the transaction; treat as idempotent.
  END;

  SELECT * INTO v_existing FROM inventory_transactions WHERE inventory_transactions.transaction_id = p_transaction_id;
  SELECT * INTO v_item
    FROM player_inventory_items
    WHERE player_inventory_items.player_id = p_player_id
      AND player_inventory_items.item_id = p_item_id;

  RETURN QUERY
  SELECT
    v_existing.transaction_id,
    v_existing.player_id,
    v_existing.item_id,
    v_existing.quantity_delta,
    v_existing.quantity_before,
    v_existing.quantity_after,
    v_existing.source_domain,
    v_existing.source_reference,
    v_existing.request_id,
    v_existing.created_at,
    v_item.quantity,
    v_item.metadata,
    v_item.updated_at;
END;
$$;
