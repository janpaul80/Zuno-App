# Migration Notes – Phase 2 Core Schema

## Overview
This draft migration establishes the foundation for all player‑related backend data structures used in Phase 2.

### Created Tables
| Table | Purpose |
|--------|----------|
| `players` | Core identity record for every player (local or authenticated). |
| `player_profiles` | Stores display name, avatar, level, XP, and profile meta. |
| `player_currency` | Tracks coin and gem balances for each player. |
| `player_inventory` | Stores player‑owned items and quantities. |
| `shop_items` | Defines items purchasable in the in‑game shop. |
| `purchases` | Transaction history of player purchases. |
| `currency_ledger` | Historical log of currency changes (source, gain/spend reason). |
| `inventory_events` | Event log of inventory additions/removals (for analytics/debug). |
| `player_cloud_saves` | Player save data synced in JSON format. |

### Implementation Choices
* All primary keys use **UUID** (`gen_random_uuid()` assumed for PostgreSQL + Supabase default).
* Each table includes `created_at` and, when relevant, `updated_at` timestamps with time zones.
* Foreign keys reference `players(id)` and cascade deletion where appropriate.
* Only essential indexes are included for likely query patterns (`player_id` lookups).
* No foreign‑key cycles: inventory and ledger events reference players only.

### Intentionally Excluded
* **RLS / Policies** – Deferred to a later phase for controlled rollout.
* **Seed Data** – Will be introduced once shop contents are finalized.
* **Triggers / Audit Logs** – Introduced later alongside analytics and progression.
* **Procedures / Functions** – None defined yet; next milestone will start RPC / API work.

### Validation Status
This SQL has **not** been applied to a live Supabase instance yet—it exists as a schema definition draft only.
It can be run via Supabase SQL editor or the local CLI once review and RLS design are complete.

---
_Added alongside_ `supabase/migrations/0001_phase2_core_schema.sql`
_Last updated_: phase 2.3 seed data draft (adds minimal shop starter data).

## Phase 2.3 – Starter Seed Data
This optional seed populates the `shop_items` table with minimal starter content to verify game economy integration.

| Name | Category | Coins | Gems | Description |
|------|-----------|-------|------|-------------|
| Explorer Suit | uniform | 0 | 0 | Default starting uniform for all players |
| Energy Blade | weapon | 500 | 0 | Entry‑level melee weapon |
| Coin Magnet | gadget | 800 | 5 | Gadget that attracts nearby coins |

### Purpose
* Allows frontend/shop APIs to display items without requiring manual insertion.
* Verifies pricing fields and category taxonomy (`uniform`, `weapon`, `gadget`).
* No player data, currency, or purchase records included.

### Intentionally Excluded
* Player seeds or beta accounts.
* Dynamic pricing tests.
* Multi‑language text entries.

Apply with Supabase SQL editor or CLI after core schema + RLS migrations are run.
