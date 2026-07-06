# Quests Domain v1

Version: 1.1
Status: Active

## Purpose
Quests Domain v1 tracks server-authoritative quest progress, persists completion and claim state, and submits completed quest rewards to the Reward Engine.

Per ADR-003, Quests does not directly grant or modify currency, XP, inventory items, unlocks, or reward bundles.

## Responsibilities
- expose global quest definitions
- track per-player quest progress
- preserve completion and claim state
- preserve `completed_at` and `claimed_at`
- submit a canonical Reward Engine request when a quest first transitions to completed
- preserve idempotency using stable quest-based Reward Engine request IDs

## Architecture
- **Quest Definitions:** Global immutable metadata tables defining objectives and rewards.
- **Player Quests:** Per-player progress tracking including completion and claim states.
- **Service Layer:** Business logic ensuring server-side validation, progress capping, completion transition handling, and Reward Engine submission.
- **API Layer:** Read-only endpoint returning player quest summary.
- **Reward Execution:** Delegated to Reward Engine only.

## Database Schema

### `quest_definitions`
| Column | Type | Description |
|---------|------|-------------|
| key | TEXT (PK) | Unique quest identifier |
| name | TEXT | Display name |
| description | TEXT | Description for UI |
| target_value | INTEGER | Completion target value (≥1) |
| reward_type | TEXT | Reward type (optional) |
| reward_amount | INTEGER | Reward amount (≥0) |
| created_at | TIMESTAMPTZ | Creation timestamp |

### `player_quests`
| Column | Type | Description |
|---------|------|-------------|
| player_id | UUID FK | References `players(id)` |
| quest_key | TEXT FK | References `quest_definitions(key)` |
| progress | INTEGER | Current progress |
| completed | BOOLEAN | Completion flag |
| claimed | BOOLEAN | Reward claimed flag |
| completed_at | TIMESTAMPTZ | Completion time |
| claimed_at | TIMESTAMPTZ | Claim time |
| updated_at | TIMESTAMPTZ | Last update time |

## API Route

### `GET /api/v1/player/quests`
Read-only endpoint returning active quest definitions and player progress.

**Example Response:**
```json
{
  "definitions": [
    {
      "key": "daily_jump",
      "name": "Daily Jumper",
      "description": "Perform 10 jumps in a day.",
      "target_value": 10,
      "reward_type": "coins",
      "reward_amount": 100,
      "created_at": "2026-07-01T00:00:00Z"
    }
  ],
  "progress": [
    {
      "player_id": "uuid",
      "quest_key": "daily_jump",
      "progress": 7,
      "completed": false,
      "claimed": false,
      "completed_at": null,
      "claimed_at": null,
      "updated_at": "2026-07-01T12:00:00Z"
    }
  ]
}
```

## Reward Engine Integration
When `recordProgress` causes a quest to transition from incomplete to completed, Quests submits a canonical Reward Engine request with:
- `sourceDomain = "quests"`
- `sourceReference = quest key`
- `requestId = "quests:<playerId>:<questKey>"`

The stable request ID ensures the same quest completion reward cannot be granted twice for the same player.

Supported quest reward definitions currently map as follows:
- `coins` → Reward Engine coin reward
- `gems` → Reward Engine gem reward
- `xp` → Reward Engine XP reward

Inventory, unlock, and bundle quest rewards require additional definition metadata before they can be safely mapped and are not introduced in this milestone.

## Claim State
`claimed` and `claimed_at` remain preserved by progress recording. This milestone submits rewards on the first completion transition and does not add a public claim mutation endpoint.

## Transactional Limitation
Quest completion is not yet a single database transaction. The current sequence is:
1. Validate progress increment and quest definition.
2. Persist updated progress/completion/claim metadata.
3. If this is the first completion transition, submit the canonical Reward Engine request.
4. Reward Engine records request and reward event audit rows and routes supported mutations through authoritative downstream services.

If Reward Engine processing fails after completion metadata is persisted, the quest may remain completed while the Reward Engine request records the failure. The stable request ID prevents duplicate reward grants, but full ACID behavior requires a future database transaction/RPC orchestration.

## Compliance
- Quests never writes directly to economy, inventory, XP, or unlock tables.
- Reward execution is delegated to Reward Engine.
- Reward Engine idempotency prevents duplicate processing of the same quest completion request ID.
- No client mutation endpoints are available at this stage.
