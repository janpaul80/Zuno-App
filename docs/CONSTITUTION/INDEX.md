# ZUNO Constitution – Index

Version: 1.0  
Status: Active

---

## Purpose
The **ZUNO Constitution** defines permanent project governance, architecture, and engineering standards. It ensures consistency across all human and AI contributors and guarantees technical and ethical alignment.

---

## Reading Order

1. 01_PROJECT_VISION.md – Project vision and long-term goals
2. 02_ARCHITECTURE.md – System architecture overview
3. 03_ENGINEERING_STANDARDS.md – Technical and workflow rules
4. 04_DEPLOYMENT.md – CI/CD, environments, and hosting
5. 05_BACKEND_ROADMAP.md – Domain implementation roadmap
6. 06_GAME_DESIGN_PRINCIPLES.md – Game design philosophy
7. 07_SECURITY_MODEL.md – Trust boundaries & data security
8. 08_AI_CONTRIBUTOR_GUIDE.md – AI contributor policies
9. 09_GLOSSARY.md – Definitions of core terminology
10. 10_DECISION_LOG.md – Architecture Decision Records (ADR)
11. 11_NON_GOALS.md – Non-goals and exclusions
12. 12_AI_WORKFLOW.md – Standard AI contribution lifecycle
13. 13_RELEASE_POLICY.md – Release and versioning policy
14. 14_EMERGENCY_ROLLBACK_POLICY.md – Rollback procedures

---

## Core Principles
1. Player trust comes first.  
2. Fair gameplay over monetization.  
3. Server authority over client trust.  
4. Simplicity before complexity.  
5. Documentation before implementation.  
6. Security by design.  
7. Every change must be verifiable.  
8. Build for maintainability.

---

## Constitution Hierarchy
```
Constitution
   ↓
Architecture Decisions (ADR)
   ↓
Engineering Standards
   ↓
API Contracts
   ↓
Domain Documents
   ↓
Implementation
```
The higher the level, the higher its authority during disagreements.

---

## Governance
### Authority to Change
Only the core maintainers or project lead may approve Constitution changes. AI agents may propose ADRs or pull requests but cannot merge governance changes themselves.

### Change Proposal Process
1. Submit proposed change via ADR or pull request.  
2. Include rationale, impact, and backward compatibility.  
3. Obtain maintainer approval before merging.

### Versioning and Releases
Each approved revision increments the version in CHANGELOG.md. Major architectural changes create a new major version; minor clarifications increment minor revisions.

### What Requires an ADR
* New frameworks or technology choices  
* Architectural pattern or workflow change  
* New domain lifecycle or security model  
* Any core principle amendment

---

## Future Revisions
All updates to the Constitution must record date, version, and rationale in CHANGELOG.md. No feature implementation may override active governance without formal ADR approval.