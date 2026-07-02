-- Phase 8: Reward Engine Domain v1

CREATE TABLE IF NOT EXISTS reward_requests (
  request_id TEXT PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  source_domain TEXT NOT NULL,
  source_reference TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processed', 'failed', 'ignored')),
  rewards JSONB NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  error_message TEXT DEFAULT NULL,
  processed_at TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE reward_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_reward_requests" ON reward_requests
  FOR SELECT
  USING (auth.uid() = player_id);

CREATE POLICY "server_write_reward_requests" ON reward_requests
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE TABLE IF NOT EXISTS reward_events (
  id BIGSERIAL PRIMARY KEY,
  request_id TEXT NOT NULL REFERENCES reward_requests(request_id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  source_domain TEXT NOT NULL,
  reward_type TEXT NOT NULL,
  amount NUMERIC DEFAULT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processed', 'failed', 'ignored')),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  error_message TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE reward_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_reward_events" ON reward_events
  FOR SELECT
  USING (auth.uid() = player_id);

CREATE POLICY "server_write_reward_events" ON reward_events
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
