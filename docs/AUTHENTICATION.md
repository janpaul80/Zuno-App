# Authentication (Supabase)

Version: 1.0
Status: Active

## Overview
All protected backend API routes derive player identity from Supabase Authentication.

- `playerId` is the authenticated Supabase User ID (`auth.users.id`).
- Clients must send an access token on every protected request.
- The backend validates the token server-side and never accepts client-provided `playerId`.

## Client Request Requirements
Protected routes require:

- Header: `Authorization: Bearer <SUPABASE_ACCESS_TOKEN>`

The access token is the Supabase Auth session access token returned to the client after login.

## Server Resolution
The backend resolves player identity using:

- `src/lib/auth/player.ts` → `resolveAuthenticatedPlayerId(req)`

Resolution steps:

1. Read the `Authorization` header.
2. Extract the bearer token.
3. Validate the token with Supabase Auth (`supabaseAuthServer.auth.getUser(token)`).
4. Return `data.user.id` as the canonical `playerId`.

If the token is missing/invalid/expired, the API returns:

- `401 UNAUTHORIZED`

## Service Boundaries (Preserved)
Authentication is performed at the API route boundary.

- API routes: resolve `playerId` from the request session.
- Services: accept `playerId: string` as an input and apply business logic.
- Repositories: persist data scoped to `playerId`.

Domains must not directly read request headers or parse tokens.

## Security Rules
- Service role keys are server-only and must never be transmitted to clients.
- `SUPABASE_SERVICE_ROLE_KEY` must only be used in server contexts.
- RLS (Row Level Security) must restrict player-visible reads/writes by `auth.uid()`.

## Android Google Login Blocker
Android Google login is blocked until Android application identity is finalized.

Required inputs (see `docs/ANDROID_AUTH_NOTES.md`):

- Android package name
- SHA-1 certificate fingerprint
- app ownership confirmation

## Audit: Protected API Routes
The following API routes require:

`Authorization: Bearer <SUPABASE_ACCESS_TOKEN>`

- `POST /api/v1/player/bootstrap`
- `GET /api/v1/player/profile`
- `GET /api/v1/player/currency`
- `GET /api/v1/player/inventory`
- `GET /api/v1/player/unlocks`
- `GET /api/v1/player/quests`
- `GET /api/v1/player/achievements`
- `GET /api/v1/player/daily-reward`
- `POST /api/v1/player/daily-reward/claim`
- `GET /api/v1/player/cloud-save`
- `POST /api/v1/player/cloud-save`
- `POST /api/v1/shop/purchase`
