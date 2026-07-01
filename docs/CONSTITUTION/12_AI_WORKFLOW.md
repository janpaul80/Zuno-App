# AI Workflow

Version: 1.0  
Status: Active

---

## Purpose
Defines the required workflow that every AI agent must follow when contributing to ZUNO.  
This process prevents inconsistency, enforces reproducibility, and guarantees accountability.

---

## Standard Lifecycle

```text
Read the Constitution
    ↓
Review existing architecture
    ↓
Implement feature or documentation
    ↓
Update related docs (API, Domain, Standards)
    ↓
Run npm run lint / build / test
    ↓
Commit verified changes
    ↓
Push to GitHub
    ↓
Vercel deploys automatically
```

---

## Workflow Rules
1. **Always verify** that every created file exists on disk before proceeding.  
2. **No partial milestones** — each commit must be complete and functional.  
3. **All verification steps** (`lint`, `build`, `test`) must pass before a commit.  
4. **Stop immediately** on error and fix the issue before continuing.  
5. **Summaries required** — every report must list verification results and changed files.  

---

## Documentation and Compliance
* Each feature must reference updated documentation.  
* New API or domain logic requires updates in the corresponding constitution files.  
* Markdown formatting is validated for GitHub readability.  

---

## Governance Integration
* Changes that modify architecture or the Constitution must be proposed as ADRs.  
* AI contributors may not merge ADRs without human maintainer approval.  

---

This workflow ensures consistent, auditable contributions across all future AI‑assisted development for ZUNO.  