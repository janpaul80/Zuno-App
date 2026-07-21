# ZUNO Battle Production Roadmap

Version: 1.1
Owner: Paul-Hartmann LLC
Primary product: 3D Android game (APK/AAB)
Status: Active

## Product promise

ZUNO Battle is a close, readable third-person 3D action game. The player must
clearly see the active Guardian punch, kick, jump, swing weapons, fire energy
weapons, take damage, and fight groups of corrupted animal enemies. The camera
may never make characters look like tiny insects on the screen.

Every mission answers four questions before combat begins:

1. What part of Zunlandia is in danger?
2. Who is attacking it?
3. What must the Guardian protect or restore?
4. Which loadout and tactics fit the mission?

## Player flow

`Zunlandia roadmap → cinematic briefing → loadout preparation → 3D battle → mission result → server-validated rewards`

The player can replay a cinematic, read subtitles, skip it, and continue when a
video package is unavailable. Cinematics never block deterministic gameplay.

## Mission roadmap

| # | Difficulty | Mission | Protect | Enemies | Potential coins |
|---:|---|---|---|---|---:|
| 1 | Scout / Easy | Grasslands | Heartwood Beacon | Corrupted Constructs | 300 |
| 2 | Scout / Easy | Crystal River | Watersong Springs | Rift Stalkers | 450 |
| 3 | Scout / Easy | Sky Canyon | Wind Shrine | Talon Raiders | 600 |
| 4 | Guardian / Medium | Ember Volcano | Sunforge Core | Magma Beasts | 850 |
| 5 | Guardian / Medium | Shadow Temple | Memory Archive | Shade Clan | 1,000 |
| 6 | Guardian / Medium | Frozen Rift | Northlight Gate | Ice Ravagers | 1,200 |
| 7 | Legend / Hard | Chaos Dimension | Reality Anchor | Chaosborn | 1,600 |
| 8 | Legend / Hard | Neon Abyss | Lumen Conduit | Abyss Hunters | 2,000 |
| 9 | Legend / Hard | Titan Arena | Crown of Zunlandia | Corrupted Armies | 2,500 |

Coin values are balance candidates. The Unity client may display them but never
grants them. Reward Engine validates mission results and remains the authority.

## Cinematic package per mission

Every mission ships an approved package with:

- 16:9 landscape opening movie for the in-game player
- final Guardian and enemy models matching gameplay assets
- narrated mission script and character dialogue
- composed or properly licensed music, sound design, and final mix
- enemy, objective, protection target, and stakes shown on screen
- WebVTT/localized subtitle source and readable briefing fallback
- skip, replay, captions, volume, and reduced-motion behavior
- asset provenance, provider job IDs, approvals, and checksums

The startup cinematic introduces Zunlandia, the Guardians, the Corruption, and
the player's duty. Mission outro movies are added after intro quality is locked.

## Provider responsibilities

| System | Production role | Runtime rule |
|---|---|---|
| Mastra | Orchestrates structured AI Director work | Server only; never combat authority |
| Logicc | Primary story, briefing, and narration inference | Server only |
| Langdock | Explicitly enabled Logicc failover | Never activated merely because a key exists |
| Meshy | 3D preview/refine generation for characters, creatures, weapons, armor, and props | Offline production only; output must be retopologized, rigged, reviewed, and optimized |
| Blackbox AI | Image concepts, storyboards, and selected generated video shots | Offline production only; cannot silently redesign approved characters |
| Voicebox | Local open-source narration and character speech generation | Local production service; audio files ship, Voicebox does not |
| Unity | Final gameplay, real-time 3D presentation, animation, VFX, audio, and cinematic playback | Deterministic client; no provider secrets |

Music is not a Voicebox responsibility. Music must be original, commissioned,
or licensed for commercial game use, with proof retained in asset provenance.
Free and paid source candidates are governed by `docs/MUSIC_PIPELINE.md` and
`docs/music-source-register.json`; being listed is not approval to ship a track.

## Mobile combat and presentation requirements

- landscape orientation and a guided third-person camera
- Guardian occupies a readable portion of the screen during battle
- customizable virtual movement stick and visible action buttons
- punch, kick, jump, land, dash, dodge, melee, ranged, hit, defeat, and victory animation states
- visible health, mission objective, weapon, ammunition, armor, gadget, coins, and cooldowns
- tap-to-switch loadout preparation and quick weapon switching during combat
- multiple opponents with readable attack tells, hit reactions, and crowd spacing
- melee weapons plus ranged blue-energy weapons with clear impact feedback
- 60 FPS target on representative mid-range Android hardware
- scalable quality, LODs, baked lighting where appropriate, and memory budgets

## Delivery phases

### M0 — Foundation (complete at code level)

- Unity Android/URP project
- Grasslands greybox mission
- movement, jump, dash, melee, enemies, health, objective, and touch controls
- Mastra/Logicc AI Director boundary

### M1 — Mission shell and combat readability (current)

- nine-mission roadmap data
- cinematic-capable briefing flow
- visible equipment HUD and coin candidate display
- energy blade and blue-pulse ranged prototype
- Voicebox, Blackbox, Meshy, and Langdock failover provider contracts

Exit gate: Unity compile, EditMode tests, Android APK, and on-device control/camera review.

### M2 — Aelis production character

- approved Aelis model and identity sheet
- mobile topology, UV/PBR materials, humanoid rig, LODs, and prefab
- full locomotion and combat Animator graph
- punches, kicks, jump, dash, blade, blaster, hit, defeat, and victory
- first production VFX, haptics, sound effects, and camera shake

### M3 — Grasslands production mission

- modular environment kit, lighting, vegetation, props, and optimized enemies
- startup and Grasslands intro cinematic with narration, music, subtitles, and skip/replay
- approved Grasslands music palette with source license, attribution, checksums, mixer routing, and Android listening test
- loadout preparation screen, weapon quick-switch, armor/gadget behavior
- coins as visible pickups with server-authoritative mission settlement
- performance profiles tested on at least low, mid, and high Android tiers

### M4 — Content pipeline and Scout campaign

- repeatable asset intake with checksums and approvals
- Crystal River and Sky Canyon production missions
- cinematic packages for all three Scout missions
- checkpoints, tutorials, accessibility, difficulty assists, and cloud sync

### M5 — Guardian campaign

- Ember Volcano, Shadow Temple, and Frozen Rift
- expanded enemy families, boss encounters, equipment, and tactics
- cinematics, localized narration, music, subtitles, and reward tuning

### M6 — Legend campaign and release candidate

- Chaos Dimension, Neon Abyss, and Titan Arena
- final campaign cinematics and ending
- security, economy, achievements, progression, telemetry, crash handling
- IARC/ESRB/PEGI rating submission, store assets, privacy disclosures, signing, and staged release

## Non-negotiable quality gates

- No final label on greybox or unreviewed generated assets.
- No provider credentials in Unity, APK, AAB, source control, logs, or videos.
- No official age-rating logo before the rating authority grants it.
- No gore, dismemberment, or realistic animal suffering in the target 13+ content profile.
- No coin, inventory, XP, or unlock authority in the client.
- No cinematic accepted if its Guardian identity drifts from the approved game model.
- No mission accepted without on-device camera, control, frame-time, memory, audio, and readability review.
- Every completed and verified repository change is committed and pushed to GitHub.

© 2026 Paul-Hartmann LLC. All rights reserved.
