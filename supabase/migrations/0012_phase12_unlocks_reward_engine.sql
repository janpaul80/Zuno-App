-- Phase 12: Unlocks Reward Engine integration hardening
-- Make service-role write authority explicit for player unlock grants.

CREATE POLICY "server_write_unlocks" ON player_unlocks
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
