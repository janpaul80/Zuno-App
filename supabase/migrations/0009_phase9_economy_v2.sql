-- Phase 9: Economy Domain v2

CREATE TABLE IF NOT EXISTS player_wallets (
  player_id UUID PRIMARY KEY REFERENCES players(id) ON DELETE CASCADE,
  coins BIGINT NOT NULL DEFAULT 0 CHECK (coins >= 0),
  gems BIGINT NOT NULL DEFAULT 0 CHECK (gems >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE player_wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_wallets" ON player_wallets
  FOR SELECT
  USING (auth.uid() = player_id);

CREATE POLICY "server_write_wallets" ON player_wallets
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE TABLE IF NOT EXISTS economy_transactions (
  transaction_id TEXT PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  currency TEXT NOT NULL CHECK (currency IN ('coins', 'gems')),
  amount BIGINT NOT NULL,
  balance_before BIGINT NOT NULL CHECK (balance_before >= 0),
  balance_after BIGINT NOT NULL CHECK (balance_after >= 0),
  source_domain TEXT NOT NULL,
  source_reference TEXT NOT NULL,
  request_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE economy_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_economy_transactions" ON economy_transactions
  FOR SELECT
  USING (auth.uid() = player_id);

CREATE POLICY "server_write_economy_transactions" ON economy_transactions
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
