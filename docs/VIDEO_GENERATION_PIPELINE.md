# Video Generation Pipeline (Cinematics)

Version: 1.0
Status: Planned (Documentation Only)

## Purpose
Document the planned pipeline for generating and assembling cinematics (intro cinematic, level briefings, and narrative beats).

This is planning-only. Do not implement runtime video generation or integrations yet.

## Core Constraint
Video generation is presentation-only.

No video toolchain may directly mutate gameplay state. Rewards and gameplay changes remain server-authoritative and must flow through existing backend services.

## Candidate Tools / Providers
- open-higgsfield-ai repo:
  - Candidate cinematic generation pipeline.
  - Intended use: generating or assisting with cinematic sequences.
- MuAPI:
  - External API used by future pipeline tooling.
  - API key exists in `.env.local` (do not commit).
- Meshy.ai:
  - Potential 3D asset generation.
  - API key exists in `.env.local` (do not commit).

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
