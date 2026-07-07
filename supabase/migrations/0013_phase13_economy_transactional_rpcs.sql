-- Phase 13: Economy Domain v2 - Transactional RPCs

-- NOTE: These RPCs are intended to be invoked by server-side code using the
-- Supabase service role key. They enforce atomicity for wallet mutations.

CREATE OR REPLACE FUNCTION credit_wallet_rpc(
  p_transaction_id TEXT,
  p_player_id UUID,
  p_currency TEXT,
  p_amount BIGINT,
  p_source_domain TEXT,
  p_source_reference TEXT,
  p_request_id TEXT
)
RETURNS TABLE(
  transaction_id TEXT,
  player_id UUID,
  currency TEXT,
  amount BIGINT,
  balance_before BIGINT,
  balance_after BIGINT,
  source_domain TEXT,
  source_reference TEXT,
  request_id TEXT,
  created_at TIMESTAMPTZ,
  wallet_coins BIGINT,
  wallet_gems BIGINT,
  wallet_updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_existing economy_transactions;
  v_wallet player_wallets;
  v_balance_before BIGINT;
  v_balance_after BIGINT;
  v_now TIMESTAMPTZ;
BEGIN
  IF auth.role() <> 'service_role' THEN
    RAISE EXCEPTION 'Forbidden' USING ERRCODE = '42501';
  END IF;

  IF p_amount IS NULL OR p_amount <= 0 THEN
    RAISE EXCEPTION 'Amount must be a positive integer' USING ERRCODE = '22023';
  END IF;

  IF p_currency NOT IN ('coins', 'gems') THEN
    RAISE EXCEPTION 'Unsupported currency' USING ERRCODE = '22023';
  END IF;

  -- Idempotency: if transaction already exists, return it with current wallet.
  SELECT * INTO v_existing FROM economy_transactions WHERE economy_transactions.transaction_id = p_transaction_id;
  IF FOUND THEN
    SELECT * INTO v_wallet FROM player_wallets WHERE player_wallets.player_id = p_player_id;
    IF NOT FOUND THEN
      INSERT INTO player_wallets (player_id) VALUES (p_player_id)
      ON CONFLICT (player_id) DO NOTHING;
      SELECT * INTO v_wallet FROM player_wallets WHERE player_wallets.player_id = p_player_id;
    END IF;

    RETURN QUERY
    SELECT
      v_existing.transaction_id,
      v_existing.player_id,
      v_existing.currency,
      v_existing.amount,
      v_existing.balance_before,
      v_existing.balance_after,
      v_existing.source_domain,
      v_existing.source_reference,
      v_existing.request_id,
      v_existing.created_at,
      v_wallet.coins,
      v_wallet.gems,
      v_wallet.updated_at;
    RETURN;
  END IF;

  -- Ensure wallet row exists, then lock it for update.
  INSERT INTO player_wallets (player_id) VALUES (p_player_id)
  ON CONFLICT (player_id) DO NOTHING;

  SELECT * INTO v_wallet FROM player_wallets WHERE player_wallets.player_id = p_player_id FOR UPDATE;

  v_now := timezone('utc', now());

  IF p_currency = 'coins' THEN
    v_balance_before := v_wallet.coins;
    v_balance_after := v_wallet.coins + p_amount;
    UPDATE player_wallets
      SET coins = v_balance_after,
          updated_at = v_now
      WHERE player_wallets.player_id = p_player_id;
  ELSE
    v_balance_before := v_wallet.gems;
    v_balance_after := v_wallet.gems + p_amount;
    UPDATE player_wallets
      SET gems = v_balance_after,
          updated_at = v_now
      WHERE player_wallets.player_id = p_player_id;
  END IF;

  BEGIN
    INSERT INTO economy_transactions (
      transaction_id,
      player_id,
      currency,
      amount,
      balance_before,
      balance_after,
      source_domain,
      source_reference,
      request_id,
      created_at
    ) VALUES (
      p_transaction_id,
      p_player_id,
      p_currency,
      p_amount,
      v_balance_before,
      v_balance_after,
      p_source_domain,
      p_source_reference,
      p_request_id,
      v_now
    );
  EXCEPTION WHEN unique_violation THEN
    -- Another concurrent call created the transaction; treat as idempotent.
  END;

  SELECT * INTO v_existing FROM economy_transactions WHERE economy_transactions.transaction_id = p_transaction_id;
  SELECT * INTO v_wallet FROM player_wallets WHERE player_wallets.player_id = p_player_id;

  RETURN QUERY
  SELECT
    v_existing.transaction_id,
    v_existing.player_id,
    v_existing.currency,
    v_existing.amount,
    v_existing.balance_before,
    v_existing.balance_after,
    v_existing.source_domain,
    v_existing.source_reference,
    v_existing.request_id,
    v_existing.created_at,
    v_wallet.coins,
    v_wallet.gems,
    v_wallet.updated_at;
END;
$$;


CREATE OR REPLACE FUNCTION debit_wallet_rpc(
  p_transaction_id TEXT,
  p_player_id UUID,
  p_currency TEXT,
  p_amount BIGINT,
  p_source_domain TEXT,
  p_source_reference TEXT,
  p_request_id TEXT
)
RETURNS TABLE(
  transaction_id TEXT,
  player_id UUID,
  currency TEXT,
  amount BIGINT,
  balance_before BIGINT,
  balance_after BIGINT,
  source_domain TEXT,
  source_reference TEXT,
  request_id TEXT,
  created_at TIMESTAMPTZ,
  wallet_coins BIGINT,
  wallet_gems BIGINT,
  wallet_updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_existing economy_transactions;
  v_wallet player_wallets;
  v_balance_before BIGINT;
  v_balance_after BIGINT;
  v_now TIMESTAMPTZ;
BEGIN
  IF auth.role() <> 'service_role' THEN
    RAISE EXCEPTION 'Forbidden' USING ERRCODE = '42501';
  END IF;

  IF p_amount IS NULL OR p_amount <= 0 THEN
    RAISE EXCEPTION 'Amount must be a positive integer' USING ERRCODE = '22023';
  END IF;

  IF p_currency NOT IN ('coins', 'gems') THEN
    RAISE EXCEPTION 'Unsupported currency' USING ERRCODE = '22023';
  END IF;

  -- Idempotency: if transaction already exists, return it with current wallet.
  SELECT * INTO v_existing FROM economy_transactions WHERE economy_transactions.transaction_id = p_transaction_id;
  IF FOUND THEN
    SELECT * INTO v_wallet FROM player_wallets WHERE player_wallets.player_id = p_player_id;
    IF NOT FOUND THEN
      INSERT INTO player_wallets (player_id) VALUES (p_player_id)
      ON CONFLICT (player_id) DO NOTHING;
      SELECT * INTO v_wallet FROM player_wallets WHERE player_wallets.player_id = p_player_id;
    END IF;

    RETURN QUERY
    SELECT
      v_existing.transaction_id,
      v_existing.player_id,
      v_existing.currency,
      v_existing.amount,
      v_existing.balance_before,
      v_existing.balance_after,
      v_existing.source_domain,
      v_existing.source_reference,
      v_existing.request_id,
      v_existing.created_at,
      v_wallet.coins,
      v_wallet.gems,
      v_wallet.updated_at;
    RETURN;
  END IF;

  -- Ensure wallet row exists, then lock it for update.
  INSERT INTO player_wallets (player_id) VALUES (p_player_id)
  ON CONFLICT (player_id) DO NOTHING;

  SELECT * INTO v_wallet FROM player_wallets WHERE player_wallets.player_id = p_player_id FOR UPDATE;

  v_now := timezone('utc', now());

  IF p_currency = 'coins' THEN
    v_balance_before := v_wallet.coins;
    IF v_balance_before - p_amount < 0 THEN
      RAISE EXCEPTION 'Insufficient balance' USING ERRCODE = 'P0001';
    END IF;
    v_balance_after := v_wallet.coins - p_amount;
    UPDATE player_wallets
      SET coins = v_balance_after,
          updated_at = v_now
      WHERE player_wallets.player_id = p_player_id;
  ELSE
    v_balance_before := v_wallet.gems;
    IF v_balance_before - p_amount < 0 THEN
      RAISE EXCEPTION 'Insufficient balance' USING ERRCODE = 'P0001';
    END IF;
    v_balance_after := v_wallet.gems - p_amount;
    UPDATE player_wallets
      SET gems = v_balance_after,
          updated_at = v_now
      WHERE player_wallets.player_id = p_player_id;
  END IF;

  BEGIN
    INSERT INTO economy_transactions (
      transaction_id,
      player_id,
      currency,
      amount,
      balance_before,
      balance_after,
      source_domain,
      source_reference,
      request_id,
      created_at
    ) VALUES (
      p_transaction_id,
      p_player_id,
      p_currency,
      -p_amount,
      v_balance_before,
      v_balance_after,
      p_source_domain,
      p_source_reference,
      p_request_id,
      v_now
    );
  EXCEPTION WHEN unique_violation THEN
    -- Another concurrent call created the transaction; treat as idempotent.
  END;

  SELECT * INTO v_existing FROM economy_transactions WHERE economy_transactions.transaction_id = p_transaction_id;
  SELECT * INTO v_wallet FROM player_wallets WHERE player_wallets.player_id = p_player_id;

  RETURN QUERY
  SELECT
    v_existing.transaction_id,
    v_existing.player_id,
    v_existing.currency,
    v_existing.amount,
    v_existing.balance_before,
    v_existing.balance_after,
    v_existing.source_domain,
    v_existing.source_reference,
    v_existing.request_id,
    v_existing.created_at,
    v_wallet.coins,
    v_wallet.gems,
    v_wallet.updated_at;
END;
$$;
