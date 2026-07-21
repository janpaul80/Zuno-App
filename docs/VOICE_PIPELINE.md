# Voice Pipeline — Narration and Character Voices

Version: 2.0
Status: Voicebox REST Adapter Implemented; Local Service and Approved Profiles Required

## Provider lock

ZUNO uses the open-source, local-first `jamiepine/voicebox` project for offline
voice production. It exposes REST and WebSocket APIs; ZUNO uses `POST /generate`
through the server-side `voiceboxClient` adapter. The default local service is
`http://127.0.0.1:17493`.

Source and documentation:

- https://github.com/jamiepine/voicebox
- https://docs.voicebox.sh/

Voicebox is not bundled in the APK and is not called by players' devices.
Generated, reviewed audio files are shipped or downloaded as content assets.

## Configuration

- `VOICEBOX_BASE_URL`
- `VOICEBOX_NARRATOR_PROFILE_ID`
- `VOICEBOX_MISSION_PROFILE_ID`
- `VOICEBOX_CINEMATIC_PROFILE_ID`
- `VOICEBOX_NPC_PROFILE_ID`

Voice profiles require documented ownership, actor consent, and commercial-use
rights. No real person's voice may be cloned without explicit written consent.

## Production stages

1. Mastra + Logicc generate a structured draft from canonical mission data.
2. A human approves lore, names, pronunciation, pacing, and content rating.
3. Voicebox generates separate 48 kHz WAV stems per narrator/character line.
4. Editors trim silence, remove artifacts, normalize dialogue, and approve takes.
5. Music and SFX are mixed with side-chain ducking under dialogue.
6. The final MP4 and subtitle timing are checked against the approved script.
7. Masters, delivery files, consent records, and checksums enter asset provenance.

Voice output is presentation-only and cannot mutate gameplay or economy state.
