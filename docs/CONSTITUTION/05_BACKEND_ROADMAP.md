# 05_BACKEND_ROADMAP.md

## Historical Milestones
Original roadmap preserved for lineage and context.

| Phase | Milestone | Description |
|--------|-----------|-------------|
| 1 | Constitution v1 | Establish governance and architecture foundation. |
| 2 | Backend Foundation | Core repository/service/API framework. |
| 3 | Player Domain | Identity + profile management. |
| 4 | Shop Domain | Server‑auth purchases. |
| 5 | Cloud Save v1 | Server‑authoritative client‑state persistence. |
| 6 | Progression Domain v1 | Player leveling + XP tracking. |
| 7 | Unlocks Domain v1 | Controlled unlock state management. |
| 8 | Achievements Domain v1 | Achievement tracking and rewards. |
| 9 | Quests Domain v1 | Quest objectives and progress tracking. |

---

## Addendum 2026‑07‑01 — Reward Engine & Economy Integration
This roadmap expansion extends the future backend sequence to align with the canonical flow documented in **02_ARCHITECTURE.md** and binding standards in **03_ENGINEERING_STANDARDS.md**.

| Phase | Milestone | Description |
|--------|-----------|-------------|
| 10 | Daily Rewards v1 | Daily login and engagement reward eligibility (Reward Engine stub). |
| 11 | Reward Engine v1 | Central authority for XP, currency, inventory, and unlock grants. |
| 12 | Economy v2 | Transaction ledger integration with Reward Engine; auditable currency flow. |
| 13 | Inventory Enhancements | Full item definitions, stacking, and serialization. |
| 14 | LiveOps | Remote configuration and event distribution system. |
| 15 | Leaderboards v1 | Global ranking hub for achievements and XP. |
| 16 | Multiplayer Foundation | Session sync and real‑time network architecture. |

All new domains are required to interface through the Reward Engine for any rewards or balance changes.
