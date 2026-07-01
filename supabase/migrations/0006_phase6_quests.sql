-- Phase 6: Quests Domain

-- Quest definitions: immutable global quest data
CREATE TABLE IF NOT EXISTS quest_definitions (
  key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  target_value INTEGER NOT NULL CHECK (target_value >= 1),
  reward_type TEXT DEFAULT NULL,
  reward_amount INTEGER NOT NULL DEFAULT 0 CHECK (reward_amount >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE quest_definitions ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read quest definitions
CREATE POLICY "select_quest_definitions" ON quest_definitions
  FOR SELECT
  USING (auth.role() IN ('authenticated', 'service_role'));

-- Player quests: per-player progress, completion, and claiming state
CREATE TABLE IF NOT EXISTS player_quests (
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  quest_key TEXT NOT NULL REFERENCES quest_definitions(key),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0),
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  claimed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ DEFAULT NULL,
  claimed_at TIMESTAMPTZ DEFAULT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  PRIMARY KEY (player_id, quest_key)
);

ALTER TABLE player_quests ENABLE ROW LEVEL SECURITY;

-- RLS: players can read their own quests
CREATE POLICY "select_own_quests" ON player_quests
  FOR SELECT
  USING (auth.uid() = player_id);

-- Server-only writes for updating progress, completion, and claims
CREATE POLICY "server_write_quests" ON player_quests
  FOR ALL
  USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
