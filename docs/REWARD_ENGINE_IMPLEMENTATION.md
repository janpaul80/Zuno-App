# Reward Engine Implementation Notes

Version: 1.0
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

## Deferred Beyond v1
- full downstream Economy integration
- XP mutation through Progression domain
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

This keeps the architecture correct before Economy v2 and the remaining reward-capable dependencies are fully implemented.
