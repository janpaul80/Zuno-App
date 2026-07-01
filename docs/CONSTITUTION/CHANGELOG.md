# CHANGELOG.md

## Version 1.1 — 2026‑07‑01

### Added
- **Reward Engine Authority** — single reward pipeline controlling all XP, currency, inventory, unlock, and bundle grants.
- **Economy Authority** — transaction ledger requirement for all balance changes.
- **Canonical Architecture** — standardized backend flow:
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
- **Engineering Standards v1.1** — server‑authoritative rules enforcing Reward Engine and Economy Authority compliance.
- **Decision Log Entry 2026‑07‑01** — adoption of centralized reward/economy control model.
- **Backend Roadmap** — updated milestone order including Daily Rewards → Reward Engine → Economy v2.

### Version History
- **v1.0** — Original Constitution, Governance, and Server Authoritative Design Framework.
