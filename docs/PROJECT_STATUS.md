# ZUNO Project Status

**Version:** 1.5
**Last Updated:** 2026-07-21

---

## Completed Backend Milestones

| Milestone | Description | Status |
|------------|--------------|--------|
| **ZUNO Constitution v1.1** | Governance frozen; ADR system established; Reward Engine authority codified. | ✅ Completed |
| **Backend Foundation** | Core repository, service, and API architecture setup. | ✅ Completed |
| **Player Domain** | Server-authoritative player profiles and identity management. | ✅ Completed |
| **Shop Domain** | Item shop, purchasing logic, server-controlled economy flow. | ✅ Completed |
| **Cloud Save v1** | Server-controlled client-state synchronization, versioned schema, checksum validation. | ✅ Completed |
| **Progression Domain v2** | Server-authoritative XP grants, level computation, and Reward Engine XP integration. | ✅ Completed |
| **Unlocks Domain v2** | Server-authoritative unlock grants, duplicate protection, category support, and Reward Engine unlock integration. | ✅ Completed |
| **Achievements Domain v1** | Server-authoritative achievement tracking, completion state, progress persistence, and Reward Engine completion submission. | ✅ Completed |
| **Quests Domain v1** | Server-authoritative quest tracking, completion state, claim state preservation, and Reward Engine completion submission. | ✅ Completed |
| **Daily Rewards v1** | Eligibility, streak tracking, claim metadata, and Reward Engine claim submission. | ✅ Completed |
| **Deployment / Docs Readiness** | Deployment domain, AI direction, Android auth notes, Stripe sandbox policy, and cinematic planning documented. | ✅ Completed |
| **Reward Engine Architecture Spec** | Reward Engine blueprint documented before implementation. | ✅ Completed |
| **Reward Engine v1** | Canonical request validation, idempotency, audit trail, and orchestration boundary implemented. | ✅ Completed |
| **Economy v2** | Immutable transaction ledger, wallet authority, and Reward Engine currency integration. | ✅ Completed |
| **Inventory Enhancements v2** | Immutable item ledger, stack support, and Reward Engine inventory integration. | ✅ Completed |
| **Testing Foundation v1** | Vitest + backend unit test foundation (service validation + pure business-rule helpers). | ✅ Completed |
| **AI Director Implementation (Phase 1)** | AI Director backend foundation: read-only context + Langdock provider boundary + advisory endpoint. | ✅ Completed |
| **Unity Android Client Foundation** | Unity 6.3 LTS project, Android build automation, mobile input boundary, gameplay-domain tests, and asset-integrity policy. | ✅ Local foundation completed |

---

## Active Implementation

| Milestone | Description | Status |
|-----------|-------------|--------|
| **AI Director Phase 6.1** | Mastra-owned, tool-less Agent; Logicc inference; JSON snapshots; strict structured output; cancellation; safe failure auditing. | 🟡 Local candidate awaiting merge and deployment approval |
| **Grasslands Playable Slice** | Aelis greybox, guided camera, virtual joystick, jump, dash, melee combo, enemies, vitality, mission objective, beacon, and HUD. | 🟡 Implemented; Unity import/device verification pending |
| **Mission Roadmap + Loadout Shell** | Nine named missions, difficulty tiers, protection/enemy briefings, coin candidates, cinematic playback fallback, visible loadout HUD, blade and pulse blaster. | 🟡 Implemented; Unity import/device verification pending |
| **Music Intake + Licensing Gate** | Curated free/paid source register, rights checklist, provenance requirements, creative map, and Unity/cinematic mixing rules. | 🟡 Implemented; final tracks pending audition and approval |
| **Production Providers** | Mastra/Logicc primary, explicit Langdock failover, Meshy preview/refine REST flow, Blackbox image/video contract, local Voicebox generation contract. | 🟡 Mock-verified; live services/credits and asset approval pending |

---

## Deployment Status
- Production domain: `zunobattle.app`
- Deployment platform: Vercel
- Deployment source: GitHub `main`

## Security Status
- `.env*` is ignored by Git
- `.env.example` is the only environment template intended for version control
- Supabase, Logicc, and legacy Langdock credentials remain environment-managed

## Planned Next Milestones

| Milestone | Description | Target |
|------------|--------------|---------|
| **Inventory Enhancements v2** | Expanded inventory modeling, ledgering, and audit controls. | ✅ Completed |
| **Supabase Authentication Integration** | Replace mock player IDs with authenticated Supabase identity. | ✅ Completed |
| **Transactional Orchestration** | Introduce Postgres RPC/ACID flows for end-to-end atomic operations. | ✅ Completed |

Recommended next milestones:
- Android Google Sign-In configuration (package name, SHA-1, ownership verification)
- Stripe production integration (sandbox acceptable for now)
- Bundle reward expansion
- LiveOps
- Leaderboards
- Multiplayer foundation
- AI Director Phase 6.1 production activation (Mastra + Logicc)
- Intro cinematic and level cinematics
- Aelis production rig, animation graph, VFX, and audio
- Grasslands modular environment kit and Android device performance pass

### Transactional Orchestration Planning (Milestone 9B)
Planning document created: `docs/TRANSACTIONAL_ORCHESTRATION.md`.
  
| **Economy Transactional RPCs** | Make Economy v2 balance mutations atomic via Postgres RPCs. | ✅ Completed |
| **Inventory Transactional RPCs** | Make Inventory v2 item mutations atomic via Postgres RPCs. | ✅ Completed |
| **Shop Purchase Transactional RPC** | Make shop purchases ACID across wallet debit + inventory grant + purchase receipt. | ✅ Completed |
| **Reward Engine Transactional RPC** | Make reward processing ACID across wallet credits + inventory grants + XP + unlocks. | ✅ Completed |
| **LiveOps** | Remote configuration and event management. | Upcoming |
| **Leaderboards** | Competitive ranking and stat aggregation. | Upcoming |
| **Multiplayer Foundation** | Session architecture and synchronization. | Future |

### Testing Roadmap (Incremental)
Phase 2:
- Shop purchase service tests
- Reward Engine orchestration tests
- Achievement completion tests
- Quest completion tests

Phase 3:
- Repository tests using mocked Supabase responses
- API route tests
- Authentication tests

Phase 4:
- End-to-end integration tests against a disposable Supabase test database

---

## Future Systems Documented
- AI Director / Game Director
- Android Google auth prerequisites
- Stripe sandbox-only policy
- Level Cinematic / Narrative System
- Game Intro Video / Startup Cinematic asset planned at `public/video.mp4`
- Zunlandia story/lore direction for future cinematics, level briefings, and AI Director behavior
- Reward Engine orchestration blueprint

Additionally documented:
- Voice pipeline
- Video generation pipeline
- Meshy AI provider foundation

## Asset Status
- Game assets are actively evolving and incomplete.
- Runtime primitives in the Grasslands slice are greybox gameplay bodies only and are not approved production assets.
- Additional assets will be added gradually until there is enough coverage for the game.
- Backend remediation milestones must not delete or modify unrelated asset files.

---

**Governance:** All backend development must remain consistent with the ZUNO Constitution, ADR-003, and the Reward Engine-centered server-authoritative architecture.
