-- Phase 5: Achievements Domain (tightened)

-- Achievement definitions: global immutable metadata
CREATE TABLE IF NOT EXISTS achievement_definitions (
  key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  target_value INTEGER NOT NULL CHECK (target_value >= 1),
  reward_type TEXT DEFAULT NULL,
  reward_amount INTEGER NOT NULL DEFAULT 0 CHECK (reward_amount >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE achievement_definitions ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read global definitions
CREATE POLICY "select_achievement_definitions" ON achievement_definitions
  FOR SELECT
  USING (auth.role() IN ('authenticated', 'service_role'));

-- Player achievements: per-player progress and completion
CREATE TABLE IF NOT EXISTS player_achievements (
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  achievement_key TEXT NOT NULL REFERENCES achievement_definitions(key),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0),
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ DEFAULT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  PRIMARY KEY (player_id, achievement_key)
);

ALTER TABLE player_achievements ENABLE ROW LEVEL SECURITY;

-- RLS: players can read their own achievements
CREATE POLICY "select_own_achievements" ON player_achievements
  FOR SELECT
  USING (auth.uid() = player_id);

-- Server service-role only insert/update for trusted progress updates
CREATE POLICY "server_write_achievements" ON player_achievements
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
