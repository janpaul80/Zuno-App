-- Phase 11: Progression v2
-- Server-authoritative XP and level state for Reward Engine XP grants.

CREATE TABLE IF NOT EXISTS player_progression (
  player_id UUID PRIMARY KEY REFERENCES players(id) ON DELETE CASCADE,
  level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1),
  xp BIGINT NOT NULL DEFAULT 0 CHECK (xp >= 0),
  xp_to_next BIGINT NOT NULL DEFAULT 100 CHECK (xp_to_next >= 1),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE player_progression ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_progression" ON player_progression
  FOR SELECT
  USING (auth.uid() = player_id);

CREATE POLICY "server_write_progression" ON player_progression
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
