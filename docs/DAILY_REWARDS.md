# Daily Rewards Domain v1

Version: 1.0
Status: Active

## Purpose
Daily Rewards Domain v1 determines daily claim eligibility, maintains streak metadata, records claim history, exposes reward definitions, and prepares a future Reward Engine request.

Per ADR-003, Daily Rewards does not directly grant currency, XP, inventory items, unlocks, or reward bundles.

## Responsibilities
- determine daily claim eligibility
- maintain streak progression metadata
- record daily reward claim history
- expose pending reward definitions
- prepare Reward Engine request payloads
- defer reward granting to Reward Engine v1

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
Returns eligibility, streak metadata, pending reward definition, and a future reward request payload.

### POST /api/v1/player/daily-reward/claim
Validates eligibility and records claim metadata only. No reward mutation is performed.

## Future Integration
Daily Rewards is responsible only for eligibility and claim tracking.

Reward distribution will be delegated entirely to Reward Engine v1 under ADR-003.

## Reward Engine Integration
TODO: submit validated reward requests to Reward Engine v1 once available.
