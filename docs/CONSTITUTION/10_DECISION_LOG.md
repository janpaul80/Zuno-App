# 10_DECISION_LOG.md

## Decision 2026‑07‑01 — Reward Engine & Economy Authority

**Resolution:** Adopt centralized Reward Engine and Economy Authority architecture.

**Rationale:** Prevent reward/economy duplication, enforce auditability, and ensure server‑authoritative state integrity across gameplay domains.

**Decisions:**
1. Reward Engine becomes the single authority for all reward grants (XP, Currency, Inventory, Unlocks, Bundles).
2. Gameplay domains → Reward Engine → Economy / Inventory / Progression / Unlocks → Repositories → Supabase.
3. Economy Domain v2 records all currency operations as transactions with source, reason, amount, timestamp, request ID, and player ID.
4. No direct reward or currency writes are allowed from gameplay domains.
5. Reward requests must be validated and logged before execution.
6. Violations are architecture breaches subject to review.

**Impact:** All future milestones—Daily Rewards v1 onward—must adhere to this model.

**Recorded By:** ZUNO Governance Council / AI Architect
