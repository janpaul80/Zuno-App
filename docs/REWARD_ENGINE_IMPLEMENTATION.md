# Reward Engine Implementation Notes

Version: 1.3
Status: Active

## Purpose
This document records the concrete scope of Reward Engine v1 implementation.

## Implemented in v1
- canonical `RewardRequest` validation
- supported reward type validation
- request id idempotency via `reward_requests`
- immutable audit event creation via `reward_events`
- request status tracking (`pending`, `processed`, `failed`, `ignored`)
- future fan-out hooks documented as TODOs
- Economy Service integration for `coins` and `gems`
- Inventory Service integration for `inventory_item`
- Daily Rewards claim integration via canonical `RewardRequest`

## Deferred Beyond v1
- full downstream XP mutation through Progression domain
- unlock persistence execution
- bundle expansion orchestration
- public or player-facing reward mutation API

## Why This Scope
Reward Engine v1 focuses on the durable server-authoritative pipeline:
1. canonical request model
2. idempotency
3. audit trail
4. safe orchestration boundary
5. future hooks for subdomain integration

This keeps the architecture correct before the remaining reward-capable dependencies are fully implemented.

## Economy Integration Rule
Reward Engine does not write balances directly.

Currency rewards flow exclusively through:
Reward Engine → Economy Service → Economy Repository → Database

This preserves Economy v2 as the only balance authority for coins, gems, premium currencies, and future event currencies.

## Inventory Integration Rule
Reward Engine does not write inventory directly.

Item rewards flow exclusively through:
Reward Engine → Inventory Service → Inventory Repository → Database

This preserves Inventory Enhancements v2 as the only authority for inventory grants, removals, stack changes, and inventory transaction records.

## Daily Rewards Integration Rule
Daily Rewards owns eligibility, streak, and claim metadata. After a claim is validated and metadata is persisted, Daily Rewards submits a canonical Reward Engine request using `sourceDomain = daily_rewards` and a stable claim-based `requestId`.

Daily Rewards never writes directly to currency, inventory, XP, or unlock state. Reward execution and audit records flow through Reward Engine and its downstream authority services.

The current integration is still multi-call rather than a single database transaction. If Reward Engine processing fails after Daily Rewards metadata is persisted, the failed reward request remains auditable through Reward Engine records and the stable request ID prevents duplicate reward grants on replay.
