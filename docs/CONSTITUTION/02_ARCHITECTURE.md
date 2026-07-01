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
