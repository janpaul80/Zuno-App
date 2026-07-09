# Voice Pipeline (Narration + Character Voices)

Version: 1.2
Status: Blocked Pending Voicebox Repo Access

## Purpose
Define the planned voice and narration pipeline for ZUNO cinematics and level narration.

This is planning-only. Do not implement runtime voice integration yet.

## Goals
- Provide consistent narration voice(s) for:
  - intro cinematic
  - level briefings
  - stuck-player guidance
  - shop guidance
- Optionally generate character voices for key story beats.
- Keep content generation and asset production decoupled from gameplay mutation.

## Core Constraint
Voice output is presentation-only.

No voice system may directly mutate gameplay state.

## Planned Provider/Tooling
- Voicebox repo:
  - Local-first voice cloning / TTS option.
  - Intended for narration and character voice generation.

## Current Blocker
Voicebox runtime integration is **blocked pending repository access**.

Evidence (as of the last verification attempt):
- `https://github.com/devencornwell/voicebox` returned 404 from this environment.
- `git clone https://github.com/devencornwell/voicebox` failed with "Repository not found".

Until the repository is reachable (public or access granted), ZUNO will keep `voiceboxClient` as a documented placeholder and will not substitute alternate repos/forks.

## Backend Integration (Planned)
The AI Director will generate narration text, but Voicebox will synthesize audio.

Constraints:
- Voice generation is presentation-only.
- Voice generation must never mutate gameplay state.
- No secrets may be hardcoded; configuration lives in `.env.local`.

Planned backend interfaces:
- `src/lib/providers/voicebox/voiceboxClient.ts`:
  - `synthesize({ text, voiceRole, voiceId?, locale?, requestId? })`
- `src/lib/config/aiProviders.ts`:
  - `VOICEBOX_BASE_URL` (local HTTP endpoint)

Voice roles (initial):
- narrator
- npc
- mission
- cinematic

Future multilingual support:
- accept `locale` at the AI Director boundary.
- store or derive voice packs per locale.

## Pipeline Stages (Planned)
1. Script generation
   - Inputs: level metadata, mission goals, player context (read-only), lore constraints.
   - Output: narration script text (and optional per-character lines).
   - Primary generator: AI Director (Langdock AI Pro), planning-only.

2. Safety/edit pass
   - Manual review for lore consistency, tone, and spoilers.
   - Remove any sensitive data.

3. TTS / voice generation
   - Generate audio from approved scripts.
   - Output: WAV (master) and compressed format (AAC/MP3) for mobile.

4. Post-processing
   - Normalize loudness.
   - Trim silence.
   - Optional: background music ducking guidelines.

5. Asset packaging
   - Store in a versioned asset path.
   - Keep stable naming conventions per level and locale.

## Output Formats
- Master: `wav` (48kHz preferred)
- Delivery: `aac` or `mp3` (mobile-friendly)
- Optional: subtitle file `vtt` generated from the final script

## Localization (Future)
- Scripts should be structured to support translation.
- Voice generation can be re-run per locale from translated scripts.

## Security
- Do not commit any API keys.
- Store credentials in environment variables only.
- Document provider names and intended use only.

## Related Docs
- `docs/AI_DIRECTOR.md`
- `docs/LEVEL_CINEMATICS.md`
- `docs/VIDEO_GENERATION_PIPELINE.md`
