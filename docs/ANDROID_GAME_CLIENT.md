# ZUNO Android Game Client

Version: 1.0
Status: Grasslands Vertical Slice Foundation

## Outcome

ZUNO now has a real Unity game client at `game/Zuno.Unity`. The first milestone
is a playable, offline Grasslands mission that proves the core mobile loop before
backend, AI, narration, and production-asset integration increase the risk and
cost of iteration.

## Engine and platform lock

- Engine: Unity 6.3 LTS (`6000.3.20f1`)
- Rendering: Universal Render Pipeline, mobile profile
- Input: Unity Input System plus runtime touch controls
- Primary platform: Android, landscape
- Android application ID: `app.zunobattle.game`
- Scripting backend: IL2CPP
- Minimum Android API: 24
- Frame target: 60 FPS on mid-range Android hardware
- Memory target: below 512 MB

The application ID is reserved by the project but is not proof of Play Console,
Google OAuth, or signing-key registration. Those external registrations remain
separate release steps.

## First playable slice

The Grasslands slice contains:

- Aelis as the player Guardian (greybox visual body)
- guided third-person camera
- mobile virtual joystick
- jump with coyote time and input buffering
- directional dash with cooldown
- three-hit melee combo
- player/enemy vitality and damage boundaries
- corrupted construct chase and attack behavior
- mission progress requiring three enemy defeats
- exit beacon locked until the objective is satisfied
- health, objective, cooldown, and completion UI
- keyboard/gamepad-friendly Editor controls for rapid iteration

## Architectural boundaries

```text
Touch / keyboard intent
        -> Guardian motor and combat
        -> Local encounter simulation
        -> Mission result candidate
        -> Future authenticated API submission
        -> Backend validation and Reward Engine
```

The Unity client may simulate an offline encounter for responsive gameplay, but
it never becomes authoritative for coins, inventory, unlocks, XP, purchases, or
leaderboard results. No service-role key, Logicc key, Mastra credential, Meshy
credential, or database secret may enter the Unity project.

## Asset-integrity policy

The runtime-generated primitives are explicitly **greybox gameplay bodies**.
They are not final ZUNO character, environment, weapon, marketing, or store
assets. Production visual assets must enter through a reviewed asset intake:

1. approved concept and character identity
2. source/provenance record and license
3. versioned FBX or GLB source plus Unity prefab
4. humanoid/creature rig validation
5. animation, material, texture, and LOD validation
6. Android memory and frame-time budget check
7. replacement of the visual child only; gameplay colliders remain stable

Meshy is an offline asset-production provider, never a runtime dependency.

## Verification commands

Repository-level structure check:

```bash
npm run game:validate
```

Unity EditMode tests:

```bash
Unity -batchmode -projectPath game/Zuno.Unity \
  -runTests -testPlatform EditMode \
  -testResults game/Zuno.Unity/TestResults/editmode.xml -quit
```

Development APK:

```bash
Unity -batchmode -projectPath game/Zuno.Unity \
  -executeMethod Zuno.Editor.ZunoAndroidBuild.BuildDevelopmentApk -quit
```

The development build is unsigned/debug-signed. Production signing must run in
CI from protected secrets and a verified tag.

## Next production milestone

Replace Aelis's greybox visual with the approved rigged model and implement the
animation graph: idle, locomotion, jump, fall, land, three attacks, dash, hit,
knockout, and victory. In parallel, build the Grasslands modular environment kit
and add measured Android performance baselines on at least one mid-range device.
