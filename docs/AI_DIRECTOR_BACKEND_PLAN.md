# AI Director Backend Plan

Version: 1.1
Status: Phase 6.1 Implementation Candidate

This document defines the AI Director backend architecture and the constraints it must obey.

Phase 1 established the minimal backend foundation. Phase 6.1 moves that endpoint to Mastra orchestration with Logicc inference. Voice and video integrations remain architecture-only.

## 1. AI Director Responsibilities
The AI Director is a player-facing Game Director layer.

Primary responsibilities:
- Level narration and mission briefings
- Cinematic narration and lore framing
- Shop guidance (explaining items, bundles, value)
- Loadout recommendations (armor/gadget/weapon suggestions)
- Health and survival guidance
- Stuck-player assistance (hints, re-approach strategies)
- Player support (account/reward clarity, how systems work)
- Story/lore explanations and continuity

Non-responsibilities:
- The AI Director is not a gameplay authority.
- The AI Director does not decide or apply rewards.
- The AI Director does not directly mutate currency, inventory, XP, progression, unlocks, or purchases.

## 2. What Data The AI May Read
AI should be effective with minimal read-only context.

Allowed read scope (examples):
- Player profile basics:
  - `playerId` (server-derived, not client supplied)
  - display name (if available)
- Progression summary:
  - current level
  - current XP and XP-to-next (or a computed summary)
- Unlock summary:
  - owned unlock keys (optionally filtered per category)
- Inventory summary:
  - owned item counts (aggregated)
  - equipped/selected loadout (if tracked)
- Economy summary:
  - current balances (coins, gems)
  - recent transactions summary (optional)
- Shop catalog snapshot:
  - item names, descriptions, prices
  - bundle contents (if defined)
- Gameplay context provided by the client:
  - current level identifier
  - last failure reason (if known)
  - stuck description (free text)

Data should be provided via a bounded server-controlled "AI context" object rather than exposing raw tables.

## 3. What Data The AI May Not Access
Disallowed categories:
- Secrets:
  - API keys, tokens, credentials (Logicc, Langdock, Supabase service role, Voicebox, MuAPI, Meshy, etc.)
- Raw PII beyond what is required for gameplay:
  - emails, phone numbers, payment data
- Administrative/system state:
  - service role operations
  - internal debug traces containing secrets
- Any direct write-capable data surface:
  - raw repository clients
  - RPC invocations

## 4. Tool / API Boundaries
AI Director should be treated like a separate subsystem.

Architecture boundary:
AI Director
    ↓
Backend API (AI-specific route group)
    ↓
AI Director Service (read-only context assembler + safety)
    ↓
Repositories (read-only queries only)
    ↓
Supabase (RLS-scoped reads)

The inference call is owned by a tool-less Mastra Agent configured with Logicc's OpenAI-compatible endpoint.

Rules:
- Repositories do not call Mastra or an inference provider.
- API routes do not call Mastra or an inference provider directly.
- AI routes must not "reach into" Reward Engine/Economy/Inventory mutation methods.

## 4.1 Phase 6.1 Runtime Endpoint
Route:
- `POST /api/v1/ai/director/message`

Runtime responsibilities:
- Resolve `playerId` via auth at the API boundary.
- Assemble a bounded, server-controlled read-only context.
- Convert the assembled context through a JSON snapshot boundary.
- Call `runAiDirectorWithMastra()` with a cancellation signal.
- Validate the full structured response with `AiDirectorModelResponseSchema`.
- Return a bounded response or a safe troubleshooting fallback.

Explicitly out of scope for Phase 6.1:
- Voice generation (Voicebox integration is interfaces only).
- Cinematic generation (Open Higgsfield integration is interfaces only).
- Persistent chat transcripts/memory or durable agent runs.
- Tool-calling / structured action routing.

## 5. Player Support Flow
Goal: answer player questions and explain systems.

Inputs:
- Player question
- Minimal read-only AI context

Outputs:
- Guidance text (and optionally structured "next steps" suggestions for the UI)

No mutations.

## 6. Shop Guidance Flow
Goal: help a player decide what to buy.

Inputs:
- Shop catalog snapshot
- Player balances
- Owned unlocks/items summary
- Player question ("what should I buy?")

Outputs:
- Recommendations with rationale
- Optional comparison list

Explicit constraint:
- AI may recommend purchases, but the purchase must be executed through existing shop purchase API and transactional orchestration.

## 7. Level Guidance Flow
Goal: help a player beat a level.

Inputs:
- Level identifier
- Player progression + unlocks + loadout summary
- Player stuck description

Outputs:
- Step-by-step hints
- Suggested gear/loadout changes
- Optional "training" checklist

## 8. Purchase / Reward Troubleshooting Flow
Goal: explain what happened when a player thinks a purchase/reward did not apply.

Inputs:
- Stable request identifiers if available:
  - shop purchase idempotency key
  - reward request id (Reward Engine requestId)
- Minimal read-only audit summary:
  - reward request status
  - purchase record presence
  - recent economy/inventory deltas summary

Outputs:
- Explanation
- Clear, actionable support steps

Explicit constraint:
- AI may not retry or replay mutations.
- Any retry is a user-driven action via existing APIs with idempotency.

## 9. Voice And Cinematic Integration Points
The AI Director is expected to generate or assist with:
- narration scripts
- mission briefings
- shot lists / storyboard text

Integration points are offline or pre-production asset generation steps:
- `docs/VOICE_PIPELINE.md`
- `docs/VIDEO_GENERATION_PIPELINE.md`

Runtime playback and asset serving are separate concerns.

## 10. Safety Rules
- No direct mutation rule is absolute.
- Defensive prompt design: instruct the model to provide guidance only.
- Refuse or redirect if asked to perform state changes.
- Avoid hallucinating balances, items, or ownership.
- Prefer using the provided AI context object; if unknown, say unknown.

## 11. Privacy Rules
- Minimize data sent to providers.
- Avoid sending raw logs, error traces, or anything containing secrets.
- Do not store user chat transcripts indefinitely by default (policy TBD).

## 12. Mastra and Logicc Integration Strategy
- Mastra is the orchestration runtime.
- Logicc is the explicit default inference provider.
- The stateless Agent executes directly through Mastra `Agent.generate()` and is configured with no tools.
- Logicc credentials remain server-side environment variables.
- Mastra structured output uses `AiDirectorModelResponseSchema`; raw provider text is never returned to a player.
- Langdock is not selected because credentials happen to exist. Any future fallback requires an explicit, documented configuration and tests.
- Phase 6.1 is stateless and uses no application Mastra storage. Persistent Mastra storage is required before memory or durable runs are enabled.

Failure behavior:
- Context, snapshot, provider, timeout, and invalid-output failures return category `troubleshooting` with a fixed safe reply.
- Audit events contain category, stage, failure kind, provider/runtime identifiers, timing, and character counts only.
- Prompts, snapshots, raw provider output, credentials, and raw exceptions are not included in AI Director audit events.

## 13. MuAPI / Meshy / Voicebox / open-higgsfield Usage Boundaries
These tools are for content pipelines and asset generation, not gameplay mutation.

- MuAPI:
  - Used only by offline pipelines or controlled backend jobs (future)
- Meshy.ai:
  - Used for 3D asset generation support (future)
- Voicebox:
  - Used for local-first TTS/voice cloning (future)
- open-higgsfield-ai:
  - Candidate cinematic generation pipeline (future)

Keys exist in `.env.local` but must never be committed.

## 14. No-Direct-Mutation Rule (Restated)
The AI Director must never directly modify:
- currency
- inventory
- XP
- progression
- unlocks
- purchases
- rewards

Any mutation must go through the existing server-authoritative backend:

AI Director
      ↓
Backend API / Domain Service
      ↓
Reward Engine / Economy / Inventory / Progression / Unlocks
      ↓
Repository
      ↓
Supabase
