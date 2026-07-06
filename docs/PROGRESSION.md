# Player Progression – Domain v2

Version: 2.0
Status: Active

## Overview
Progression Domain v2 is the server-authoritative XP and level authority for ZUNO Battle.

XP rewards now flow through the canonical ADR-003 path:

```text
Reward Engine
     ↓
Progression Service
     ↓
Progression Repository
     ↓
Supabase
```

Gameplay domains must never directly modify XP, levels, or progression thresholds. They may only emit Reward Engine requests that contain XP rewards.

## Authority Rules
- Progression Service is the only application service allowed to modify XP and player levels.
- Reward Engine is the only orchestrator allowed to call trusted XP grants.
- Gameplay domains such as Daily Rewards, Achievements, and Quests submit `RewardRequest` payloads instead of modifying progression directly.
- Player/client code may read progression state in a future API route, but cannot write it.

## Database
### `player_progression`
- `player_id` — primary key, references `players(id)`
- `level` — current player level, minimum 1
- `xp` — current carried XP toward the next level, minimum 0
- `xp_to_next` — XP required for the next level, minimum 1
- `updated_at`
- `created_at`

RLS allows players to read their own progression and restricts writes to the service-role backend.

## Formula
- Base XP to next level: `100`.
- Growth rate: `1.2` per level.
- XP required for level `n`: `floor(100 × 1.2^(n−1))`.

## Level-Up Rules
1. Progression Service validates that XP grant amounts are positive.
2. The service loads or initializes the player's progression record.
3. XP is added to the carried XP total.
4. While `xp >= xp_to_next`, the player levels up.
5. Extra XP beyond the threshold carries over to the next level.
6. `level`, carried `xp`, `xp_to_next`, and `updated_at` are persisted together.

## Initialization
If no progression record exists, the server initializes it as:

```json
{
  "level": 1,
  "xp": 0,
  "xp_to_next": 100,
  "updated_at": "UTC timestamp"
}
```

## Reward Engine Integration
Reward Engine handles XP rewards by calling `progressionService.grantXp(...)` with:
- `playerId`
- positive XP `amount`
- `sourceDomain`
- `sourceReference`
- Reward Engine `requestId`

Reward Engine request IDs preserve idempotency for XP grants. Progression Service does not independently deduplicate grants; it trusts Reward Engine to perform canonical request-level idempotency.

## Transactional Limitation
XP grant processing is not yet a single database transaction with Reward Engine request/event writes. The current sequence is:
1. Reward Engine validates and records the reward request.
2. Reward Engine calls Progression Service for XP rewards.
3. Progression Service reads and upserts `player_progression`.
4. Reward Engine records reward events and updates request status.

If a failure occurs between these calls, Reward Engine audit records remain the source of truth for the request outcome. Full ACID behavior requires a future database RPC/transaction milestone.

## Legacy Note
Older player profile rows include `level` and `experience` columns. Progression v2 uses `player_progression` as the authoritative XP/level table for Reward Engine grants. Legacy profile fields should not be used as authoritative progression mutation targets.

## Future Enhancements
- Progression read API alignment with `player_progression`
- XP multiplier effects such as boosts and live events
- progression transaction ledger if separate XP audit detail is needed beyond Reward Engine records
- level-based unlock hooks through Reward Engine / Unlock Service
