# Meshy AI Integration

Version: 1.0
Status: Provider Foundation Implemented (Evaluation-First)

## Purpose
Meshy AI is the future 3D asset generation provider for ZUNO. It is intended
to assist with creating high-quality game assets for:
- weapons
- armor
- gadgets
- NPCs
- creatures
- environment props
- future procedural assets

This integration is **provider/advisory tooling only**. It must not mutate
player gameplay state. Any usage should be treated as offline/asset pipeline
tooling, not runtime actions.

## Official Source / Docs
The actual Meshy API, SDK, and example projects must be referenced from the
official Meshy documentation and repositories.

Important:
- This codebase does **not** guess the Meshy API shape.
- The `meshyClient` adapter is a structural foundation designed to be wired
  to the official Meshy REST/SDK once you run the official examples.
- All current network behavior is stubbed; tests and the smoke script do not
  call the live Meshy API.

## Configuration

Environment variables (read lazily):
- Preferred: `MESHY_AI_API` (canonical Meshy API key)
- Back-compat: `MESHI_AI_API` (legacy spelling used in current `.env.local`)

The adapter resolves:
- `MESHY_AI_API` first
- `MESHI_AI_API` as a fallback

Security:
- The API key must live only in `.env.local` or process environment.
- Never commit production secrets.
- The provider adapter and smoke script never print the API key.

## ZUNO Provider Adapter

File:
- `src/lib/providers/meshy/meshyClient.ts`

Key types:
- `MeshyAssetCategory` — `weapon | armor | gadget | npc | creature | environment_prop`
- `MeshyAssetSpec` — high-level spec with `summary`, `category`, optional `name`, `style`,
  `levelId`, `playerId`, `locale`, and `providerConfig`.
- `MeshyGenerationRequest` — derived request payload (prompt + category + style + config).
- `MeshyGenerationResult` — adapter-level result containing a `jobId` and generated assets.
- `MeshyGeneratedAsset` — individual asset metadata (`id`, `url`, `category`).
- `MeshyHealth` — simple configuration health indicator.

Provider methods:
- `meshyClient.healthCheck()`
  - Validates that a Meshy API key is present (canonical or legacy env var).
  - Does not make network calls; network health checks will be implemented
    once the official Meshy endpoints are wired.
- `meshyClient.generateAsset(spec: MeshyAssetSpec)`
  - Builds a prompt and typed `MeshyGenerationRequest` from the asset spec.
  - Currently returns a stubbed `MeshyGenerationResult` without calling Meshy.
  - Emits structured audit logging via `auditVideoGenerationEvent`.

## Audit Logging

Meshy provider telemetry uses the shared video/asset audit domain:
- File: `src/lib/services/videoGenerationAudit.ts`

Behavior:
- `auditVideoGenerationEvent(...)` logs:
  - provider: `'meshy'`
  - requestId: hardened via `toVideoRequestId(...)`
  - model: optional (undefined until real model IDs are known)
  - levelId, type (category), playerId, locale
  - latencyMs (0 in stub), inputChars, outputChars
- No prompts, raw provider responses, model files, or secrets are logged.
- The log is console-only until a persistence policy is defined.

## Smoke Script

File:
- `scripts/meshy-smoke.mjs`

Behavior:
- Reads `MESHY_AI_API` (preferred) or `MESHI_AI_API` (legacy) from
  environment or `.env.local`.
- Validates that a key is present and prints a confirmation message.
- Does **not** perform a real Meshy generation request yet.
- Prints a clear warning:
  - Any future real Meshy generation from this script may consume credits.
  - The API key value is never printed.

Usage:
- `node scripts/meshy-smoke.mjs`

## Tests

File:
- `src/lib/providers/meshy/meshyClient.test.ts`

Coverage:
- Missing config:
  - `healthCheck()` rejects with `ApiError` when no Meshy env vars are set.
- Valid config:
  - `healthCheck()` resolves `{ ok: true, provider: 'meshy' }` when
    `MESHY_AI_API` is present.
- Request construction + audit:
  - `generateAsset()`
    - Builds an internal request from `MeshyAssetSpec`.
    - Returns a stubbed asset result.
    - Emits a single `[video_generation_audit]` log line with provider `'meshy'`.
    - Verifies that only char counts and metadata are logged (no prompts or secrets).

## Security and Cost

- Meshy API keys must remain in `.env.local` or process env.
- `.env.local` is gitignored; `.env.example` is the only template intended
  for version control.
- Any future real Meshy generation request may consume credits. Smoke scripts
  and tests are structured to avoid accidental live calls.

## Production Recommendation

Once the official Meshy REST/SDK endpoints are wired:
- Use `meshyClient` as the sole integration point from ZUNO.
- Treat Meshy as an asset pipeline tool, not a gameplay mutation service.
- Keep provider telemetry separated from AI Director telemetry.
- Continue to avoid logging prompts, raw responses, or secrets.
