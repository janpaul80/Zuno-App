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
| `cloud_saves` | Player save data synced in JSON format. |

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
_Last updated_: phase 2.2 RLS migration draft (adds table security policies).

## Phase 2.2 – Row‑Level Security (RLS)
This migration enables RLS for all core Phase 2 tables and defines baseline security policies:

| Category | Tables | Policy |
|-----------|---------|---------|
| Player‑owned data | `players`, `player_profiles`, `player_currency`, `player_inventory`, `purchases`, `currency_ledger`, `inventory_events`, `cloud_saves` | Authenticated users can **read only their own records** (`player_id = auth.uid()`) |
| Public data | `shop_items` | Readable by any authenticated user |
| Sensitive write restrictions | `player_currency`, `purchases`, `inventory_events`, `currency_ledger` | Direct client writes are **revoked**; only the **service role** (server) may perform updates |

### Deferred Items
* Fine‑grained admin/GM roles
* Public guest‑mode item previews (optional later)
* Automated triggers for audit logging and ledger validation

All other behaviors (like balance updates) remain server‑only until validated business logic is applied in API routes.
