# Level Cinematics / Narrative System

Version: 1.1
Status: Planned

## Vision
Each level should eventually include a structured cinematic and narrative presentation layer to improve onboarding, immersion, and preparation.

## Game Intro Video / Startup Cinematic
- Current planned startup cinematic asset: `public/video.mp4`.
- The asset is vertical and Android-ready.
- It should eventually play when the user starts the game.
- Playback is not implemented in this backend remediation milestone.

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

## Architectural Direction
- This is a future presentation and narrative system.
- It may consume progression, loadout, and level metadata, but should not become an authority over inventory, economy, or rewards.
- Narrative recommendations should align with player progress and unlocked capabilities.

## Potential Future Integrations
- AI Director for adaptive guidance
- gameplay hint system
- level preparation assistant
- story progression and mission briefings

## Status
- documentation only
- no runtime cinematic orchestration implemented yet
- current asset library is evolving and incomplete; new assets should be added gradually without deleting unrelated assets during backend milestones
