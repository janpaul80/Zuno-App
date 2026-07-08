# AI Director Backend Plan

Version: 1.0
Status: Planned (Documentation Only)

This document defines the AI Director backend architecture before implementation.

No runtime AI routes, voice, or video integrations should be implemented in this milestone.

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
  - API keys, tokens, credentials (Langdock, Supabase service role, Voicebox, MuAPI, Meshy, etc.)
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

The AI provider call (Langdock) is performed by the backend service layer.

Rules:
- Repositories do not call Langdock.
- API routes do not call Langdock directly.
- AI routes must not "reach into" Reward Engine/Economy/Inventory mutation methods.

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

## 12. Langdock Integration Strategy (Planned)
- Langdock AI Pro is the primary chat/reasoning layer.
- Backend will manage provider credentials via environment variables.
- Responses should be structured when helpful:
  - `{ message: string, suggestions?: string[], warnings?: string[] }`

No SDK or runtime integration is implemented in this milestone.

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
