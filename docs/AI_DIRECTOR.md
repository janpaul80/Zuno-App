
# AI Director / Game Director

Version: 1.4
Status: Phase 2 In Progress (Context + Safety Hardening)

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
- The animal warriors are the Guardians of Zunlandia.
- The AI Director is the central intelligence that guides every Guardian throughout the journey.
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

## Runtime Backend (Phase 1)
Phase 1 adds the backend foundation for a Director chat endpoint.

Route:
- `POST /api/v1/ai/director/message`

Flow (read-only + advisory):
- API → `aiDirectorService` (read-only context assembly) → Langdock (LLM).
- No gameplay mutations are permitted.

Important:
- The AI response is guidance only.
- Purchases, rewards, inventory, XP, unlocks, and progression must continue to be executed via the existing authoritative API/services.

## Provider Integration: Langdock (Verified)
This project uses **Langdock's OpenAI-compatible API**.

Adapter:
- `src/lib/providers/langdock/langdockClient.ts`

Environment variables supported (read lazily; only required when the AI Director endpoint is exercised):
- `LANGDOCK_API_KEY` or `LANGDOCK_API_CODE`
- `LANGDOCK_BASE_URL` or `LANGDOCK_ENDPOINT_URL`
- `LANGDOCK_MODEL` or `MODEL`

Verified behavior:
- Authentication: `Authorization: Bearer <key>`
- Endpoint: `${BASE_URL}/chat/completions` (where `BASE_URL` typically already contains `/v1`)
- Response: standard OpenAI-style `choices[0].message.content`

Local smoke test helper (reads `.env.local`, sends a single request, prints status + first ~900 chars of response):
- `scripts/langdock-smoke.mjs`

Limitations / Notes:
- Node cannot import the TypeScript adapter directly without a TS runtime. The smoke script is the simplest live test.
- Do not log or commit the API key.

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
- Phase 1: a minimal runtime foundation exists for text replies.
- Voice + video remain architecture-only (see related docs).
