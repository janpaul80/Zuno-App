-- ZUNO Phase 2 RLS Policies
-- Purpose: Enable row-level security rules for all core tables.

-- =============================
-- Enable RLS
-- =============================
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_currency ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE currency_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE cloud_saves ENABLE ROW LEVEL SECURITY;

-- =============================
-- Player-Owned Tables
-- =============================
-- Players and all tables referencing player_id restricted to self-access.

CREATE POLICY select_own_player ON players
    FOR SELECT
    USING (id = auth.uid());

CREATE POLICY select_own_profile ON player_profiles
    FOR SELECT
    USING (player_id = auth.uid());

CREATE POLICY select_own_currency ON player_currency
    FOR SELECT
    USING (player_id = auth.uid());

CREATE POLICY select_own_inventory ON player_inventory
    FOR SELECT
    USING (player_id = auth.uid());

CREATE POLICY select_own_purchases ON purchases
    FOR SELECT
    USING (player_id = auth.uid());

CREATE POLICY select_own_ledger ON currency_ledger
    FOR SELECT
    USING (player_id = auth.uid());

CREATE POLICY select_own_inventory_events ON inventory_events
    FOR SELECT
    USING (player_id = auth.uid());

CREATE POLICY select_own_cloud_saves ON cloud_saves
    FOR SELECT
    USING (player_id = auth.uid());

-- =============================
-- Public / Shared Tables
-- =============================
-- Shop items are publicly viewable by all authenticated users.
CREATE POLICY select_auth_users_shop_items ON shop_items
    FOR SELECT
    TO authenticated
    USING (true);

-- =============================
-- Restrict Client Writes
-- =============================
-- Prevent direct client-side inserts and updates on sensitive tables.
REVOKE INSERT, UPDATE, DELETE ON player_currency FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON purchases FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON inventory_events FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON currency_ledger FROM authenticated;

-- Service role retains write capabilities through its elevated key (outside RLS scope).

-- End of migration