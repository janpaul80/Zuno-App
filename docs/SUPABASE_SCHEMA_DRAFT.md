# ZUNO Supabase Schema Draft

> Documentation only. This draft does not create migrations, SQL files, Supabase clients, API routes, seed data, or backend code.

## Purpose

This document drafts the Phase 2 Supabase schema for ZUNO's backend foundation. The backend should make Supabase Auth the identity provider and Supabase Postgres the server-owned source of truth for player identity, cloud profiles, currencies, inventory, purchases, audit ledgers, inventory history, and cloud saves.

## Design Principles

- The Android APK is a client, not the source of truth.
- The backend owns coins, gems, purchases, unlocks, inventory, and cloud-save acceptance.
- Every table that stores player-owned data should use Row Level Security (RLS).
- Players may read their own data, but economy-changing writes should happen through trusted server routes or Postgres RPC functions using service-role privileges.
- Client-submitted IDs such as `player_id` should be ignored for self-scoped actions; derive player identity from the Supabase Auth JWT.
- Economy and inventory changes should be auditable with append-only event/ledger tables.
- Mobile retry flows should use idempotency keys to avoid duplicate charges or rewards.

## Table Summary

| Table | Purpose | Client Reads | Client Writes | Server Writes |
| --- | --- | --- | --- | --- |
| `players` | Auth-linked player root record | Own row | Limited safe fields only, or none | Yes |
| `player_profiles` | Public/display profile and presentation data | Own row; limited public views later | Safe profile updates only | Yes |
| `player_currency` | Current currency balances | Own row | No | Yes |
| `player_inventory` | Current item ownership/equip state | Own rows | No direct item grants | Yes |
| `shop_items` | Server-controlled catalog | Active rows | No | Yes |
| `purchases` | Purchase attempts/results | Own rows | No direct inserts from client | Yes |
| `currency_ledger` | Append-only currency audit trail | Own rows | No | Yes |
| `inventory_events` | Append-only inventory audit trail | Own rows | No | Yes |
| `cloud_saves` | Cloud save metadata/payload history | Own rows | Prefer route-validated only | Yes |

---

## 1. `players`

### Purpose

Root player record tied one-to-one to `auth.users`. This table anchors ownership for all other player-owned tables and stores account-level flags that should not live in display-profile data.

### Key Columns

| Column | Draft Type | Notes |
| --- | --- | --- |
| `id` | `uuid primary key` | Same UUID as `auth.users.id`; foreign key to `auth.users(id)` with cascade delete. |
| `created_at` | `timestamptz not null default now()` | Account/player creation timestamp. |
| `updated_at` | `timestamptz not null default now()` | Maintained by trigger or server writes. |
| `last_seen_at` | `timestamptz null` | Updated by trusted server endpoint on app session/activity. |
| `status` | `text not null default 'active'` | Suggested values: `active`, `suspended`, `deleted`, `test`. |
| `region` | `text null` | Optional routing/leaderboard region. |
| `platform` | `text not null default 'android'` | First supported platform; allows future expansion. |
| `app_version` | `text null` | Last seen APK/app version for compatibility decisions. |
| `metadata` | `jsonb not null default '{}'::jsonb` | Non-sensitive server-owned account metadata. |

### Ownership Model

- One row per Supabase Auth user.
- `players.id` is the canonical `player_id` used by player-owned tables.
- The player owns their own row for read purposes.
- Admin/service role owns moderation fields such as `status`.

### RLS Approach

- Enable RLS.
- `select`: allow authenticated user where `auth.uid() = id`.
- `insert`: deny direct client inserts; create by trigger on `auth.users` or trusted server bootstrap.
- `update`: either deny direct client updates entirely, or allow only safe columns through a restricted policy/check. Prefer server route updates for Phase 2.
- `delete`: deny client deletes; account deletion should be an explicit server/admin flow.

### Notes on Server-Only Writes

- Creation should happen from an auth trigger or server-side profile bootstrap.
- `status`, `last_seen_at`, `app_version`, and account moderation metadata should be written by server routes/service role only.
- The APK should never send arbitrary `player_id` values to mutate this table.

---

## 2. `player_profiles`

### Purpose

Stores player-facing profile data separate from root account state: display name, avatar, equipped cosmetics for profile presentation, and optional public profile flags.

### Key Columns

| Column | Draft Type | Notes |
| --- | --- | --- |
| `player_id` | `uuid primary key references players(id) on delete cascade` | One profile per player. |
| `display_name` | `text not null` | Validate length and characters server-side. |
| `avatar_key` | `text null` | References an allowed avatar/cosmetic key from catalog/config. |
| `title_key` | `text null` | Optional unlockable title. |
| `banner_key` | `text null` | Optional profile banner/cosmetic. |
| `level` | `integer not null default 1` | Player account level summary; server-owned if tied to progression. |
| `xp` | `integer not null default 0` | Server-owned if earned through gameplay. |
| `is_public` | `boolean not null default false` | Future public profile/leaderboard display flag. |
| `created_at` | `timestamptz not null default now()` | Profile creation timestamp. |
| `updated_at` | `timestamptz not null default now()` | Maintained by trigger or server writes. |

### Ownership Model

- A profile belongs to exactly one player.
- The player may read their own full profile.
- Public profile reads can be added later for leaderboard display, but Phase 2 should start conservative.

### RLS Approach

- Enable RLS.
- `select`: allow `auth.uid() = player_id`.
- Optional future public policy: allow limited columns only through a view, not direct broad table reads.
- `insert`: deny client direct inserts; create during player bootstrap.
- `update`: allow direct updates only for safe fields (`display_name`, selected cosmetic keys) if policy and validation are sufficient. Prefer route-validated updates in Phase 2.
- `delete`: deny client deletes.

### Notes on Server-Only Writes

- `level` and `xp` should be server-owned because they affect progression/status.
- Cosmetic keys should be validated against ownership before being saved.
- Display names should be validated and rate-limited through the API route to prevent spam or abuse.

---

## 3. `player_currency`

### Purpose

Stores current currency balances for each player. This table is a snapshot/cache of the latest server-approved balance, while `currency_ledger` is the audit trail.

### Key Columns

| Column | Draft Type | Notes |
| --- | --- | --- |
| `player_id` | `uuid primary key references players(id) on delete cascade` | One wallet row per player. |
| `coins` | `integer not null default 0 check (coins >= 0)` | Main earned currency. |
| `gems` | `integer not null default 0 check (gems >= 0)` | Rare/premium currency. |
| `revive_tokens` | `integer not null default 0 check (revive_tokens >= 0)` | Optional consumable revive currency. |
| `updated_at` | `timestamptz not null default now()` | Updated on every balance mutation. |
| `version` | `integer not null default 1` | Optional optimistic concurrency/version counter. |

### Ownership Model

- A player owns their own wallet for read purposes only.
- The server owns all writes.
- Balances must always correspond to ledger entries.

### RLS Approach

- Enable RLS.
- `select`: allow `auth.uid() = player_id`.
- `insert`: deny direct client inserts.
- `update`: deny direct client updates.
- `delete`: deny client deletes.

### Notes on Server-Only Writes

- All changes should occur inside trusted server routes or Postgres RPC transactions.
- Every balance mutation must also insert a `currency_ledger` row.
- Purchases and rewards should use idempotency keys so mobile retries do not double charge or double reward.
- Direct client updates to `coins`, `gems`, or `revive_tokens` should never be allowed.

---

## 4. `player_inventory`

### Purpose

Stores the current inventory state: owned weapons, armor, uniforms/skins, gadgets, upgrades, consumables, and equipped slots.

### Key Columns

| Column | Draft Type | Notes |
| --- | --- | --- |
| `id` | `uuid primary key default gen_random_uuid()` | Inventory row ID. |
| `player_id` | `uuid not null references players(id) on delete cascade` | Owning player. |
| `item_id` | `text not null references shop_items(id)` | Owned item/catalog key. |
| `quantity` | `integer not null default 1 check (quantity >= 0)` | Stack count for consumables; usually 1 for equipment. |
| `is_equipped` | `boolean not null default false` | Convenience flag for active loadout. |
| `slot` | `text null` | Suggested values: `weapon_primary`, `armor`, `uniform`, `gadget_1`, `gadget_2`, `ability`. |
| `acquired_at` | `timestamptz not null default now()` | First acquisition time. |
| `updated_at` | `timestamptz not null default now()` | Last quantity/equip update. |
| `metadata` | `jsonb not null default '{}'::jsonb` | Item state, upgrade tier, roll data, etc. |

Suggested constraints/indexes:

- `unique (player_id, item_id)` for non-stackable ownership, or allow multiple rows only if item instances require unique rolls.
- Index `player_id` for inventory reads.
- Optional partial unique index for one item per equip slot: `(player_id, slot) where is_equipped = true and slot is not null`.

### Ownership Model

- Inventory rows belong to the owning player.
- Players can read their own inventory.
- Item grants, removals, and quantity changes are server-owned.
- Equip changes may be route-validated after confirming ownership and slot compatibility.

### RLS Approach

- Enable RLS.
- `select`: allow `auth.uid() = player_id`.
- `insert`: deny direct client inserts.
- `update`: deny direct client updates in Phase 2; use `/api/inventory/equip` or RPC to validate equip changes.
- `delete`: deny client deletes.

### Notes on Server-Only Writes

- Purchases, rewards, admin grants, and consumable use should update inventory only through trusted server flows.
- Every grant/remove/equip/consume action should create an `inventory_events` row.
- Equipment stat bonuses should be derived from `shop_items` and validated server-side, not trusted from APK payloads.

---

## 5. `shop_items`

### Purpose

Server-controlled catalog of purchasable or unlockable items, including weapons, armor, uniforms/skins, gadgets, health upgrades, special abilities, revive tokens, and premium gem packs if needed later.

### Key Columns

| Column | Draft Type | Notes |
| --- | --- | --- |
| `id` | `text primary key` | Stable item key used by API/APK. |
| `category` | `text not null` | Suggested values: `weapon`, `armor`, `uniform`, `gadget`, `health_upgrade`, `special_ability`, `consumable`, `currency_pack`. |
| `name` | `text not null` | Player-facing item name. |
| `description` | `text not null` | Player-facing item description. |
| `rarity` | `text not null default 'common'` | Suggested values: `common`, `rare`, `epic`, `legendary`, `premium`. |
| `price_coins` | `integer null check (price_coins is null or price_coins >= 0)` | Coin price; null if not purchasable with coins. |
| `price_gems` | `integer null check (price_gems is null or price_gems >= 0)` | Gem price; null if not purchasable with gems. |
| `is_active` | `boolean not null default true` | Controls catalog visibility. |
| `is_premium` | `boolean not null default false` | Flags premium-style items. |
| `is_stackable` | `boolean not null default false` | True for consumables/currency-like items. |
| `sort_order` | `integer not null default 0` | Catalog ordering. |
| `stats` | `jsonb not null default '{}'::jsonb` | Weapon/armor/gadget stat data. |
| `effects` | `jsonb not null default '{}'::jsonb` | Effects such as glow, aura, shield, magnet, etc. |
| `asset_key` | `text null` | Model/texture/icon key for APK/client. |
| `created_at` | `timestamptz not null default now()` | Catalog creation timestamp. |
| `updated_at` | `timestamptz not null default now()` | Catalog update timestamp. |

### Ownership Model

- Catalog data is owned by the game/backend team.
- Players do not own `shop_items`; they own entries in `player_inventory` that reference `shop_items`.
- Active items can be read by authenticated clients.

### RLS Approach

- Enable RLS.
- `select`: allow authenticated users to read rows where `is_active = true`.
- `insert/update/delete`: deny client access; service-role/admin only.
- Consider exposing a read-only `active_shop_items` view later if public catalog reads are needed.

### Notes on Server-Only Writes

- Prices, categories, stats, and premium flags are server-owned.
- The APK must never send price data that the server trusts.
- Catalog changes should be admin/service-role only and ideally audited in a future admin audit table.

---

## 6. `purchases`

### Purpose

Records purchase attempts and outcomes for shop items. This table supports idempotency, auditability, customer support, and future receipt validation.

### Key Columns

| Column | Draft Type | Notes |
| --- | --- | --- |
| `id` | `uuid primary key default gen_random_uuid()` | Purchase record ID. |
| `player_id` | `uuid not null references players(id) on delete cascade` | Purchasing player. |
| `item_id` | `text not null references shop_items(id)` | Purchased item. |
| `currency` | `text not null` | Suggested values: `coins`, `gems`, `platform_receipt`, `grant`. |
| `amount` | `integer not null check (amount >= 0)` | Price charged or validated value. |
| `quantity` | `integer not null default 1 check (quantity > 0)` | Quantity purchased/granted. |
| `status` | `text not null default 'pending'` | Suggested values: `pending`, `completed`, `failed`, `refunded`, `cancelled`. |
| `idempotency_key` | `text not null` | Unique per player/action to prevent duplicate charges. |
| `external_receipt_id` | `text null` | For future Play Billing/App Store receipt validation. |
| `failure_reason` | `text null` | Safe support/debug reason, not stack traces. |
| `metadata` | `jsonb not null default '{}'::jsonb` | Request context, app version, catalog price snapshot. |
| `created_at` | `timestamptz not null default now()` | Purchase creation timestamp. |
| `completed_at` | `timestamptz null` | Completion timestamp. |

Suggested constraints/indexes:

- `unique (player_id, idempotency_key)`.
- Index `(player_id, created_at desc)`.
- Index `(status)` for support/admin review.

### Ownership Model

- Purchases belong to the player for read/support history.
- Purchase creation/completion is server-owned.
- The player can initiate purchase intent via API, but the server writes the purchase row after validation.

### RLS Approach

- Enable RLS.
- `select`: allow `auth.uid() = player_id`.
- `insert/update/delete`: deny direct client access.
- All status changes should happen through service-role route/RPC.

### Notes on Server-Only Writes

- Purchase flow should atomically:
  1. Validate item and price from `shop_items`.
  2. Check `player_currency` balance or external receipt.
  3. Insert or reuse `purchases` row by idempotency key.
  4. Insert `currency_ledger` charge row if applicable.
  5. Update `player_currency` if applicable.
  6. Grant/update `player_inventory`.
  7. Insert `inventory_events` grant row.
- Never trust item price, quantity, or player ID from the APK without server validation.

---

## 7. `currency_ledger`

### Purpose

Append-only audit trail for every coin, gem, and revive token balance change. This table explains how the current `player_currency` balance was reached.

### Key Columns

| Column | Draft Type | Notes |
| --- | --- | --- |
| `id` | `uuid primary key default gen_random_uuid()` | Ledger row ID. |
| `player_id` | `uuid not null references players(id) on delete cascade` | Affected player. |
| `currency` | `text not null` | Suggested values: `coins`, `gems`, `revive_tokens`. |
| `amount` | `integer not null` | Positive for grants, negative for spends. |
| `balance_after` | `integer not null check (balance_after >= 0)` | Snapshot after transaction. |
| `reason` | `text not null` | Suggested values: `level_reward`, `purchase_spend`, `purchase_refund`, `admin_grant`, `daily_bonus`, `revive_used`. |
| `source_type` | `text not null` | Suggested values: `purchase`, `level_completion`, `cloud_save_review`, `admin`, `match_result`. |
| `source_id` | `text null` | Related purchase/event/run ID. |
| `idempotency_key` | `text null` | For retry-safe mutation events. |
| `metadata` | `jsonb not null default '{}'::jsonb` | Safe audit context. |
| `created_at` | `timestamptz not null default now()` | Ledger timestamp. |

Suggested constraints/indexes:

- Optional `unique (player_id, idempotency_key)` where `idempotency_key is not null`.
- Index `(player_id, created_at desc)`.
- Index `(source_type, source_id)`.

### Ownership Model

- Ledger rows belong to the affected player for read history.
- Ledger writes are server-owned and append-only.

### RLS Approach

- Enable RLS.
- `select`: allow `auth.uid() = player_id`.
- `insert/update/delete`: deny direct client access.
- Consider preventing updates/deletes even for normal admin flows; corrections should be compensating ledger entries.

### Notes on Server-Only Writes

- Insert a ledger row for every balance-changing event.
- Do not allow edits to historical ledger rows.
- Do not allow direct ledger rows without a corresponding trusted balance mutation.
- `balance_after` helps support/debugging and detects drift.

---

## 8. `inventory_events`

### Purpose

Append-only audit trail for inventory changes: purchases, grants, rewards, equips, unequips, consumable use, refunds, and support/admin corrections.

### Key Columns

| Column | Draft Type | Notes |
| --- | --- | --- |
| `id` | `uuid primary key default gen_random_uuid()` | Event row ID. |
| `player_id` | `uuid not null references players(id) on delete cascade` | Affected player. |
| `inventory_id` | `uuid null references player_inventory(id)` | Related inventory row when available. |
| `item_id` | `text not null references shop_items(id)` | Related item. |
| `event_type` | `text not null` | Suggested values: `grant`, `purchase`, `equip`, `unequip`, `consume`, `refund`, `admin_adjust`, `reward`. |
| `quantity_delta` | `integer not null default 0` | Positive or negative change. |
| `slot` | `text null` | Equip/unequip slot if relevant. |
| `source_type` | `text not null` | Suggested values: `purchase`, `level_completion`, `admin`, `cloud_save_review`, `match_result`. |
| `source_id` | `text null` | Related event/purchase/run ID. |
| `idempotency_key` | `text null` | Retry safety for grant/consume/equip flows. |
| `metadata` | `jsonb not null default '{}'::jsonb` | Safe context such as previous slot or quantity. |
| `created_at` | `timestamptz not null default now()` | Event timestamp. |

Suggested constraints/indexes:

- Index `(player_id, created_at desc)`.
- Index `(item_id)`.
- Optional unique idempotency constraint for mutation-producing event types.

### Ownership Model

- Events belong to the affected player for read/support history.
- Event creation is server-owned.
- Events should explain changes made to `player_inventory`.

### RLS Approach

- Enable RLS.
- `select`: allow `auth.uid() = player_id`.
- `insert/update/delete`: deny direct client access.
- Treat this table as append-only; corrections should create new events instead of editing old ones.

### Notes on Server-Only Writes

- Purchase and reward flows must insert inventory events when granting items.
- Equip/unequip routes should write events after validating ownership and slot compatibility.
- Consumable use should write negative `quantity_delta` events and update inventory atomically.

---

## 9. `cloud_saves`

### Purpose

Stores cloud-save metadata and payload snapshots for the APK. Phase 2 should treat cloud saves carefully: the client may submit gameplay state, but the server should only accept safe fields and should not trust client-submitted currencies, purchases, or premium unlocks.

### Key Columns

| Column | Draft Type | Notes |
| --- | --- | --- |
| `id` | `uuid primary key default gen_random_uuid()` | Save snapshot ID. |
| `player_id` | `uuid not null references players(id) on delete cascade` | Owning player. |
| `slot` | `text not null default 'default'` | Save slot; Phase 2 can use one default slot. |
| `save_version` | `integer not null default 1` | Monotonic player/slot save version. |
| `client_save_id` | `text null` | APK-generated run/save ID for idempotency/debugging. |
| `app_version` | `text not null` | APK version that produced the save. |
| `schema_version` | `integer not null default 1` | Save payload schema version. |
| `payload` | `jsonb not null default '{}'::jsonb` | Sanitized, server-accepted save data. |
| `checksum` | `text null` | Optional checksum for payload integrity/debugging. |
| `device_id_hash` | `text null` | Optional privacy-safe device identifier hash. |
| `status` | `text not null default 'active'` | Suggested values: `active`, `superseded`, `rejected`, `quarantined`. |
| `created_at` | `timestamptz not null default now()` | Snapshot creation timestamp. |
| `updated_at` | `timestamptz not null default now()` | Updated if status changes. |

Suggested constraints/indexes:

- Index `(player_id, slot, save_version desc)`.
- Optional `unique (player_id, slot, save_version)`.
- Optional `unique (player_id, client_save_id)` where `client_save_id is not null`.

### Ownership Model

- Cloud save rows belong to the owning player.
- The player can read their own active/latest saves.
- Save writes should be route-validated because payloads can contain cheat-prone data.

### RLS Approach

- Enable RLS.
- `select`: allow `auth.uid() = player_id`.
- `insert/update/delete`: prefer deny direct client access in Phase 2; use `/api/cloud-save` route later to sanitize payloads before service-role writes.
- If direct inserts are ever allowed, restrict to non-economy fields and enforce payload constraints through RPC/checks. For Phase 2, do not allow direct inserts.

### Notes on Server-Only Writes

- The server should reject or strip currency balances, premium unlocks, purchases, and inventory grants from client save payloads.
- Accepted save payloads should contain safe state such as settings, checkpoint metadata, cosmetic presentation preferences, and local progress hints.
- Authoritative progression, currency, inventory, and purchases should stay in their dedicated tables.
- Suspicious save submissions can be marked `rejected` or `quarantined` for support/security review.

---

## Cross-Table Write Flows

### Player Bootstrap

1. Supabase Auth user is created.
2. Server/trigger creates `players` row.
3. Server/trigger creates `player_profiles` row.
4. Server/trigger creates `player_currency` row with zero/default balances.
5. Optional starter inventory grants are inserted into `player_inventory` with matching `inventory_events`.

### Coin/Gem Purchase

1. API authenticates Supabase JWT and derives `player_id`.
2. API validates `item_id`, `currency`, and `idempotency_key`.
3. Server reads current `shop_items` price.
4. Server creates/reuses `purchases` row.
5. Server checks `player_currency` balance.
6. Server writes negative `currency_ledger` row with `balance_after`.
7. Server updates `player_currency`.
8. Server grants/updates `player_inventory`.
9. Server writes `inventory_events` row.
10. Server marks purchase `completed`.

### Level Reward Grant

1. API authenticates player.
2. API validates level completion payload against allowed caps.
3. Server writes positive `currency_ledger` rows for approved rewards.
4. Server updates `player_currency`.
5. Server grants any item rewards in `player_inventory`.
6. Server writes matching `inventory_events`.
7. Server updates cloud/progression tables in a later schema extension.

### Cloud Save Upload

1. API authenticates player.
2. API validates payload schema and app version.
3. API strips/rejects economy-owned fields.
4. Server writes sanitized payload to `cloud_saves`.
5. Server marks older active save for the same slot as `superseded` if desired.

---

## RLS Policy Draft Summary

The final migration should express policies in SQL, but the intended policy model is:

- `players`: users read own row; writes server-only.
- `player_profiles`: users read own row; safe updates via route or tightly restricted policy; progression-like fields server-only.
- `player_currency`: users read own row; writes server-only.
- `player_inventory`: users read own rows; grants/removals/equips route/RPC only.
- `shop_items`: authenticated users read active catalog; writes server-only.
- `purchases`: users read own purchases; writes/status changes server-only.
- `currency_ledger`: users read own ledger; append-only server writes.
- `inventory_events`: users read own events; append-only server writes.
- `cloud_saves`: users read own saves; writes should be route-validated/server-only in Phase 2.

---

## Open Questions Before Migration Work

- Should `players` be created by an auth trigger or by an explicit first-login API bootstrap route?
- Should `player_profiles.display_name` be globally unique, or only validated for safety/length?
- Are `coins`, `gems`, and `revive_tokens` enough for Phase 2, or should currencies be normalized into a row-per-currency table?
- Should equipment be unique by `player_id + item_id`, or should ZUNO support multiple rolled instances of the same item later?
- Which cloud-save fields are considered safe enough to persist in `cloud_saves.payload`?
- Should level progression be added to this Phase 2 schema immediately or kept for a follow-up schema draft?
- How will real-money platform receipts be validated when premium purchases begin?

## Non-Goals

- No SQL migrations in this document.
- No Supabase project setup in this document.
- No generated database types in this document.
- No API routes in this document.
- No server/client Supabase helpers in this document.
- No APK or gameplay implementation in this document.
