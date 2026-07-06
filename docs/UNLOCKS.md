# Unlocks Domain

Version: 1.1
Status: Active

## Purpose
Unlocks Domain defines the server-authoritative model for player unlocks, including characters, cosmetics, weapons, abilities, feature gates, and reward-driven unlocks.

Per ADR-003, gameplay domains must never write unlock state directly. Unlock grants flow through the canonical authority path:

```text
Reward Engine
      ↓
Unlock Service
      ↓
Unlock Repository
      ↓
Supabase
```

## Architecture
Unlocks follow the Repository → Service → API pattern.

### Repository
`unlockRepository.ts` provides persistence-only methods:
- `findAllByPlayerId(playerId)`
- `findByPlayerIdAndKey(playerId, unlockKey)`
- `insertUnlock(record)`

The repository writes only `player_unlocks` and uses idempotent upsert semantics against the `(player_id, unlock_key)` primary key.

### Service
`unlockService.ts` governs domain logic:
- validates trusted unlock grants
- supports unlock categories:
  - `character`
  - `cosmetic`
  - `reward`
  - `weapon`
  - `ability`
  - `feature`
- ensures idempotent unlock grants by returning an existing record when already unlocked
- invokes persistence methods only through the repository
- preserves Reward Engine request metadata for audit context returned to callers

### API
`GET /api/v1/player/unlocks` returns the player’s current unlock list.
- Read-only endpoint; no public POST/PUT is exposed.
- Auth: temporary mock player ID until Supabase Auth integration.

## Reward Engine Integration
Reward Engine handles `unlock` reward entries by calling `unlockService.grantUnlock(...)` with:
- `playerId`
- `unlockKey`
- `unlockType`
- `sourceDomain`
- `sourceReference`
- Reward Engine `requestId`

If the reward entry does not specify `unlockType`, Reward Engine defaults to `reward`. Future reward producers may pass `unlockType` directly or include `unlockType` / `unlock_type` metadata.

Reward Engine request IDs remain the canonical idempotency and audit boundary. Unlock Service also preserves local duplicate protection through the `player_unlocks` primary key.

## Database Schema
`player_unlocks` table (see `0004_phase4_player_unlocks.sql` and `0012_phase12_unlocks_reward_engine.sql`):

| Column | Type | Description |
|---------|------|-------------|
| `player_id` | `uuid` | Foreign key to `players.id` |
| `unlock_key` | `text` | Unique unlock identifier |
| `unlock_type` | `text` | Unlock category such as `character`, `cosmetic`, `reward`, `weapon`, `ability`, or `feature` |
| `granted_at` | `timestamptz` | UTC timestamp |

`PRIMARY KEY (player_id, unlock_key)` prevents duplicate unlock records.

RLS policies:
- players can read their own unlocks
- service-role backend can insert/update unlock records

## Example Response
```json
[
  {
    "player_id": "00000000-0000-0000-0000-000000000001",
    "unlock_key": "hero_knight",
    "unlock_type": "character",
    "granted_at": "2026-07-01T12:00:00Z"
  },
  {
    "player_id": "00000000-0000-0000-0000-000000000001",
    "unlock_key": "cape_blue",
    "unlock_type": "cosmetic",
    "granted_at": "2026-07-01T12:00:00Z"
  }
]
```

## Transactional Limitation
Unlock grants are not yet part of a single database transaction with Reward Engine request/event writes. The current sequence is:
1. Reward Engine validates and records the reward request.
2. Reward Engine calls Unlock Service for unlock rewards.
3. Unlock Service checks for an existing unlock and upserts `player_unlocks`.
4. Reward Engine records reward events and updates request status.

If a failure occurs between these calls, Reward Engine audit records remain the source of truth for request outcome. Full ACID behavior requires a future database RPC/transaction milestone.

## Compliance
- no `any` types
- server-authoritative unlock grants
- Repository → Service → API separation
- Reward Engine is the only reward orchestration layer
- gameplay domains do not directly write unlock state
