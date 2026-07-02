-- Phase 7: Daily Rewards Domain

CREATE TABLE IF NOT EXISTS daily_reward_definitions (
  day INTEGER PRIMARY KEY CHECK (day >= 1),
  reward_type TEXT,
  reward_amount INTEGER NOT NULL DEFAULT 0 CHECK (reward_amount >= 0),
  reward_bundle JSONB DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE daily_reward_definitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_daily_reward_definitions" ON daily_reward_definitions
  FOR SELECT
  USING (auth.role() IN ('authenticated', 'service_role'));

CREATE TABLE IF NOT EXISTS player_daily_rewards (
  player_id UUID PRIMARY KEY REFERENCES players(id) ON DELETE CASCADE,
  current_streak INTEGER NOT NULL DEFAULT 0 CHECK (current_streak >= 0),
  total_claims INTEGER NOT NULL DEFAULT 0 CHECK (total_claims >= 0),
  last_claim_day INTEGER DEFAULT NULL CHECK (last_claim_day IS NULL OR last_claim_day >= 1),
  last_claimed_at TIMESTAMPTZ DEFAULT NULL,
  next_eligible_claim_at TIMESTAMPTZ DEFAULT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE player_daily_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_daily_rewards" ON player_daily_rewards
  FOR SELECT
  USING (auth.uid() = player_id);

CREATE POLICY "server_write_daily_rewards" ON player_daily_rewards
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
