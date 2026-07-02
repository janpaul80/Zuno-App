# Reward Engine Implementation Notes

Version: 1.1
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

## Deferred Beyond v1
- full downstream XP mutation through Progression domain
- inventory grant execution
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
