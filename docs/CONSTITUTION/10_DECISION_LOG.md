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
