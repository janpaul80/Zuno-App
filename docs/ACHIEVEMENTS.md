# Achievements Domain v1

Version: 1.1
Status: Active

## Purpose
Achievements Domain v1 tracks server-authoritative achievement progress, persists completion state, and submits completed achievement rewards to the Reward Engine.

Per ADR-003, Achievements does not directly grant or modify currency, XP, inventory items, unlocks, or reward bundles.

## Responsibilities
- expose global achievement definitions
- track per-player achievement progress
- preserve completed achievement state and `completed_at`
- submit a canonical Reward Engine request when an achievement first transitions to completed
- preserve idempotency using stable achievement-based Reward Engine request IDs

## Database
### achievement_definitions
- `key`
- `name`
- `description`
- `target_value`
- `reward_type`
- `reward_amount`
- `created_at`

### player_achievements
- `player_id`
- `achievement_key`
- `progress`
- `completed`
- `completed_at`
- `updated_at`

## API
### `GET /api/v1/player/achievements`
Returns achievement definitions and the player's achievement progress records.

Achievement progress updates are internal trusted server calls. Public/client code does not directly mark achievements complete or grant rewards.

## Reward Engine Integration
When `recordProgress` causes an achievement to transition from incomplete to completed, Achievements submits a canonical Reward Engine request with:
- `sourceDomain = "achievements"`
- `sourceReference = achievement key`
- `requestId = "achievements:<playerId>:<achievementKey>"`

The stable request ID ensures the same achievement reward cannot be granted twice for the same player.

Supported achievement reward definitions currently map as follows:
- `coins` → Reward Engine coin reward
- `gems` → Reward Engine gem reward
- `xp` → Reward Engine XP reward

Inventory, unlock, and bundle achievement rewards require additional definition metadata before they can be safely mapped and are not introduced in this milestone.

## Transactional Limitation
Achievement completion is not yet a single database transaction. The current sequence is:
1. Validate progress increment and achievement definition.
2. Persist updated progress/completion metadata.
3. If this is the first completion transition, submit the canonical Reward Engine request.
4. Reward Engine records request and reward event audit rows and routes supported mutations through authoritative downstream services.

If Reward Engine processing fails after completion metadata is persisted, the achievement may remain completed while the Reward Engine request records the failure. The stable request ID prevents duplicate reward grants, but full ACID behavior requires a future database transaction/RPC orchestration.

## Compliance
- Achievements never writes directly to economy, inventory, XP, or unlock tables.
- Reward execution is delegated to Reward Engine.
- Reward Engine idempotency prevents duplicate processing of the same achievement completion request ID.
