# Level Cinematics / Narrative System

Version: 1.3
Status: Architecture Designed (Runtime Foundation Added)

## Vision
Each level should eventually include a structured cinematic and narrative presentation layer to improve onboarding, immersion, and preparation.

ZUNOs AI Director is expected to be the main narrator and guidance layer for mission briefings, stuck-player help, and cinematic narration.

## Game Intro Video / Startup Cinematic
- Current planned startup cinematic asset: `public/video.mp4`.
- The asset is vertical and Android-ready.
- It should eventually play when the user starts the game.
- Playback is not implemented in this backend remediation milestone.

## Cinematic Types
- Intro cinematic (startup)
- Level intro cinematic (briefing)
- Level outro cinematic (completion)
- Mid-level narrative beats (optional)

## Story / Lore Direction
- ZUNO Battle is set in Zunlandia.
- The animal warriors are protectors of Zunlandia.
- This direction should guide future story beats, startup cinematics, level briefings, and mission framing.

## Planned Components Per Level
- 3D cinematic intro
- background music
- character voices
- explanation of the next level
- recommended weapons and tools
- level objective briefing

## AI Director Cinematic Payload (Planned)
Each level should eventually support a cinematic payload with:
- AI narration
- background music
- character dialogue
- mission briefing
- recommended weapons
- recommended gadgets
- recommended armor
- recommended strategy

## Output Targets (Planned)
- Mobile-first video formats (vertical 9:16 preferred for Android)
- Optional alternate aspect ratios for marketing (16:9)
- Subtitles and accessibility-friendly text tracks

## Architectural Direction
- This is a future presentation and narrative system.
- It may consume progression, loadout, and level metadata, but should not become an authority over inventory, economy, or rewards.
- Narrative recommendations should align with player progress and unlocked capabilities.

## Integration Rule (Server Authority)
- Cinematics and narration can recommend tactics, gears, and next steps.
- Cinematics must not cause direct gameplay state mutations.
- Any rewards granted for milestones must route through Reward Engine and existing transactional orchestration.

## Potential Future Integrations
- AI Director for adaptive guidance
- gameplay hint system
- level preparation assistant
- story progression and mission briefings

See also:
- `docs/AI_DIRECTOR.md`
- `docs/VOICE_PIPELINE.md`
- `docs/VIDEO_GENERATION_PIPELINE.md`

## Status
- Phase 1: backend foundation exists for AI Director text guidance.
- Voice/video generation is architecture-only (interfaces exist, not production-enabled).
- current asset library is evolving and incomplete; new assets should be added gradually without deleting unrelated assets during backend milestones
