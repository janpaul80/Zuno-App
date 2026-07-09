# Video Generation Pipeline (Cinematics)

Version: 1.2
Status: Architecture Designed (MuAPI Adapter Implemented)

## Purpose
Document the planned pipeline for generating and assembling cinematics (intro cinematic, level briefings, and narrative beats).

This is planning-only. Do not implement runtime video generation or integrations yet.

## Core Constraint
Video generation is presentation-only.

No video toolchain may directly mutate gameplay state. Rewards and gameplay changes remain server-authoritative and must flow through existing backend services.

## Candidate Tools / Providers
- open-higgsfield-ai repo:
  - **Development UI only**.
  - Used as a reference workflow for calling MuAPI.
- MuAPI (production):
  - External API used by the ZUNO backend.
  - Integrated via the `higgsfieldClient` provider adapter.
  - API key exists in `.env.local` (do not commit).
- Meshy AI:
  - 3D asset generation provider used by future pipelines.
  - Integrated via `meshyClient` for asset tooling (not runtime mutation).
  - API key exists in `.env.local` (do not commit).
- Meshy.ai:
  - Potential 3D asset generation.
  - API key exists in `.env.local` (do not commit).

## Open Higgsfield Integration Status
We evaluated and integrated `open-higgsfield-ai` strictly as a reference UI over Muapi.

- The upstream project is a Vite web UI, not a server API.
- ZUNO integrates Muapi directly via `higgsfieldClient`.
- See: `docs/OPEN_HIGGSFIELD_AI.md`

## Pipeline Stages (Planned)
1. Narrative plan
   - Define: intro beats, level objective, stakes, recommended loadout.
   - Primary source: AI Director (Langdock AI Pro), planning-only.

2. Script + storyboard
   - Output: text script and a shot list.
   - Include: model/scene references, transitions, duration estimates.

3. Asset sourcing
   - 3D: Meshy.ai-assisted workflow (future).
   - Audio: Voice Pipeline output.
   - Music/SFX: curated library (future).

4. Video assembly
   - Compile clips to target format.
   - Add subtitles.
   - Add logo/title cards.

5. Export + packaging
   - Output to `public/` or CDN-backed storage (future decision).
   - Maintain versioned naming per level.

## Output Targets
- Primary: vertical 9:16 (Android-first)
- Secondary: 16:9 for marketing
- Caption track: WebVTT

## Security
- Do not commit API keys.
- Keep `.env.local` gitignored.
- Only document provider names and intended uses.

## Related Docs
- `docs/LEVEL_CINEMATICS.md`
- `docs/VOICE_PIPELINE.md`
- `docs/AI_DIRECTOR.md`

## Existing Asset
The current shipped intro video is:
- `public/video.mp4` (vertical)

## Backend Integration (Planned)
Phase 1 introduces provider interfaces only.

Planned backend interfaces:
- `src/lib/providers/higgsfield/higgsfieldClient.ts`:
  - `generateCinematic({ type, levelId?, spec, requestId? })`
- `src/lib/config/aiProviders.ts`:
  - `HIGGSFIELD_API_KEY`
  - `HIGGSFIELD_BASE_URL`

Future runtime behavior (high-level):
1. AI Director produces a cinematic spec:
   - mission briefing
   - recommended weapons/gadgets/armor
   - strategy
   - narrator + NPC dialogue script
2. Voice pipeline generates audio tracks.
3. Higgsfield generates video clips or an assembled cinematic.
4. The game streams a finalized asset by level + locale.
