# ZUNO Project Status

**Version:** 1.3  
**Last Updated:** 2026-07-07

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

---

## Deployment Status
- Production domain: `zunobattle.app`
- Deployment platform: Vercel
- Deployment source: GitHub `main`

## Security Status
- `.env*` is ignored by Git
- `.env.example` is the only environment template intended for version control
- Supabase and Langdock credentials remain environment-managed

## Planned Next Milestones

| Milestone | Description | Target |
|------------|--------------|---------|
| **Inventory Enhancements v2** | Expanded inventory modeling, ledgering, and audit controls. | Active |
| **Supabase Authentication Integration** | Replace mock player IDs with authenticated Supabase identity. | ✅ Completed |
| **Transactional Orchestration** | Introduce Postgres RPC/ACID flows for end-to-end atomic operations. | Active |

### Transactional Orchestration Planning (Milestone 9B)
Planning document created: `docs/TRANSACTIONAL_ORCHESTRATION.md`.
  
| **Economy Transactional RPCs** | Make Economy v2 balance mutations atomic via Postgres RPCs. | ✅ Completed |
| **Inventory Transactional RPCs** | Make Inventory v2 item mutations atomic via Postgres RPCs. | ✅ Completed |
| **Shop Purchase Transactional RPC** | Make shop purchases ACID across wallet debit + inventory grant + purchase receipt. | ✅ Completed |
| **Reward Engine Transactional RPC** | Make reward processing ACID across wallet credits + inventory grants + XP + unlocks. | ✅ Completed |
| **LiveOps** | Remote configuration and event management. | Upcoming |
| **Leaderboards** | Competitive ranking and stat aggregation. | Upcoming |
| **Multiplayer Foundation** | Session architecture and synchronization. | Future |

---

## Future Systems Documented
- AI Director / Game Assistant
- Android Google auth prerequisites
- Stripe sandbox-only policy
- Level Cinematic / Narrative System
- Game Intro Video / Startup Cinematic asset planned at `public/video.mp4`
- Zunlandia story/lore direction for future cinematics, level briefings, and AI Director behavior
- Reward Engine orchestration blueprint

## Asset Status
- Game assets are actively evolving and incomplete.
- Additional assets will be added gradually until there is enough coverage for the game.
- Backend remediation milestones must not delete or modify unrelated asset files.

---

**Governance:** All backend development must remain consistent with the ZUNO Constitution, ADR-003, and the Reward Engine-centered server-authoritative architecture.
