
# AI Director / Game Director

Version: 1.5
Status: Phase 6.1 Implementation Candidate (Mastra + Logicc)

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

## Providers / Tools
- Mastra: orchestration runtime for the AI Director.
- Logicc: explicit default inference provider for the AI Director.
- Langdock: retained as a legacy provider adapter; it is not an implicit AI Director fallback.
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

## Runtime Backend (Phase 6.1)
Phase 6.1 moves the Director chat endpoint onto a Mastra-owned execution path.

Route:
- `POST /api/v1/ai/director/message`

Flow (read-only + advisory):
- API → `aiDirectorService` → JSON snapshot → tool-less Mastra Agent → Logicc.
- No gameplay mutations are permitted.
- The Agent has `tools: {}` and no workspace, browser, memory, or gameplay tools.
- Logicc is configured through Mastra's supported OpenAI-compatible model contract.
- Output is generated and validated with `AiDirectorModelResponseSchema`.
- Player context follows a `JSON.stringify` / `JSON.parse` snapshot boundary and is deeply frozen.
- The request has a 12-second deadline and propagates cancellation to the Logicc HTTP request.

Important:
- The AI response is guidance only.
- Purchases, rewards, inventory, XP, unlocks, and progression must continue to be executed via the existing authoritative API/services.

## Provider Integration: Logicc through Mastra
The AI Director uses Logicc through Mastra's OpenAI-compatible model router.

Runtime:
- `src/mastra/index.ts`

Environment variables:
- `LOGICC_API_KEY`
- `LOGICC_BASE_URL` (API base URL; Mastra appends `/chat/completions`)
- `LOGICC_MODEL` (defaults to `default`)

Audit metadata keeps orchestration and inference separate:
- `runtime: 'mastra'`
- `inferenceProvider: 'logicc' | 'langdock' | 'none'`

The Phase 6.1 AI Director path is Logicc-only. Langdock credentials, `AI_TEXT_PROVIDER`, or other unrelated provider settings do not authorize an implicit switch.

## Legacy Langdock Adapter
The repository still contains a direct Langdock adapter for the earlier Phase 1 path.

Adapter:
- `src/lib/providers/langdock/langdockClient.ts`

Environment variables supported (read lazily; only required when the AI Director endpoint is exercised):
- `LANGDOCK_API_KEY` or `LANGDOCK_API_CODE`
- `LANGDOCK_BASE_URL` or `LANGDOCK_ENDPOINT_URL`
- `LANGDOCK_MODEL` or `MODEL`

Legacy adapter behavior:
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
- Phase 6.1: Mastra-owned, Logicc-backed, tool-less structured response path implemented locally with direct runner and service tests.
- Production activation still requires configured Logicc environment variables and merge/deployment approval.
- Voice + video remain architecture-only (see related docs).
