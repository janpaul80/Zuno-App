# ZUNO Backend Implementation Plan

> Documentation only. This plan intentionally does not add backend routes, migrations, Supabase client code, environment files, or Android client code.

## Goal

Prepare Phase 2 backend implementation for ZUNO: login, cloud profile, server-owned economy, online shop catalog, inventory, progression, and multiplayer-ready identity/stat foundations using Vercel API routes and Supabase.

## Architecture

ZUNO should keep the APK as the game client and make the backend the source of truth for accounts, currencies, inventory, purchases, progression, leaderboard data, and future match results. The recommended first backend is Next.js API route handlers deployed on Vercel, using Supabase for Auth, Postgres, Row Level Security, and Storage.

## Tech Stack

- Frontend/site: Next.js 16.2.6 App Router, React 19, TypeScript, Tailwind CSS 4
- Planned backend: Next.js App Router route handlers under `src/app/api/**/route.ts`
- Planned database/auth/storage: Supabase Auth + Postgres + RLS + Storage
- Planned server runtime helpers: `@supabase/supabase-js`, server-only validation utilities, route-level schema validation
- Planned testing: TypeScript checks, ESLint, unit tests for validators, route handler tests, Supabase local migration verification

---

## 1. Current Repo Status

Current status at time of writing:

- Branch: `main`
- Working tree before this document: clean
- Recent commits:
  - `f34c4ff docs/site: add ZUNO development roadmap`
  - `ebc884e docs/site: align ZUNO website with game architecture direction`
  - `b9a5ab4 Improve mobile responsiveness across ZUNO pages`
- Project type: Next.js website/app with App Router pages.
- Package manager: npm with `package-lock.json`.
- Current scripts:
  - `npm run lint` -> `eslint`
  - `npm run build` -> `next build`
- Current dependencies relevant to backend planning:
  - Next.js, React, React DOM
  - No Supabase package yet
  - No runtime validation package yet
  - No test runner package yet beyond ESLint/build tooling
- Existing source structure:
  - `src/app/**/page.tsx` static/content pages
  - `src/app/layout.tsx` global metadata/layout
  - `src/components/Navbar.tsx`
  - `src/components/Footer.tsx`
  - `public/**` artwork, video, and image assets
- Current backend implementation status:
  - No `src/app/api/**/route.ts` files found
  - No `middleware.ts` found
  - No Supabase client files found
  - No `docs/` directory existed before this plan
  - No migrations directory found
  - No tests/spec files found
- Important constraint:
  - Phase 2 should add backend foundations only after this plan is approved.
  - This document is not an implementation and should not be treated as evidence that backend code exists.

---

## 2. Recommended Backend Folder Structure

Recommended future structure for Phase 2, keeping backend code isolated and easy to review:

```text
src/
  app/
    api/
      health/
        route.ts
      app-config/
        route.ts
      profile/
        route.ts
      shop/
        catalog/
          route.ts
        purchase/
          route.ts
      inventory/
        route.ts
      progression/
        complete-level/
          route.ts
      leaderboard/
        route.ts
  lib/
    env.ts
    api/
      errors.ts
      response.ts
      auth.ts
      rate-limit.ts
      validation.ts
    supabase/
      admin.ts
      server.ts
      types.ts
    zuno/
      economy.ts
      progression.ts
      rewards.ts
      shop.ts
  types/
    zuno.ts

docs/
  BACKEND_IMPLEMENTATION_PLAN.md
  API_CONTRACT.md                 # future, after route contracts are finalized

supabase/
  migrations/
    0001_phase2_foundation.sql
  seed.sql                        # optional local/dev seed data only
  config.toml                     # only if Supabase local CLI is adopted

tests/
  api/
    health.test.ts
    shop-catalog.test.ts
    purchase.test.ts
  lib/
    economy.test.ts
    progression.test.ts
```

Notes:

- Do not place Supabase service-role usage in client components.
- Keep service-role access inside server-only modules such as `src/lib/supabase/admin.ts`.
- Keep shared response/error helpers in `src/lib/api/**` so every route returns a consistent JSON shape.
- Keep game economy logic in `src/lib/zuno/**` instead of embedding rules directly inside route handlers.
- Generate Supabase DB types into `src/lib/supabase/types.ts` after migrations exist.

---

## 3. Supabase Tables Needed for Phase 2

Phase 2 should focus on identity, profile, catalog, inventory, currency ledger, progression, and leaderboard foundations. Multiplayer should remain readiness-level only unless explicitly promoted to real-time work.

### 3.1 `profiles`

Purpose: one server-side profile row per authenticated Supabase user.

Recommended columns:

- `id uuid primary key references auth.users(id) on delete cascade`
- `display_name text not null`
- `avatar_key text null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`
- `last_seen_at timestamptz null`
- `account_status text not null default 'active'`

Rules:

- A player can read/update only their own public profile fields.
- Admin/service role can moderate account status.

### 3.2 `player_wallets`

Purpose: current server-owned currency balances.

Recommended columns:

- `player_id uuid primary key references profiles(id) on delete cascade`
- `coins integer not null default 0 check (coins >= 0)`
- `gems integer not null default 0 check (gems >= 0)`
- `revive_tokens integer not null default 0 check (revive_tokens >= 0)`
- `updated_at timestamptz not null default now()`

Rules:

- Client can read own wallet.
- Client cannot directly update wallet balances.
- Updates happen only through server-side reward/purchase procedures or service-role routes.

### 3.3 `currency_ledger`

Purpose: append-only audit trail for coins, gems, revive tokens, rewards, and purchases.

Recommended columns:

- `id uuid primary key default gen_random_uuid()`
- `player_id uuid not null references profiles(id) on delete cascade`
- `currency text not null check (currency in ('coins', 'gems', 'revive_tokens'))`
- `amount integer not null`
- `reason text not null`
- `source_type text not null`
- `source_id text null`
- `idempotency_key text null unique`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`

Rules:

- Players can read their own ledger history.
- No client inserts.
- Server writes ledger entries for every balance change.
- Use `idempotency_key` for mobile retry safety.

### 3.4 `shop_items`

Purpose: backend-controlled catalog of purchasable/unlockable items.

Recommended columns:

- `id text primary key`
- `category text not null check (category in ('weapon', 'armor', 'uniform', 'gadget', 'health_upgrade', 'special_ability', 'consumable'))`
- `name text not null`
- `description text not null`
- `rarity text not null default 'common'`
- `price_coins integer null check (price_coins is null or price_coins >= 0)`
- `price_gems integer null check (price_gems is null or price_gems >= 0)`
- `is_active boolean not null default true`
- `is_premium boolean not null default false`
- `sort_order integer not null default 0`
- `stats jsonb not null default '{}'::jsonb`
- `effects jsonb not null default '{}'::jsonb`
- `asset_key text null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Rules:

- Active catalog rows can be read by authenticated players.
- Catalog writes are admin/service-role only.

### 3.5 `player_inventory`

Purpose: ownership and equip state for weapons, armor, uniforms, gadgets, upgrades, and abilities.

Recommended columns:

- `id uuid primary key default gen_random_uuid()`
- `player_id uuid not null references profiles(id) on delete cascade`
- `item_id text not null references shop_items(id)`
- `quantity integer not null default 1 check (quantity >= 0)`
- `is_equipped boolean not null default false`
- `slot text null`
- `acquired_at timestamptz not null default now()`
- `metadata jsonb not null default '{}'::jsonb`
- `unique (player_id, item_id)`

Rules:

- Players can read own inventory.
- Players should not directly insert paid inventory items.
- Equip updates can be allowed through a controlled RPC/route that validates item ownership and slot rules.

### 3.6 `level_definitions`

Purpose: server-known level metadata and rewards for Easy/Medium/Hard tiers.

Recommended columns:

- `id text primary key`
- `tier text not null check (tier in ('easy', 'medium', 'hard'))`
- `name text not null`
- `world_key text not null`
- `recommended_power integer not null default 0`
- `base_coin_reward integer not null default 0 check (base_coin_reward >= 0)`
- `gem_reward integer not null default 0 check (gem_reward >= 0)`
- `is_active boolean not null default true`
- `sort_order integer not null default 0`
- `metadata jsonb not null default '{}'::jsonb`

Rules:

- Authenticated players can read active level definitions.
- Admin/service role manages definitions.

### 3.7 `player_level_progress`

Purpose: cloud-synced progress per player and level.

Recommended columns:

- `id uuid primary key default gen_random_uuid()`
- `player_id uuid not null references profiles(id) on delete cascade`
- `level_id text not null references level_definitions(id)`
- `best_score integer not null default 0`
- `best_time_ms integer null`
- `stars integer not null default 0 check (stars between 0 and 3)`
- `completed_count integer not null default 0 check (completed_count >= 0)`
- `last_completed_at timestamptz null`
- `metadata jsonb not null default '{}'::jsonb`
- `unique (player_id, level_id)`

Rules:

- Players can read own progress.
- Updates should go through server route/RPC validating level completion payloads.

### 3.8 `leaderboard_entries`

Purpose: leaderboard readiness for level times, scores, and future multiplayer results.

Recommended columns:

- `id uuid primary key default gen_random_uuid()`
- `leaderboard_key text not null`
- `player_id uuid not null references profiles(id) on delete cascade`
- `score integer not null default 0`
- `time_ms integer null`
- `rank_context jsonb not null default '{}'::jsonb`
- `updated_at timestamptz not null default now()`
- `unique (leaderboard_key, player_id)`

Rules:

- Players can read leaderboard entries.
- Players cannot directly write leaderboard rows.
- Server updates entries after validated progression/match result events.

### 3.9 `match_results`

Purpose: asynchronous/future multiplayer readiness without implementing real-time networking yet.

Recommended columns:

- `id uuid primary key default gen_random_uuid()`
- `match_type text not null`
- `player_id uuid not null references profiles(id) on delete cascade`
- `result text not null`
- `score integer not null default 0`
- `duration_ms integer null`
- `rewards jsonb not null default '{}'::jsonb`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`

Rules:

- Players can read their own match history.
- Server writes match results only after validation.

### 3.10 `player_entitlements`

Purpose: track premium entitlements and purchase validation outcomes separate from general inventory.

Recommended columns:

- `id uuid primary key default gen_random_uuid()`
- `player_id uuid not null references profiles(id) on delete cascade`
- `entitlement_key text not null`
- `source text not null`
- `external_receipt_id text null`
- `status text not null default 'active'`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`
- `unique (player_id, entitlement_key, source)`

Rules:

- Players can read own entitlements.
- Only trusted server routes can create or revoke entitlements.

---

## 4. API Routes Planned for Phase 2

Use Next.js route handlers and keep all responses JSON. The exact shape should be documented in `docs/API_CONTRACT.md` before implementation or as part of the first backend PR.

### 4.1 `GET /api/health`

Purpose: deployment/runtime health check.

Returns:

- `ok: true`
- build/runtime metadata safe for public display
- optional Supabase connectivity status if service config is available

Auth:

- Public, but no secrets or internal details.

### 4.2 `GET /api/app-config`

Purpose: mobile client bootstrap configuration.

Returns:

- minimum supported APK version
- feature flags
- maintenance mode flag
- shop refresh interval hints
- links to support/legal pages

Auth:

- Public or authenticated. Prefer public for app boot, with no sensitive data.

### 4.3 `GET /api/profile`

Purpose: return authenticated player's profile, wallet summary, inventory summary, and progression summary.

Auth:

- Required Supabase user JWT.

Validation:

- JWT must map to `profiles.id`.
- Create missing profile/wallet only if using an explicit safe bootstrap path.

### 4.4 `PATCH /api/profile`

Purpose: update safe profile fields such as display name or avatar key.

Auth:

- Required.

Validation:

- Display name length and allowed characters.
- Avatar key must be from allowed catalog/config.

### 4.5 `GET /api/shop/catalog`

Purpose: return active backend-controlled shop items and pricing.

Auth:

- Required for player-specific ownership flags.
- Could support public read later, but Phase 2 should start authenticated.

Validation:

- Only active items returned.
- Include prices from server only, never from client.

### 4.6 `POST /api/shop/purchase`

Purpose: validate and execute coin/gem purchases.

Auth:

- Required.

Request body:

- `itemId`
- `currency`
- `idempotencyKey`

Validation:

- Item exists and is active.
- Currency is accepted for that item.
- Player has enough balance.
- Purchase is idempotent.
- Ledger, wallet, inventory, and entitlement updates happen atomically.

### 4.7 `GET /api/inventory`

Purpose: return player inventory and equipped loadout.

Auth:

- Required.

Validation:

- Player can only read own inventory.

### 4.8 `POST /api/inventory/equip`

Purpose: update equipped weapon/armor/uniform/gadget slots.

Auth:

- Required.

Request body:

- `itemId`
- `slot`

Validation:

- Player owns item.
- Item category is compatible with slot.
- Only one equipped item per exclusive slot.

### 4.9 `POST /api/progression/complete-level`

Purpose: validate a level completion event, update progress, and grant rewards.

Auth:

- Required.

Request body:

- `levelId`
- `score`
- `timeMs`
- `collectedCoins`
- `foundGems`
- `defeatedEnemies`
- `clientRunId` / `idempotencyKey`

Validation:

- Level exists and is active.
- Completion payload stays within expected reward caps.
- Prevent duplicate rewards on mobile retries.
- Update progress, ledger, wallet, leaderboard in a transaction/RPC.

### 4.10 `GET /api/leaderboard`

Purpose: return leaderboard entries by key.

Auth:

- Required for now.

Query params:

- `leaderboardKey`
- `limit`
- `cursor` or `offset`

Validation:

- Limit capped server-side.
- Only supported leaderboard keys accepted.

### 4.11 `POST /api/match-results`

Purpose: multiplayer-readiness endpoint for future asynchronous match result sync.

Auth:

- Required.

Phase 2 scope:

- Define but do not expose publicly until validation rules are ready.
- If implemented in Phase 2, keep behind feature flag.

---

## 5. Security Rules / RLS Approach

### Core principles

1. Supabase Auth owns identity.
2. Database Row Level Security must be enabled on every player-owned table.
3. The mobile APK must never be trusted for balances, prices, rewards, or ownership.
4. The service-role key must only exist in Vercel server environment variables and never in client bundles.
5. Every economy mutation must create an append-only ledger record.
6. Every retryable mobile mutation should use an idempotency key.
7. Admin/catalog writes should be service-role only until a separate admin UI exists.

### RLS policy strategy by table

- `profiles`
  - `select`: `auth.uid() = id`
  - `update`: `auth.uid() = id` for safe fields only; sensitive fields through server role
  - `insert`: server/bootstrap only
- `player_wallets`
  - `select`: `auth.uid() = player_id`
  - `insert/update/delete`: no direct client access
- `currency_ledger`
  - `select`: `auth.uid() = player_id`
  - `insert/update/delete`: no direct client access; append-only server writes
- `shop_items`
  - `select`: authenticated users can read `is_active = true`
  - `insert/update/delete`: service role only
- `player_inventory`
  - `select`: `auth.uid() = player_id`
  - `insert/update/delete`: server route/RPC only, except possibly a controlled equip RPC
- `level_definitions`
  - `select`: authenticated users can read active levels
  - `insert/update/delete`: service role only
- `player_level_progress`
  - `select`: `auth.uid() = player_id`
  - `insert/update/delete`: server route/RPC only
- `leaderboard_entries`
  - `select`: authenticated users can read supported leaderboard rows
  - `insert/update/delete`: server route/RPC only
- `match_results`
  - `select`: `auth.uid() = player_id`
  - `insert/update/delete`: server route/RPC only
- `player_entitlements`
  - `select`: `auth.uid() = player_id`
  - `insert/update/delete`: service role only

### Route security approach

- Use `Authorization: Bearer <Supabase JWT>` from APK/client for authenticated API routes.
- In each route, verify the user with Supabase before reading/writing player data.
- Do not accept `playerId` from the client for self-scoped routes. Derive it from the JWT.
- Validate request bodies with a schema validator before touching Supabase.
- Return typed error responses without exposing stack traces or service details.
- Add rate limiting for purchase, progression, profile update, and match result endpoints.
- Log suspicious reward/purchase attempts in a future `security_events` table if needed.

---

## 6. Environment Variables Needed

Recommended variables for Phase 2:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_JWT_SECRET=
ZUNO_API_BASE_URL=
ZUNO_APP_ENV=development|preview|production
ZUNO_MIN_ANDROID_VERSION=
ZUNO_FEATURE_SHOP=true|false
ZUNO_FEATURE_MULTIPLAYER=false
ZUNO_PURCHASE_IDEMPOTENCY_TTL_SECONDS=86400
ZUNO_RATE_LIMIT_ENABLED=true|false
ZUNO_INTERNAL_ADMIN_TOKEN=
```

Guidance:

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are safe for browser/mobile clients, but still rely on RLS.
- `SUPABASE_SERVICE_ROLE_KEY` must never be exposed to client components, public env vars, logs, or APK builds.
- `SUPABASE_JWT_SECRET` is sensitive and should be used only if direct JWT verification is needed; otherwise prefer Supabase server helpers.
- `ZUNO_INTERNAL_ADMIN_TOKEN` is optional and should only be used for private admin/seed endpoints if those are added later.
- Do not commit `.env.local`, Supabase service keys, JWT secrets, or production URLs with credentials.

---

## 7. Testing Plan

### Documentation/current website verification

Run after this plan and after each website-only update:

```bash
npm run lint
npm run build
```

### Phase 2 implementation verification

When backend work begins, add tests before or alongside routes:

1. Static checks
   - `npm run lint`
   - `npm run build`
   - `npx tsc --noEmit` if a separate typecheck script is added
2. Unit tests
   - Economy calculations in `src/lib/zuno/economy.ts`
   - Reward caps and progression validation in `src/lib/zuno/progression.ts`
   - Request schema validation in `src/lib/api/validation.ts`
3. Route tests
   - `GET /api/health` returns public health payload
   - Unauthenticated calls to protected routes return `401`
   - Authenticated profile/catalog/inventory calls return only the current player's data
   - Purchase route rejects invalid item, invalid currency, insufficient funds, and duplicate idempotency keys
   - Complete-level route rejects impossible rewards and duplicate run IDs
4. Supabase local/database tests
   - Migrations apply cleanly from scratch
   - RLS blocks direct client wallet updates
   - RLS allows a player to read only their own profile/wallet/inventory/progress
   - Service-role procedures can update wallet + ledger atomically
5. Manual smoke tests
   - Create a test user in Supabase local or staging
   - Fetch profile
   - Fetch shop catalog
   - Execute a test coin purchase
   - Equip a purchased item
   - Complete a test level and verify wallet/progress/leaderboard updates

### Recommended future package additions

Do not add these until Phase 2 implementation starts:

- Supabase client: `@supabase/supabase-js`
- Test runner: `vitest`
- Route testing helpers as needed
- Schema validation: `zod` or equivalent

---

## 8. Step-by-Step Implementation Order

Each step should be its own small PR/commit where practical.

### Step 1: Add backend contract documentation

Files:

- Create `docs/API_CONTRACT.md`

Actions:

- Define response envelope: success, error, trace/request ID.
- Define auth expectations for each route.
- Define initial request/response JSON for profile, shop, purchase, inventory, progression, and leaderboard.

Verification:

- `npm run lint`
- `npm run build`

### Step 2: Add dependencies and environment validation

Files likely to change:

- Modify `package.json`
- Modify `package-lock.json`
- Create `src/lib/env.ts`
- Create `.env.example`

Actions:

- Add Supabase and validation dependencies.
- Add env parsing/validation for public and server-only variables.
- Add `.env.example` with empty placeholders only.

Verification:

- `npm run lint`
- `npm run build`

### Step 3: Add Supabase local structure and first migration

Files likely to change:

- Create `supabase/migrations/0001_phase2_foundation.sql`
- Optionally create `supabase/seed.sql`

Actions:

- Create Phase 2 tables.
- Enable RLS on every table.
- Add policies and indexes.
- Add updated-at triggers if needed.

Verification:

- Apply migration locally or in staging.
- Confirm RLS manually using authenticated and anonymous contexts.
- `npm run lint`
- `npm run build`

### Step 4: Add Supabase server helpers

Files likely to change:

- Create `src/lib/supabase/server.ts`
- Create `src/lib/supabase/admin.ts`
- Create `src/lib/supabase/types.ts` after type generation exists

Actions:

- Add anon/client-safe helper for authenticated user context.
- Add service-role helper that is server-only.
- Prevent accidental client imports of admin helper.

Verification:

- `npm run lint`
- `npm run build`

### Step 5: Add shared API helpers

Files likely to change:

- Create `src/lib/api/errors.ts`
- Create `src/lib/api/response.ts`
- Create `src/lib/api/auth.ts`
- Create `src/lib/api/validation.ts`

Actions:

- Standardize JSON response shape.
- Standardize auth extraction and Supabase user lookup.
- Standardize validation failures.

Verification:

- Unit tests if test runner has been added.
- `npm run lint`
- `npm run build`

### Step 6: Implement `GET /api/health`

Files likely to change:

- Create `src/app/api/health/route.ts`

Actions:

- Return safe public health payload.
- Do not expose secrets or internal Supabase credentials.

Verification:

- Route test or manual request.
- `npm run lint`
- `npm run build`

### Step 7: Implement authenticated profile read/update

Files likely to change:

- Create `src/app/api/profile/route.ts`
- Add tests under `tests/api/profile.test.ts` if test runner exists

Actions:

- `GET` returns profile/wallet summary for authenticated user.
- `PATCH` updates safe fields only.

Verification:

- Unauthenticated request returns `401`.
- Authenticated request returns only current user data.
- `npm run lint`
- `npm run build`

### Step 8: Implement shop catalog read

Files likely to change:

- Create `src/app/api/shop/catalog/route.ts`
- Add shop query helper in `src/lib/zuno/shop.ts`

Actions:

- Return active catalog items.
- Include player ownership flags only for authenticated users.

Verification:

- Catalog excludes inactive items.
- `npm run lint`
- `npm run build`

### Step 9: Implement purchase flow with idempotency

Files likely to change:

- Create `src/app/api/shop/purchase/route.ts`
- Create/update `src/lib/zuno/economy.ts`

Actions:

- Validate item and currency.
- Check balance.
- Write ledger and inventory atomically.
- Support idempotency key for mobile retries.

Verification:

- Reject insufficient funds.
- Reject unknown item.
- Duplicate idempotency key does not double charge.
- `npm run lint`
- `npm run build`

### Step 10: Implement inventory read/equip

Files likely to change:

- Create `src/app/api/inventory/route.ts`
- Create `src/app/api/inventory/equip/route.ts`

Actions:

- Return owned items and equipped slots.
- Validate ownership and slot compatibility before equip.

Verification:

- Cannot equip unowned item.
- Cannot equip item into incompatible slot.
- `npm run lint`
- `npm run build`

### Step 11: Implement level completion and rewards

Files likely to change:

- Create `src/app/api/progression/complete-level/route.ts`
- Create/update `src/lib/zuno/progression.ts`
- Create/update `src/lib/zuno/rewards.ts`

Actions:

- Validate level and reward caps.
- Update progress, wallet, ledger, and leaderboard atomically.
- Support idempotency for duplicate completion submissions.

Verification:

- Reject impossible coin/gem claims.
- Duplicate run ID does not double reward.
- `npm run lint`
- `npm run build`

### Step 12: Implement leaderboard read

Files likely to change:

- Create `src/app/api/leaderboard/route.ts`

Actions:

- Return supported leaderboard entries with capped limits.
- Include current player rank where feasible.

Verification:

- Invalid leaderboard key rejected.
- Limit is capped server-side.
- `npm run lint`
- `npm run build`

### Step 13: Add multiplayer readiness placeholder only if needed

Files likely to change:

- Create `src/app/api/match-results/route.ts` only when validation requirements are defined

Actions:

- Keep behind feature flag.
- Store asynchronous match results only after server validation.
- Do not implement real-time combat networking in Phase 2.

Verification:

- Feature flag disabled by default.
- `npm run lint`
- `npm run build`

---

## Open Questions Before Implementation

- Which Supabase project/staging environment should Phase 2 target first?
- Should ZUNO support anonymous guest accounts before full login?
- What are the first concrete shop items and prices for seed data?
- What level IDs should map to the current website level names?
- Should purchases include real-money platform receipts in Phase 2, or only coins/gems earned in-game?
- What anti-cheat thresholds should be used for level completion rewards?
- Is multiplayer Phase 2 strictly asynchronous readiness, or should route contracts reserve real-time provider IDs now?

## Non-Goals For This Plan

- No backend code is implemented here.
- No Supabase project is configured here.
- No database migrations are created here.
- No API routes are created here.
- No Android APK/client work is created here.
- No real-time multiplayer provider is selected or integrated here.
