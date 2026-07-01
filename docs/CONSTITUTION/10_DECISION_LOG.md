# Decision Log (Architecture Decision Records)

Version: 1.0  
Status: Active

---

| ADR ID | Decision | Date | Rationale |
|---------|-----------|------|------------|
| **ADR‑0001** | Framework: Next.js for frontend + backend | 2026‑06 | Unified web + API environment deployable via Vercel |
| **ADR‑0002** | Backend Database: Supabase (Postgres) | 2026‑06 | Provides built‑in auth, RLS, and tooling |
| **ADR‑0003** | Hosting Provider: Vercel | 2026‑06 | Enables seamless CI/CD and rollback |
| **ADR‑0004** | Game Engine: Unity for Android | 2026‑06 | Mature 3D engine with flexible build pipeline |
| **ADR‑0005** | Economy Authority: Server‑validated economy | 2026‑06 | Ensures fairness and prevents tampering |
| **ADR‑0006** | Cloud Save: Versioned + checksum‑verified model | 2026‑06 | Balances offline capability with data integrity |
| **ADR‑0007** | Architecture Pattern: Repository → Service → API | 2026‑06 | Guarantees modularity and testable components |
| **ADR‑0008** | CI/CD Source: GitHub → Vercel pipeline | 2026‑06 | Simplifies deployment and maintains audit trail |
| **ADR‑0009** | Authority Model: Server defines truth | 2026‑07 | Reinforces secure, trustworthy gameplay state |
| **ADR‑0010** | Documentation: Constitution as root governance | 2026‑07 | Provides permanent reference hierarchy above code |

---

## ADR Guidelines

### Purpose
Each ADR (Architecture Decision Record) logs critical design choices and prevents unintentional regressions.

### Structure
1. Title / ID / Date / Status  
2. Context and drivers for decision  
3. Options considered (if any)  
4. Outcome and rationale  

### Workflow
* New ADRs created in `docs/CONSTITUTION/DECISIONS` (optional subfolder).  
* Each ADR reviewed and approved by maintainers before implementation.  

### Status Definitions
| Status | Meaning |
|---------|----------|
| **Proposed** | Draft pending discussion |
| **Accepted** | Officially adopted |
| **Superseded** | Replaced by newer ADR |
| **Deprecated** | No longer relevant |

---

All major architectural and security changes to ZUNO must be justified through a formal ADR.  