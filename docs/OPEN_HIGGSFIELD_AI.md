# Open Higgsfield AI (open-higgsfield-ai)

Version: 1.0
Status: Integrated (Evaluation-First)

Repository (must match exactly):
- https://github.com/thecoldblooded/open-higgsfield-ai

## What It Is
This repository is a browser UI (Vite + Vanilla JS) that wraps the **Muapi.ai** generation API.

In ZUNO, we treat it as **development tooling only**:
- A reference implementation for how to call Muapi.
- A workflow playground for designers/engineers.

The production integration is MuAPI itself, implemented in the
`higgsfieldClient` provider adapter. ZUNO does **not** embed or vendor
this UI at runtime.

## Architecture (From Repo)
- Type: Vite web app (not a server API)
- Runtime generation: Calls Muapi.ai over HTTPS
- Auth: `x-api-key` header
- Flow:
  1. Submit: `POST /api/v1/{endpoint}` (returns `request_id`)
  2. Poll: `GET /api/v1/predictions/{request_id}/result` until `completed`

Implication for ZUNO:
- The "Higgsfield" provider is effectively a **Muapi adapter**.

## Local Evaluation (Outside ZUNO)
Clone outside the ZUNO repo:

```bash
git clone https://github.com/thecoldblooded/open-higgsfield-ai
cd open-higgsfield-ai

npm ci
npm run dev
```

Expected:
- Dev server starts and serves `http://localhost:5173/`.

Optional production build:

```bash
npm run build

# Note: this repo's `npm run preview` appears misconfigured.
# Use Vite directly:
npx vite preview --host 127.0.0.1 --port 5175 --strictPort
```

## ZUNO Configuration
ZUNO integrates Muapi via environment variables.

Required:
- `MUAPI_API`: Muapi API key (must live only in `.env.local` or process env; never commit)

Optional:
- `MUAPI_BASE_URL`: defaults to `https://api.muapi.ai`
- `MUAPI_T2V_ENDPOINT`: defaults to `seedance-lite-t2v`

Back-compat:
- `HIGGSFIELD_API_KEY` is accepted if `MUAPI_API` is not set.
- `HIGGSFIELD_BASE_URL` is accepted if `MUAPI_BASE_URL` is not set.

## Provider Integration
Files:
- `src/lib/config/aiProviders.ts`: `getHiggsfieldConfig()` now reads `MUAPI_API` + `MUAPI_BASE_URL`.
- `src/lib/providers/higgsfield/higgsfieldClient.ts`: implements Muapi submit+poll to return a `videoUrl`.

Added capabilities (MuAPI as production provider):
- `higgsfieldClient.healthCheck()`:
  - Validates configuration is present.
  - Returns `{ ok: true, provider: 'muapi', baseUrl }`.
- `higgsfieldClient.generateCinematic(...)`:
  - Builds a typed MuAPI text-to-video request from a cinematic spec.
  - Submits to MuAPI and polls results until completion or timeout.
  - Emits structured audit logs without including prompts or API keys.

## Smoke Test Script (ZUNO)
This script performs an example generation request via Muapi.

Command:
- `node scripts/muapi-smoke.mjs`

Notes:
- Requires `MUAPI_API` in `.env.local` or environment.
- May consume credits.
- Does not print secrets.

## Limitations
- The upstream repo is not an API service; it is only a UI.
- Muapi does not document a stable public health endpoint; ZUNO health check is config-only.
- The upstream repo's `npm run preview` script is broken (it passes extra positional args to Vite). Use `npx vite preview ...`.
- Our current ZUNO implementation uses JSON-stringified `spec` as the prompt. A richer mapping should be defined in a dedicated cinematic spec contract.

## Recommended Production Architecture
1. ZUNO Backend:
   - Keeps provider adapters server-side.
   - Generates a validated cinematic spec (read-only AI Director output).
2. Muapi Adapter Service (optional):
   - Centralize retries, idempotency, and rate limiting.
   - Store an audit trail and map request IDs to assets.
3. Asset Storage/CDN:
   - Persist final video output to S3/R2 + CDN.
   - Serve by `levelId` + locale rather than regenerating per request.

Security:
- Never commit or log API keys.
