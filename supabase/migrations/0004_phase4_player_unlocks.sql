-- Phase 4: Player Unlocks

CREATE TABLE IF NOT EXISTS player_unlocks (
  player_id uuid REFERENCES players(id) ON DELETE CASCADE,
  unlock_key text NOT NULL,
  unlock_type text NOT NULL DEFAULT 'cosmetic',
  granted_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  PRIMARY KEY (player_id, unlock_key)
);

ALTER TABLE player_unlocks ENABLE ROW LEVEL SECURITY;

-- Read policy: players can read their own unlocks
CREATE POLICY "select_own_unlocks" ON player_unlocks
  FOR SELECT
  USING (auth.uid() = player_id);

-- Insert/update restricted to service-role operations only