-- Phase 16: Reward Engine - Transactional Orchestration RPC
--
-- Purpose:
-- Provide a single atomic reward-processing path that:
-- - validates RewardRequest inputs
-- - enforces idempotency via reward_requests.request_id
-- - applies supported reward side effects by calling authority RPCs
--   (Economy v2 + Inventory v2 + Progression + Unlocks)
-- - records immutable reward_events
-- - finalizes reward_requests status
-- - guarantees all-or-nothing execution
--
-- Invocation:
-- Server-side only using Supabase service role.

-- Durable failure summaries.
ALTER TABLE reward_requests
  ADD COLUMN IF NOT EXISTS error_code TEXT;


-- Atomic XP grant helper used by reward orchestration.
-- This is intentionally service-role only and uses row locking.
CREATE OR REPLACE FUNCTION grant_xp_rpc(
  p_transaction_id TEXT,
  p_player_id UUID,
  p_amount BIGINT,
  p_source_domain TEXT,
  p_source_reference TEXT,
  p_request_id TEXT
)
RETURNS TABLE(
  transaction_id TEXT,
  player_id UUID,
  amount BIGINT,
  level_before INTEGER,
  level_after INTEGER,
  xp_before BIGINT,
  xp_after BIGINT,
  xp_to_next BIGINT,
  levels_gained INTEGER,
  source_domain TEXT,
  source_reference TEXT,
  request_id TEXT,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_prog player_progression;
  v_amount BIGINT;
  v_level_before INTEGER;
  v_level_after INTEGER;
  v_xp_before BIGINT;
  v_xp_after BIGINT;
  v_xp_to_next BIGINT;
  v_levels_gained INTEGER;
  v_now TIMESTAMPTZ;
  v_existing reward_events;
BEGIN
  IF auth.role() <> 'service_role' THEN
    RAISE EXCEPTION 'Forbidden' USING ERRCODE = '42501';
  END IF;

  IF p_transaction_id IS NULL OR length(trim(p_transaction_id)) = 0 THEN
    RAISE EXCEPTION 'transaction_id is required' USING ERRCODE = '22023';
  END IF;

  v_amount := COALESCE(p_amount, 0);
  IF v_amount <= 0 THEN
    RAISE EXCEPTION 'Amount must be a positive integer' USING ERRCODE = '22023';
  END IF;

  -- Idempotency: if the reward event exists, return current progression.
  SELECT * INTO v_existing
    FROM reward_events
    WHERE reward_events.request_id = p_request_id
      AND reward_events.reward_type = 'xp'
      AND reward_events.metadata ->> 'transactionId' = p_transaction_id;

  IF FOUND THEN
    INSERT INTO player_progression (player_id) VALUES (p_player_id)
    ON CONFLICT (player_id) DO NOTHING;

    SELECT * INTO v_prog FROM player_progression WHERE player_progression.player_id = p_player_id;

    RETURN QUERY
    SELECT
      p_transaction_id,
      p_player_id,
      v_amount,
      v_prog.level,
      v_prog.level,
      v_prog.xp,
      v_prog.xp,
      v_prog.xp_to_next,
      0,
      p_source_domain,
      p_source_reference,
      p_request_id,
      v_prog.updated_at;
    RETURN;
  END IF;

  v_now := timezone('utc', now());

  -- Ensure row exists and lock it.
  INSERT INTO player_progression (player_id) VALUES (p_player_id)
  ON CONFLICT (player_id) DO NOTHING;

  SELECT * INTO v_prog
    FROM player_progression
    WHERE player_progression.player_id = p_player_id
    FOR UPDATE;

  v_level_before := COALESCE(v_prog.level, 1);
  v_xp_before := COALESCE(v_prog.xp, 0);
  v_xp_to_next := COALESCE(v_prog.xp_to_next, 100);

  v_level_after := v_level_before;
  v_xp_after := v_xp_before + v_amount;
  v_levels_gained := 0;

  -- Level-up loop. Keep logic stable and deterministic.
  WHILE v_xp_after >= v_xp_to_next LOOP
    v_xp_after := v_xp_after - v_xp_to_next;
    v_level_after := v_level_after + 1;
    v_levels_gained := v_levels_gained + 1;
    -- XP growth mirrors application logic (floor(100 * 1.2^(level-1))).
    v_xp_to_next := floor(100 * power(1.2, v_level_after - 1));
    IF v_xp_to_next < 1 THEN
      v_xp_to_next := 1;
    END IF;
  END LOOP;

  UPDATE player_progression
    SET level = v_level_after,
        xp = v_xp_after,
        xp_to_next = v_xp_to_next,
        updated_at = v_now
    WHERE player_progression.player_id = p_player_id;

  RETURN QUERY
  SELECT
    p_transaction_id,
    p_player_id,
    v_amount,
    v_level_before,
    v_level_after,
    v_xp_before,
    v_xp_after,
    v_xp_to_next,
    v_levels_gained,
    p_source_domain,
    p_source_reference,
    p_request_id,
    v_now;
END;
$$;


-- Atomic unlock grant helper used by reward orchestration.
CREATE OR REPLACE FUNCTION grant_unlock_rpc(
  p_transaction_id TEXT,
  p_player_id UUID,
  p_unlock_key TEXT,
  p_unlock_type TEXT,
  p_source_domain TEXT,
  p_source_reference TEXT,
  p_request_id TEXT
)
RETURNS TABLE(
  transaction_id TEXT,
  player_id UUID,
  unlock_key TEXT,
  unlock_type TEXT,
  already_unlocked BOOLEAN,
  granted_at TIMESTAMPTZ,
  source_domain TEXT,
  source_reference TEXT,
  request_id TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_existing reward_events;
  v_unlock player_unlocks;
  v_now TIMESTAMPTZ;
  v_already BOOLEAN;
BEGIN
  IF auth.role() <> 'service_role' THEN
    RAISE EXCEPTION 'Forbidden' USING ERRCODE = '42501';
  END IF;

  IF p_transaction_id IS NULL OR length(trim(p_transaction_id)) = 0 THEN
    RAISE EXCEPTION 'transaction_id is required' USING ERRCODE = '22023';
  END IF;

  IF p_unlock_key IS NULL OR length(trim(p_unlock_key)) = 0 THEN
    RAISE EXCEPTION 'unlock_key is required' USING ERRCODE = '22023';
  END IF;

  IF p_unlock_type IS NULL OR length(trim(p_unlock_type)) = 0 THEN
    RAISE EXCEPTION 'unlock_type is required' USING ERRCODE = '22023';
  END IF;

  -- Idempotency: if the reward event exists, ensure unlock exists and return it.
  SELECT * INTO v_existing
    FROM reward_events
    WHERE reward_events.request_id = p_request_id
      AND reward_events.reward_type = 'unlock'
      AND reward_events.metadata ->> 'transactionId' = p_transaction_id
      AND reward_events.metadata ->> 'unlockKey' = p_unlock_key;

  IF FOUND THEN
    SELECT * INTO v_unlock FROM player_unlocks
      WHERE player_unlocks.player_id = p_player_id
        AND player_unlocks.unlock_key = p_unlock_key;

    IF NOT FOUND THEN
      v_now := timezone('utc', now());
      INSERT INTO player_unlocks (player_id, unlock_key, unlock_type, granted_at)
      VALUES (p_player_id, p_unlock_key, p_unlock_type, v_now)
      ON CONFLICT (player_id, unlock_key) DO NOTHING;

      SELECT * INTO v_unlock FROM player_unlocks
        WHERE player_unlocks.player_id = p_player_id
          AND player_unlocks.unlock_key = p_unlock_key;
    END IF;

    RETURN QUERY
    SELECT
      p_transaction_id,
      p_player_id,
      p_unlock_key,
      p_unlock_type,
      true,
      COALESCE(v_unlock.granted_at, timezone('utc', now())),
      p_source_domain,
      p_source_reference,
      p_request_id;
    RETURN;
  END IF;

  v_now := timezone('utc', now());

  -- Upsert is idempotent; detect if it already existed.
  SELECT * INTO v_unlock FROM player_unlocks
    WHERE player_unlocks.player_id = p_player_id
      AND player_unlocks.unlock_key = p_unlock_key;
  v_already := FOUND;

  INSERT INTO player_unlocks (player_id, unlock_key, unlock_type, granted_at)
  VALUES (p_player_id, p_unlock_key, p_unlock_type, v_now)
  ON CONFLICT (player_id, unlock_key) DO NOTHING;

  SELECT * INTO v_unlock FROM player_unlocks
    WHERE player_unlocks.player_id = p_player_id
      AND player_unlocks.unlock_key = p_unlock_key;

  RETURN QUERY
  SELECT
    p_transaction_id,
    p_player_id,
    p_unlock_key,
    p_unlock_type,
    v_already,
    COALESCE(v_unlock.granted_at, v_now),
    p_source_domain,
    p_source_reference,
    p_request_id;
END;
$$;


-- Reward Engine orchestration:
-- - creates/locks reward_requests row
-- - applies authority RPCs
-- - writes reward_events
-- - updates final status
CREATE OR REPLACE FUNCTION process_reward_request_rpc(
  p_request_id TEXT,
  p_player_id UUID,
  p_source_domain TEXT,
  p_source_reference TEXT,
  p_rewards JSONB,
  p_metadata JSONB DEFAULT '{}'::jsonb,
  p_created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
)
RETURNS TABLE(
  request_id TEXT,
  status TEXT,
  error_code TEXT,
  error_message TEXT,
  processed_at TIMESTAMPTZ,
  wallet_coins BIGINT,
  wallet_gems BIGINT,
  wallet_updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_existing reward_requests;
  v_now TIMESTAMPTZ;
  v_processed_at TIMESTAMPTZ;
  v_error_code TEXT;
  v_error_message TEXT;
  v_wallet player_wallets;
  v_wallet_coins BIGINT;
  v_wallet_gems BIGINT;
  v_wallet_updated_at TIMESTAMPTZ;
  v_reward JSONB;
  v_type TEXT;
  v_amount BIGINT;
  v_item_id TEXT;
  v_unlock_key TEXT;
  v_unlock_type TEXT;
  v_bundle_id TEXT;
  v_tx_id TEXT;
BEGIN
  IF auth.role() <> 'service_role' THEN
    RAISE EXCEPTION 'Forbidden' USING ERRCODE = '42501';
  END IF;

  IF p_request_id IS NULL OR length(trim(p_request_id)) = 0 THEN
    RAISE EXCEPTION 'requestId is required' USING ERRCODE = '22023';
  END IF;

  IF p_player_id IS NULL THEN
    RAISE EXCEPTION 'playerId is required' USING ERRCODE = '22023';
  END IF;

  IF p_source_domain IS NULL OR length(trim(p_source_domain)) = 0 THEN
    RAISE EXCEPTION 'sourceDomain is required' USING ERRCODE = '22023';
  END IF;

  IF p_source_reference IS NULL OR length(trim(p_source_reference)) = 0 THEN
    RAISE EXCEPTION 'sourceReference is required' USING ERRCODE = '22023';
  END IF;

  IF p_rewards IS NULL OR jsonb_typeof(p_rewards) <> 'array' THEN
    RAISE EXCEPTION 'rewards must be an array' USING ERRCODE = '22023';
  END IF;

  IF jsonb_array_length(p_rewards) = 0 THEN
    RAISE EXCEPTION 'At least one reward entry is required' USING ERRCODE = '22023';
  END IF;

  -- Idempotency: if request already exists, return it with current wallet snapshot.
  SELECT * INTO v_existing
    FROM reward_requests
    WHERE reward_requests.request_id = p_request_id;

  IF FOUND THEN
    INSERT INTO player_wallets (player_id) VALUES (p_player_id)
    ON CONFLICT (player_id) DO NOTHING;

    SELECT * INTO v_wallet FROM player_wallets WHERE player_wallets.player_id = p_player_id;
    v_wallet_coins := COALESCE(v_wallet.coins, 0);
    v_wallet_gems := COALESCE(v_wallet.gems, 0);
    v_wallet_updated_at := COALESCE(v_wallet.updated_at, timezone('utc', now()));

    RETURN QUERY
    SELECT
      v_existing.request_id,
      v_existing.status,
      v_existing.error_code,
      v_existing.error_message,
      v_existing.processed_at,
      v_wallet_coins,
      v_wallet_gems,
      v_wallet_updated_at;
    RETURN;
  END IF;

  v_now := timezone('utc', now());

  -- Create + lock the request row to prevent concurrent processing.
  INSERT INTO reward_requests (
    request_id,
    player_id,
    source_domain,
    source_reference,
    status,
    rewards,
    metadata,
    error_code,
    error_message,
    processed_at,
    created_at
  ) VALUES (
    p_request_id,
    p_player_id,
    p_source_domain,
    p_source_reference,
    'pending',
    p_rewards,
    COALESCE(p_metadata, '{}'::jsonb),
    NULL,
    NULL,
    NULL,
    COALESCE(p_created_at, v_now)
  );

  SELECT * INTO v_existing
    FROM reward_requests
    WHERE reward_requests.request_id = p_request_id
    FOR UPDATE;

  BEGIN
    -- Apply reward entries.
    FOR v_reward IN SELECT * FROM jsonb_array_elements(p_rewards) LOOP
      v_type := v_reward ->> 'type';

      IF v_type IS NULL OR length(trim(v_type)) = 0 THEN
        RAISE EXCEPTION 'Reward entry type is required' USING ERRCODE = '22023';
      END IF;

      -- economy rewards
      IF v_type IN ('coins', 'gems') THEN
        v_amount := COALESCE((v_reward ->> 'amount')::BIGINT, 0);
        IF v_amount <= 0 THEN
          RAISE EXCEPTION 'Reward amount must be positive for %', v_type USING ERRCODE = '22023';
        END IF;

        v_tx_id := p_request_id || ':' || v_type;
        PERFORM 1 FROM credit_wallet_rpc(
          v_tx_id,
          p_player_id,
          v_type,
          v_amount,
          p_source_domain,
          p_source_reference,
          p_request_id
        );

        INSERT INTO reward_events (
          request_id,
          player_id,
          source_domain,
          reward_type,
          amount,
          status,
          metadata,
          error_message
        ) VALUES (
          p_request_id,
          p_player_id,
          p_source_domain,
          v_type,
          v_amount,
          'processed',
          COALESCE(p_metadata, '{}'::jsonb) || jsonb_build_object(
            'transactionId', v_tx_id
          ),
          NULL
        );

      ELSIF v_type = 'xp' THEN
        v_amount := COALESCE((v_reward ->> 'amount')::BIGINT, 0);
        IF v_amount <= 0 THEN
          RAISE EXCEPTION 'Reward amount must be positive for xp' USING ERRCODE = '22023';
        END IF;

        v_tx_id := p_request_id || ':xp';
        PERFORM 1 FROM grant_xp_rpc(
          v_tx_id,
          p_player_id,
          v_amount,
          p_source_domain,
          p_source_reference,
          p_request_id
        );

        INSERT INTO reward_events (
          request_id,
          player_id,
          source_domain,
          reward_type,
          amount,
          status,
          metadata,
          error_message
        ) VALUES (
          p_request_id,
          p_player_id,
          p_source_domain,
          'xp',
          v_amount,
          'processed',
          COALESCE(p_metadata, '{}'::jsonb) || jsonb_build_object(
            'transactionId', v_tx_id
          ),
          NULL
        );

      ELSIF v_type = 'inventory_item' THEN
        v_item_id := v_reward ->> 'itemId';
        IF v_item_id IS NULL OR length(trim(v_item_id)) = 0 THEN
          RAISE EXCEPTION 'inventory_item rewards require itemId' USING ERRCODE = '22023';
        END IF;

        v_amount := COALESCE((v_reward ->> 'amount')::BIGINT, 0);
        IF v_amount <= 0 THEN
          RAISE EXCEPTION 'inventory_item rewards require a positive quantity' USING ERRCODE = '22023';
        END IF;

        v_tx_id := p_request_id || ':' || v_item_id;
        PERFORM 1 FROM grant_inventory_item_rpc(
          v_tx_id,
          p_player_id,
          v_item_id,
          v_amount,
          p_source_domain,
          p_source_reference,
          p_request_id,
          COALESCE(p_metadata, '{}'::jsonb) || jsonb_build_object(
            'transactionId', v_tx_id
          ),
          999
        );

        INSERT INTO reward_events (
          request_id,
          player_id,
          source_domain,
          reward_type,
          amount,
          status,
          metadata,
          error_message
        ) VALUES (
          p_request_id,
          p_player_id,
          p_source_domain,
          'inventory_item',
          v_amount,
          'processed',
          COALESCE(p_metadata, '{}'::jsonb) || jsonb_build_object(
            'transactionId', v_tx_id,
            'itemId', v_item_id
          ),
          NULL
        );

      ELSIF v_type = 'unlock' THEN
        v_unlock_key := v_reward ->> 'unlockKey';
        IF v_unlock_key IS NULL OR length(trim(v_unlock_key)) = 0 THEN
          RAISE EXCEPTION 'unlock rewards require unlockKey' USING ERRCODE = '22023';
        END IF;

        v_unlock_type := COALESCE(v_reward ->> 'unlockType', 'reward');
        v_tx_id := p_request_id || ':unlock:' || v_unlock_key;

        PERFORM 1 FROM grant_unlock_rpc(
          v_tx_id,
          p_player_id,
          v_unlock_key,
          v_unlock_type,
          p_source_domain,
          p_source_reference,
          p_request_id
        );

        INSERT INTO reward_events (
          request_id,
          player_id,
          source_domain,
          reward_type,
          amount,
          status,
          metadata,
          error_message
        ) VALUES (
          p_request_id,
          p_player_id,
          p_source_domain,
          'unlock',
          NULL,
          'processed',
          COALESCE(p_metadata, '{}'::jsonb) || jsonb_build_object(
            'transactionId', v_tx_id,
            'unlockKey', v_unlock_key,
            'unlockType', v_unlock_type
          ),
          NULL
        );

      ELSIF v_type = 'bundle' THEN
        -- Reward bundle expansion is still deferred. Record an ignored audit row.
        v_bundle_id := v_reward ->> 'bundleId';
        IF v_bundle_id IS NULL OR length(trim(v_bundle_id)) = 0 THEN
          RAISE EXCEPTION 'bundle rewards require bundleId' USING ERRCODE = '22023';
        END IF;

        INSERT INTO reward_events (
          request_id,
          player_id,
          source_domain,
          reward_type,
          amount,
          status,
          metadata,
          error_message
        ) VALUES (
          p_request_id,
          p_player_id,
          p_source_domain,
          'bundle',
          NULL,
          'ignored',
          COALESCE(p_metadata, '{}'::jsonb) || jsonb_build_object(
            'bundleId', v_bundle_id
          ),
          'Bundle expansion is not yet supported'
        );

      ELSE
        RAISE EXCEPTION 'Unsupported reward type: %', v_type USING ERRCODE = '22023';
      END IF;
    END LOOP;

    v_processed_at := timezone('utc', now());
    UPDATE reward_requests
      SET status = 'processed',
          processed_at = v_processed_at,
          error_code = NULL,
          error_message = NULL
      WHERE reward_requests.request_id = p_request_id;
  EXCEPTION
    WHEN others THEN
      v_error_message := SQLERRM;
      v_error_code := 'INTERNAL_ERROR';

      IF v_error_message ILIKE '%amount must be a positive integer%' THEN
        v_error_code := 'BAD_REQUEST';
      ELSIF v_error_message ILIKE '%unsupported reward type%' THEN
        v_error_code := 'BAD_REQUEST';
      ELSIF v_error_message ILIKE '%insufficient balance%' THEN
        v_error_code := 'CONFLICT';
      END IF;

      -- Attach failure to request.
      UPDATE reward_requests
        SET status = 'failed',
            processed_at = NULL,
            error_code = v_error_code,
            error_message = v_error_message
        WHERE reward_requests.request_id = p_request_id;

      -- Emit failed audit rows for each reward entry.
      FOR v_reward IN SELECT * FROM jsonb_array_elements(p_rewards) LOOP
        v_type := v_reward ->> 'type';
        INSERT INTO reward_events (
          request_id,
          player_id,
          source_domain,
          reward_type,
          amount,
          status,
          metadata,
          error_message
        ) VALUES (
          p_request_id,
          p_player_id,
          p_source_domain,
          COALESCE(v_type, 'unknown'),
          NULL,
          'failed',
          COALESCE(p_metadata, '{}'::jsonb),
          v_error_message
        );
      END LOOP;
  END;

  -- Return snapshot-ish wallet state to support debugging/clients.
  INSERT INTO player_wallets (player_id) VALUES (p_player_id)
  ON CONFLICT (player_id) DO NOTHING;
  SELECT * INTO v_wallet FROM player_wallets WHERE player_wallets.player_id = p_player_id;
  v_wallet_coins := COALESCE(v_wallet.coins, 0);
  v_wallet_gems := COALESCE(v_wallet.gems, 0);
  v_wallet_updated_at := COALESCE(v_wallet.updated_at, timezone('utc', now()));

  SELECT * INTO v_existing FROM reward_requests WHERE reward_requests.request_id = p_request_id;

  RETURN QUERY
  SELECT
    v_existing.request_id,
    v_existing.status,
    v_existing.error_code,
    v_existing.error_message,
    v_existing.processed_at,
    v_wallet_coins,
    v_wallet_gems,
    v_wallet_updated_at;
END;
$$;
