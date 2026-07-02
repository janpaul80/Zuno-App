# AI Director / Game Assistant

Version: 1.0
Status: Planned

## Purpose
Langdock AI Pro will be the main AI layer for ZUNO Battle and will support player-facing assistance systems without directly changing authoritative gameplay state.

## Planned Responsibilities
- in-game help chat
- level guidance
- stuck-player assistance
- purchase and reward questions
- coin and reward troubleshooting
- level preparation advice
- character and gameplay guidance

## Architecture Direction
- AI Director is a future advisory layer, not a gameplay authority.
- It must not directly mutate currency, XP, inventory, unlocks, or progression.
- It should consume safe backend data and produce guidance, explanations, and support responses.
- Any future reward or economy actions remain governed by ADR-003 and the Reward Engine.

## Provider
- Primary AI provider: Langdock AI Pro
- Credentials must be environment-managed and never committed.

## Future Scope
Potential future integrations include:
- contextual game assistant in menus
- support assistant for account and reward troubleshooting
- adaptive level guidance based on player progress
- narrative and cinematic support tooling

## Implementation Status
- documentation only
- no routes or runtime AI orchestration implemented yet
