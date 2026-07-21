# Level Cinematics and Narrative System

Version: 2.0
Status: Runtime Player and Mission Catalogue Implemented; Production Media Pending

## Required experience

ZUNO has one game-introduction cinematic and an intro cinematic for every
mission. Each movie identifies the location, enemy force, protection target,
objective, stakes, and Guardian assignment before combat. Movies include music,
narration, character voices where appropriate, and subtitles.

The runtime flow is:

`roadmap → written briefing → cinematic (watch/replay/skip) → loadout → mission`

Missing video never blocks the mission; the reviewed written briefing remains.

## Runtime media contract

- game delivery: 16:9 landscape MP4, H.264 + AAC, 1280x720 or 1920x1080
- master: 1920x1080, 24/30 FPS, constant frame rate
- marketing derivative: optional 9:16 cut, never used as the landscape game master
- localized subtitles: reviewed WebVTT source; burned text is prohibited in masters
- accessibility: captions, replay, skip, separate volume controls, reduced motion
- asset address: stable mission id + locale + cinematic revision
- large campaigns: CDN/Addressables or Play Asset Delivery rather than uncontrolled base APK growth

Unity's first runtime implementation resolves approved development packages from
`Assets/StreamingAssets/Zuno/Cinematics`. Production delivery will move to a
versioned remote catalogue after offline and integrity behavior is implemented.

## Generation and approval flow

1. Canonical mission data supplies lore, enemies, protection target, and reward candidate.
2. Mastra orchestrates a structured briefing and shot plan using Logicc.
3. If explicitly enabled, Langdock may retry a failed Logicc inference.
4. Blackbox produces concept frames/storyboards and selected video candidates.
5. Meshy supplies 3D candidates; production artists preserve approved identity, topology, rigs, materials, and LODs.
6. Voicebox generates local narration and character stems from approved scripts and licensed/consented voices.
7. Original or commercially licensed music and sound design are mixed with the voices.
8. Editors assemble, subtitle, review, checksum, and publish the approved package.

AI providers never grant rewards or change game state. Raw generated output is
not a production asset until it passes creative, legal, technical, and mobile
performance review.

See `docs/ZUNO_GAME_PRODUCTION_ROADMAP.md` and `docs/VOICE_PIPELINE.md`.
