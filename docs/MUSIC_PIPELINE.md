# Music Sourcing and Production Pipeline

Version: 1.0
Owner: Paul-Hartmann LLC
Status: Source Register Implemented; Track Selection Pending Creative Approval

## Purpose

ZUNO uses curated music for the startup cinematic, mission briefings, roadmap,
loadout preparation, exploration, combat, victory, defeat, and credits. Free or
royalty-free never means unowned or automatically safe. Every track must be
cleared for a commercial Android game before it is committed to the Unity
project or mixed into a cinematic.

The authoritative source review is `docs/music-source-register.json`. A source
listed there is only a place to evaluate music. It is not permission to ship
every track from that source.

## Source review

| Source | Current classification | ZUNO decision |
|---|---|---|
| YannZ — Indie Meditations | Free, CC BY 4.0; commercial use and attribution stated on the pack page | Approved for audition. `lvl 3 – the grassland` is a strong exploration/briefing candidate, not yet an approved final track. |
| YannZ — Contemplative Fantasy Vol. 1 | Name-your-price; custom attribution license says commercial use is allowed | Approved for audition only after the downloaded `Docs/LICENSE.txt` is archived and reviewed. |
| WOW Sound Starter Pack | Free page, but its license link resolves to CC BY-ND 3.0 | Hold. The product page invites commercial game use, while CC BY-ND 3.0 treats synchronization to moving images as an adaptation. Obtain written clarification or a separate game license before use. |
| WOW Sound paid catalogue | Paid, tiered commercial-game license | Valid paid option after the exact track license and company revenue tier are recorded. Do not use its audio in AI training or generation. |
| Soundstripe | Paid; its Expanded license explicitly covers games, cutscenes, menus, and trailers | Valid paid option only with the game-covering license, not an ordinary free/creator download. |
| AGsoundtrax | Paid royalty-free stock music; game/application rights depend on the selected license | Valid paid option after the exact license certificate is retained. Previews cannot ship. |
| Infinite Lo-Fi | Exact project and license not yet identified | Blocked until a canonical source URL, rights holder, and commercial-game license are verified. |
| Other itch.io/open-source packs | License varies by creator and pack | Evaluate track by track. Prefer CC0 or CC BY 4.0; reject unclear, noncommercial, no-derivatives, or share-alike terms unless legal review approves them. |

## Rights gate

A track may enter an internal candidate build only when the record contains:

- track title, composer/rights holder, and canonical source URL
- download date and the license name/version that applied on that date
- saved license text or certificate and the exact required attribution
- explicit commercial video-game, synchronization, and worldwide distribution rights
- permission for required edits, looping, fades, mixing, and format conversion
- game-streaming and gameplay-video treatment, including Content ID status
- trailer and promotional rights, or an explicit restriction if licensed separately
- SHA-256 checksums for the untouched source and each approved delivery derivative
- creative, legal, and technical approval status

No official soundtrack album is implied by an in-game synchronization license.
OST distribution requires its own recorded right.

## Production flow

1. The audio lead selects watermarked previews or legally available audition files.
2. Paul approves the musical direction and mission placement.
3. The team downloads the final master and license in the name of Paul-Hartmann LLC.
4. The untouched source, license proof, attribution, and checksum enter provenance.
5. The editor creates 48 kHz masters, seamless loops, intensity layers, and stingers as needed.
6. Music and dialogue remain separate during production. Voicebox narration is never baked into the only surviving music master.
7. Unity routes music and narration through separate mixer groups so player volume controls and narration ducking remain available.
8. Cinematic delivery uses the approved mix, while archived stems retain their own checksums and rights records.
9. A representative Android device test checks dialogue clarity, looping, clipping, speaker translation, and transitions.
10. Credits are generated from the accepted-track records; attribution is never reconstructed from memory.

## Creative map

| Experience | Music direction |
|---|---|
| Startup cinematic | Wonder, duty, and danger; orchestral fantasy with a memorable Guardian motif |
| Zunlandia roadmap | Hopeful, spacious, and adventurous; low fatigue during repeated navigation |
| Mission briefing | Location-specific tension under clear narration; restrained low-mid energy |
| Loadout | Tactical pulse with room for UI sounds and equipment previews |
| Exploration | Adaptive regional identity with seamless low-intensity loops |
| Combat | Layered percussion and heroic momentum with readable attack and hit effects |
| Victory / defeat | Short authored stingers that resolve cleanly into the results screen |
| Credits | Emotional return of the Guardian motif, with all licensed contributors credited |

The first audition target is Grasslands: calm wonder for the roadmap and
briefing, then a more energetic organic/percussive battle layer. A cozy track
may support exploration, but it must not weaken the sense of an active battle
for Zunlandia.

## Prohibited shortcuts

- Do not rip audio from YouTube, Spotify, trailers, games, or streaming services.
- Do not treat “royalty-free” as “free of charge” or “free of copyright.”
- Do not ship watermarked previews or files with an unresolved license.
- Do not upload third-party music to an AI system unless its license explicitly permits that use.
- Do not remove embedded metadata when the license requires it to remain intact.
- Do not commit large audition libraries; only approved delivery assets belong in the game repository.

© 2026 Paul-Hartmann LLC. All rights reserved except third-party music retained
under its recorded license.
