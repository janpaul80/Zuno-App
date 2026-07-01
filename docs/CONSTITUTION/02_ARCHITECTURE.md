# 02_ARCHITECTURE.md

## Canonical Backend Architecture

```
Gameplay Domain
        ↓
Reward Engine
        ↓
Economy / Inventory / Progression / Unlocks
        ↓
Repositories
        ↓
Supabase
```

### Architectural Principles
- **Single Source of Truth:** All state‑changing operations flow through authorized services within the canonical stack.
- **Server Authoritative:** The backend owns all economy, inventory, progression, and reward updates.
- **Auditability:** Each transaction and reward grant must be transparently logged and traceable back to its source domain.

### Reward Engine Layer
- Responsible for orchestrating all reward distributions.
- Coordinates with sub‑systems (Economy, Inventory, Progression, Unlocks).
- Each domain emits validated reward requests rather than granting directly.

### Economy Layer
- Maintains full transaction integrity.
- Every currency change records: player ID, source domain, reason, amount, timestamp, and request ID.
- Provides an immutable transaction ledger.

### Gameplay Domains
- Daily Rewards, Quests, Achievements, Purchases, Promo Codes, LiveOps Events, Battle Pass, and Seasonal Events must never modify these systems directly.
- Each emits a Reward Request to the Reward Engine for centralized processing.

---

## Addendum 2026‑07‑01 — Reward Engine & Economy Authority

### Overview
This addendum memorializes the ZUNO Backend v1.1 architecture update introducing centralized **Reward Engine** and **Economy Authority** layers.

### Canonical Flow Reference
```text
Gameplay Domain
        ↓
Reward Engine
        ↓
Economy / Inventory / Progression / Unlocks
        ↓
Repositories
        ↓
Supabase
```

### Integration With Prior Architecture
- The above diagram extends, not replaces, the server‑authoritative structure established in earlier Constitution versions.  
- Gameplay domains continue to expose domain‑specific routes but now delegate all reward or economy mutations to the Reward Engine entrypoint.  
- See **03_ENGINEERING_STANDARDS.md** for mandatory compliance rules and **10_DECISION_LOG.md** for governance rationale.