-- ZUNO Phase 2 Starter Seed Data
-- Purpose: Minimal initial data for shop and starter content.

INSERT INTO shop_items (id, name, description, price_coins, price_gems, category)
VALUES
    (gen_random_uuid(), 'Explorer Suit', 'Default uniform for new players', 0, 0, 'uniform'),
    (gen_random_uuid(), 'Energy Blade', 'Basic melee weapon with balanced attack speed', 500, 0, 'weapon'),
    (gen_random_uuid(), 'Coin Magnet', 'Gadget that pulls nearby coins automatically', 800, 5, 'gadget');

-- Optional: ensure base shop items are visible before any server logic.

-- End of seed