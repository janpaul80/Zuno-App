# CHANGELOG.md

## Version 1.1 — 2026‑07‑01
### Added
- **Reward Engine Authority Addendum** — designating the Reward Engine as the sole reward mutation system.
- **Economy Authority Addendum** — requiring auditable transaction records for all balance changes.
- **Cross‑References** — architecture flow (**02_ARCHITECTURE.md**), engineering rules (**03_ENGINEERING_STANDARDS.md**), and governance decision (**10_DECISION_LOG.md**).

### Version 1.1‑R — 2026‑07‑02 Constitution Reconciliation
- Merged Reward Engine and Economy Authority updates as addenda into existing Constitution without removing historical content.
- Retained all prior architecture text and standards; new sections are cumulative extensions.
- Confirmed canonical flow and binding rules across all documents:
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
- Finalized cross‑document references for clarity and maintainability.

## Project Documentation Updates — 2026-07-02
- Added `docs/REWARD_ENGINE.md` as the approved blueprint for Reward Engine v1 implementation.
- Updated `docs/PROJECT_STATUS.md` to mark the Reward Engine architecture spec milestone as completed.
- Established the implementation-first rule that Reward Engine coding must follow the approved architecture specification.

### Version History
- **v1.1** — Introduced centralized Reward Engine and Economy Authority architecture.
- **v1.0** — Original Governance Framework and Server‑Authoritative Design.
