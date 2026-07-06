# Daily Rewards Domain v1

Version: 1.1
Status: Active

## Purpose
Daily Rewards Domain v1 determines daily claim eligibility, maintains streak metadata, records claim history, exposes reward definitions, and submits validated reward requests to the Reward Engine after claim metadata is persisted.

Per ADR-003, Daily Rewards does not directly grant or modify currency, XP, inventory items, unlocks, or reward bundles.

## Responsibilities
- determine daily claim eligibility
- maintain streak progression metadata
- record daily reward claim history
- expose pending reward definitions
- create canonical Reward Engine request payloads
- submit eligible claims to Reward Engine v1
- preserve idempotency using stable claim-based Reward Engine request IDs

## Database
### daily_reward_definitions
- day
- reward_type
- reward_amount
- reward_bundle
- created_at

### player_daily_rewards
- player_id
- current_streak
- total_claims
- last_claim_day
- last_claimed_at
- next_eligible_claim_at
- updated_at
- created_at

## API
### GET /api/v1/player/daily-reward
Returns eligibility, streak metadata, pending reward definition, and the next Reward Engine request payload that would be submitted by a valid claim.

### POST /api/v1/player/daily-reward/claim
Validates eligibility, records claim metadata, and submits the validated reward request to Reward Engine v1.

The claim route does not directly grant currency, XP, inventory, unlocks, or bundles. Reward mutation is delegated to Reward Engine, which routes supported downstream reward types through Economy v2 and Inventory v2.

## Reward Engine Integration
Daily Rewards creates a canonical Reward Engine request with:
- `sourceDomain = "daily_rewards"`
- `sourceReference = "daily_reward_day_<day>:claim_<claimNumber>"`
- `requestId = "daily_rewards:<playerId>:claim:<claimNumber>"`

The claim number is derived from `player_daily_rewards.total_claims + 1`, making Reward Engine processing idempotent for a claim attempt.

Supported daily reward definitions map as follows:
- `coins` → Reward Engine coin reward
- `gems` → Reward Engine gem reward
- `xp` → Reward Engine XP reward
- `inventory_item` → Reward Engine inventory item reward using `reward_bundle.itemId` or `reward_bundle.item_id`
- `unlock` → Reward Engine unlock reward using `reward_bundle.unlockKey` or `reward_bundle.unlock_key`
- `bundle` or a null `reward_type` with `reward_bundle` → Reward Engine bundle reward using `reward_bundle.bundleId`, `reward_bundle.bundle_id`, `reward_bundle.id`, or `reward_bundle.key`

## Transactional Limitation
Daily Reward claim processing is not yet a single database transaction. The current sequence is:
1. Validate eligibility.
2. Persist daily reward claim metadata.
3. Submit the canonical Reward Engine request.
4. Reward Engine records request and reward event audit rows and routes supported mutations through authoritative downstream services.

If Reward Engine processing fails after metadata persistence, the claim metadata may already be updated while the Reward Engine records the failed request/audit event. The stable request ID prevents duplicate reward grants, but full ACID behavior requires a future database transaction/RPC orchestration.

## Compliance
- Daily Rewards never writes directly to economy, inventory, XP, or unlock tables.
- Reward execution is delegated to Reward Engine.
- Reward Engine idempotency prevents duplicate processing of the same claim request ID.
