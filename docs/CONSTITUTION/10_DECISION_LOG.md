# 10_DECISION_LOG.md

## Decision 2026‑07‑01 — Reward Engine & Economy Authority

**Resolution:**
Formally adopt a centralized Reward Engine and Economy Authority system as the backbone of ZUNO’s backend economy management.

**Rationale:**
To eliminate fragmented reward logic, reduce duplication, and ensure uniform auditability for every reward transaction—thereby strengthening server‑authoritative integrity across all gameplay domains.

**Decisions:**
1. The Reward Engine is created as the single entrypoint for XP, currency, inventory, unlock, and bundle rewards.
2. Gameplay domains emit Reward Requests validated and processed through the Reward Engine only.
3. The Economy Domain v2 records every balance change as a transaction with metadata (source, reason, amount, timestamp, player ID, request ID).
4. All reward or economy mutations must flow through the canonical architecture defined in **02_ARCHITECTURE.md**.
5. The change is reflected in **03_ENGINEERING_STANDARDS.md** and **05_BACKEND_ROADMAP.md** for enforcement.
6. Code reviews and CI gates are now required to test for architecture‑compliance.

**Impact:**
- Standardizes reward and economy mutations across domains.
- Lays foundation for future Economy v2 ledger and Ledger Dashboard audit systems.
- Affects all future milestones (Daily Rewards v1 onward).

**Cross‑Refs:**
Refer to **02_ARCHITECTURE.md** for the canonical system diagram and **CHANGELOG.md v1.1** for implementation summary.

**Recorded By:** ZUNO Governance Council / AI Architect

---

## ADR-004 — 2026-07-21 — Mastra-Owned AI Director with Logicc Inference

**Status:** Accepted for Phase 6.1 implementation; production activation remains subject to verification and merge approval.

**Resolution:**
Adopt Mastra as the AI Director orchestration runtime and Logicc as its explicit default inference provider.

**Decisions:**
1. The AI Director executes through a tool-less Mastra Agent using `Agent.generate()`.
2. The Phase 6.1 Agent has no gameplay, mutation, workspace, browser, or memory tools.
3. Logicc is configured through Mastra's supported OpenAI-compatible model contract.
4. Langdock credentials alone never authorize fallback. Any future fallback must be explicitly configured, documented, and tested.
5. Player state crosses into the AI subsystem only through a read-only JSON snapshot.
6. AI output is validated with the canonical `AiDirectorModelResponseSchema`; raw model text is never trusted as a player response.
7. AI orchestration remains advisory and cannot bypass Reward Engine, Economy, Inventory, Progression, Unlock, or other server-authoritative services.
8. Audit metadata distinguishes `runtime: 'mastra'` from the inference provider and excludes prompts, snapshots, credentials, raw responses, and raw exceptions.

**Rationale:**
This keeps provider inference behind a verifiable orchestration boundary while preserving ZUNO's server-authoritative gameplay architecture and allowing future narration capabilities without giving the model mutation authority.

**Cross-Refs:**
- `docs/AI_DIRECTOR.md`
- `docs/AI_DIRECTOR_BACKEND_PLAN.md`
- `docs/CONSTITUTION/02_ARCHITECTURE.md`
- `docs/CONSTITUTION/07_SECURITY_MODEL.md`

---

## ADR-005 — 2026-07-21 — Unity Android Client and Offline-First Vertical Slice

**Status:** Accepted.

**Resolution:**
Create the production ZUNO game client in this repository under
`game/Zuno.Unity`, using Unity 6.3 LTS and URP, with Android as the primary
platform. Establish gameplay offline before connecting authoritative services.

**Decisions:**
1. Unity version `6000.3.20f1` is pinned for the first production slice.
2. The Android application ID is `app.zunobattle.game`; external ownership,
   signing, and OAuth registration remain release-gated steps.
3. The first slice is Grasslands: Aelis, guided camera, mobile movement, jump,
   dash, melee combat, corrupted constructs, mission objective, and exit beacon.
4. Economy, inventory, progression, unlock, purchase, and leaderboard state
   remain server-authoritative. The client only submits authenticated intent or
   result candidates to future API adapters.
5. Logicc/Mastra remain advisory presentation services and cannot enter the
   deterministic movement or combat loop.
6. Meshy remains an offline asset-production provider; its credentials and API
   are prohibited from the shipped client.
7. Runtime primitives are labelled greybox bodies, not approved production
   assets. Final assets require provenance, rig, animation, LOD, and mobile
   performance review before replacement.
8. A gameplay system may not depend directly on a final visual prefab. Visuals
   are replaceable children behind stable gameplay components and colliders.

**Rationale:**
The existing repository had a mature service foundation but no Android game
project. A deterministic offline slice creates a testable player experience and
keeps iteration independent from network, provider, and asset-pipeline failures.

**Cross-Refs:**
- `docs/ANDROID_GAME_CLIENT.md`
- `docs/CONSTITUTION/01_PROJECT_VISION.md`
- `docs/CONSTITUTION/06_GAME_DESIGN_PRINCIPLES.md`
- `docs/CONSTITUTION/07_SECURITY_MODEL.md`

---

## ADR-006 — 2026-07-21 — Mission Cinematics, Visible Mobile Loadout, and Provider Failover

**Status:** Accepted.

**Resolution:**
Every ZUNO mission is defined in one canonical catalogue and is introduced by a
cinematic-capable briefing before a readable third-person battle. The mobile HUD
keeps combat controls, health, objective, weapon, ammunition, armor, gadget, and
coin status visible. Provider generation remains an offline production concern.

**Decisions:**
1. The campaign contains nine initial missions across Scout/Easy,
   Guardian/Medium, and Legend/Hard tiers.
2. Every mission identifies enemies, protection target, objective, potential
   coin reward, and stable cinematic asset name.
3. Runtime movies are 16:9 landscape with written fallback, replay/skip, and
   future localized subtitles; marketing may derive 9:16 cuts.
4. Mastra orchestrates Logicc as primary inference. Langdock failover requires
   the explicit `AI_DIRECTOR_FALLBACK_PROVIDER=langdock` setting.
5. Meshy, Blackbox, and Voicebox operate server-side or locally during asset
   production. Their credentials, runtimes, and raw output never enter the APK.
6. Generated media requires identity, rights, creative, technical, and Android
   performance approval before it becomes a production asset.
7. The target audience is 13+, but official ESRB/PEGI/IARC badges are prohibited
   until assigned by the applicable rating authority or storefront.
8. ZUNO and its final deliverables are credited to Paul-Hartmann LLC.

**Cross-Refs:**
- `docs/ZUNO_GAME_PRODUCTION_ROADMAP.md`
- `docs/LEVEL_CINEMATICS.md`
- `docs/CONTENT_RATING.md`
- `docs/VOICE_PIPELINE.md`
