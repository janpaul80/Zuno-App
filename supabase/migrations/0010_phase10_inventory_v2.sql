-- Phase 10: Inventory Enhancements v2

CREATE TABLE IF NOT EXISTS player_inventory_items (
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  quantity BIGINT NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  PRIMARY KEY (player_id, item_id)
);

ALTER TABLE player_inventory_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_inventory_items" ON player_inventory_items
  FOR SELECT
  USING (auth.uid() = player_id);

CREATE POLICY "server_write_inventory_items" ON player_inventory_items
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE TABLE IF NOT EXISTS inventory_transactions (
  transaction_id TEXT PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  quantity_delta BIGINT NOT NULL,
  quantity_before BIGINT NOT NULL CHECK (quantity_before >= 0),
  quantity_after BIGINT NOT NULL CHECK (quantity_after >= 0),
  source_domain TEXT NOT NULL,
  source_reference TEXT NOT NULL,
  request_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_inventory_transactions" ON inventory_transactions
  FOR SELECT
  USING (auth.uid() = player_id);

CREATE POLICY "server_write_inventory_transactions" ON inventory_transactions
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
