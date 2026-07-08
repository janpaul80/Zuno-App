# AI Director / Game Director

Version: 1.2
Status: Planned (Documentation Only)

## Purpose
ZUNO's AI should become the central Game Director across the whole game.

This is an advisory, narration, and support layer that can guide the player and explain the game, but it must not directly change server-authoritative gameplay state.

## Scope
- level narration
- cinematic narration
- shop guidance
- armor/gadget/weapon recommendations
- health and survival guidance
- player support
- story/lore explanations
- mission briefings
- stuck-player help

## Architecture Rule (Hard Constraint)
- AI may advise, narrate, and guide.
- AI must not directly mutate gameplay state.
- Any reward, purchase, inventory, XP, unlock, or economy mutation must continue to flow through the existing server-authoritative backend services (Reward Engine, Economy v2, Inventory v2, Progression, Unlocks, etc.).

Practical implications:
- AI responses can recommend actions, but the client must still call existing APIs/services to perform gameplay mutations.
- AI can be given read-only, minimal player context (e.g., progression level, owned items) for personalization.
- Any future "AI-triggered" action must be modeled as a normal player or system request, validated server-side, and executed via existing transactional orchestration.

## Story / Lore Direction
- ZUNO Battle is set in Zunlandia.
- The animal warriors are protectors of Zunlandia.
- AI Director behavior should preserve this framing when generating future story, cinematic, level briefing, hint, and support content.
- The AI Director should treat the current asset library as evolving and incomplete.

## Providers / Tools (Planned)
- Langdock AI Pro: primary reasoning/chat layer for the AI Director.
- Voicebox repo: local-first voice cloning / TTS option for narration and character voices.
- open-higgsfield-ai repo: candidate video/cinematic generation pipeline.
- MuAPI: external API used by future pipelines (API key exists in `.env.local`).
- Meshy.ai: 3D asset generation support for cinematic and game content pipelines (API key exists in `.env.local`).

Only provider names and intended uses are documented here. No secrets.

## Security
- Do not commit API keys.
- Keep all provider credentials in environment variables.
- `.env.local` must remain gitignored (only `.env.example` is intended for version control).

## Integration Boundary (Planned)
- The AI Director can be integrated as a chat/narration layer that consumes read-only game state.
- Any user intent that results in gameplay mutation must still call the existing backend services.

## Future Scope
Potential future integrations include:
- contextual game assistant in menus
- support assistant for account and reward troubleshooting
- adaptive level guidance based on player progress
- narrative and cinematic support tooling

See also:
- `docs/LEVEL_CINEMATICS.md`
- `docs/VOICE_PIPELINE.md`
- `docs/VIDEO_GENERATION_PIPELINE.md`

## Implementation Status
- documentation only
- no routes or runtime AI orchestration implemented yet
