-- ZUNO Phase 2 Core Schema Migration
-- Purpose: Create core player-related tables for backend foundation.

-- =============================
-- players
-- =============================
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    email TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================
-- player_profiles
-- =============================
CREATE TABLE IF NOT EXISTS player_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    display_name TEXT,
    avatar_url TEXT,
    level INT DEFAULT 1,
    experience BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_player_profiles_player_id ON player_profiles(player_id);

-- =============================
-- player_currency
-- =============================
CREATE TABLE IF NOT EXISTS player_currency (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    coins BIGINT DEFAULT 0,
    gems BIGINT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_player_currency_player_id ON player_currency(player_id);

-- =============================
-- player_inventory
-- =============================
CREATE TABLE IF NOT EXISTS player_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    item_id UUID NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_player_inventory_player_id ON player_inventory(player_id);

-- =============================
-- shop_items
-- =============================
CREATE TABLE IF NOT EXISTS shop_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price_coins BIGINT DEFAULT 0,
    price_gems BIGINT DEFAULT 0,
    category TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_consumable BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================
-- purchases
-- =============================
CREATE TABLE IF NOT EXISTS purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES shop_items(id) ON DELETE SET NULL,
    quantity INT DEFAULT 1,
    total_cost_coins BIGINT DEFAULT 0,
    total_cost_gems BIGINT DEFAULT 0,
    currency_type TEXT NOT NULL DEFAULT 'coins' CHECK (currency_type IN ('coins', 'gems')),
    price BIGINT NOT NULL DEFAULT 0 CHECK (price >= 0),
    idempotency_key TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_purchases_player_id ON purchases(player_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_purchases_player_id_idempotency_key ON purchases(player_id, idempotency_key);

-- =============================
-- currency_ledger
-- =============================
CREATE TABLE IF NOT EXISTS currency_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    change_coins BIGINT DEFAULT 0,
    change_gems BIGINT DEFAULT 0,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_currency_ledger_player_id ON currency_ledger(player_id);

-- =============================
-- inventory_events
-- =============================
CREATE TABLE IF NOT EXISTS inventory_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    item_id UUID,
    event_type TEXT NOT NULL,
    quantity_change INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_inventory_events_player_id ON inventory_events(player_id);

-- =============================
-- player_cloud_saves
-- =============================
CREATE TABLE IF NOT EXISTS player_cloud_saves (
    player_id UUID PRIMARY KEY REFERENCES players(id) ON DELETE CASCADE,
    save_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- End of migration