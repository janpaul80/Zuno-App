# 03_ENGINEERING_STANDARDS.md

## Existing Engineering Principles
- Server-authoritative architecture must always be preserved.
- All repositories, services, and API routes follow strict typing and validation.
- Gameplay domains must respect domain boundaries and backend layering standards.

---

## Addendum 2026‑07‑01 — Reward Engine & Economy Authority

The following binding engineering rules extend the original standards and consolidate backend control under centralized reward and economy layers.

### Reward Engine Authority
- The **Reward Engine** is the single entrypoint for all reward mutations — XP, currency, inventory, unlocks, and bundles.
- Gameplay domains must submit validated reward requests rather than performing direct modifications.
- All backend contributors must follow the canonical flow defined in **02_ARCHITECTURE.md**.
- Reward requests are validated, recorded, and dispatched to sub‑services:
  - Economy Service → currency transactions
  - Inventory Service → item grants
  - Progression Service → XP/level updates
  - Unlock Service → feature unlocks

### Economy Authority
- The **Economy Domain v2** is the sole authority authorized to adjust currency balances.
- Each balance change must generate a verifiable transaction record containing:
  - player ID  
  - source domain  
  - reason  
  - amount (+/‑)  
  - timestamp  
  - request ID
- Transactions form an immutable audit ledger accessible to future reporting tools.

### Enforcement and Compliance
1. No domain may execute direct reward or economy writes outside the Reward Engine pathway.
2. No Supabase queries may adjust currency or items except through authorized repository calls from the Reward Engine or Economy Domain.
3. Violations constitute architecture breaches reviewed by the ZUNO Governance Council.
4. Code review gates and CI policies must include architecture compliance checks.

Cross‑references: see **02_ARCHITECTURE.md** for structural flow and **10_DECISION_LOG.md** for the governance record of this change.
