# Emergency Rollback Policy

Version: 1.0  
Status: Active

---

## Purpose
Outlines the process for safely restoring stability after a failed deployment or database migration. This ensures ZUNO can recover quickly without data loss.

---

## Rollback Conditions
Rollback is triggered when production deployment:
* Breaks builds or critical user flows.  
* Introduces security vulnerabilities.  
* Corrupts or misconfigures database schema.  

---

## Rollback Procedure
1. Identify last known good Git tag (e.g., `vX.Y.Z`).  
2. In Vercel dashboard, **Promote Previous Deployment** to revert production instantly.  
3. If needed, manually redeploy previous tag from Git.  
4. Document root cause and actions taken in CHANGELOG.md under “Emergency Rollback”.  

---

## Database Migration Rollback
* All Supabase migrations must include a reversible script where feasible.  
* Use transactional DDL statements to allow `ROLLBACK` on failure.  
* Never delete production tables manually.  

---

## Feature Flag Rollback
* Disable problematic features via LiveOps or feature flags before restoring full rollback.  
* Default all new flags to false until validated in staging.  

---

## Responsibilities
| Role | Responsibility |
|-------|----------------|
| **Maintainers** | Initiate rollback, verify recovery, document incident. |
| **AI Agents** | Detect and report anomalies, never execute rollback autonomously without approval. |
| **Developers** | Investigate root cause and patch underlying issue. |

---

## Post‑Rollback Actions
* Run full lint, build, and migration verification before re‑deployment.  
* Confirm database integrity and API stability.  
* Update ADR or Constitution if issue stemmed from missing governance.  

---

Swift rollbacks maintain uptime, protect players, and preserve ZUNO’s reliability.  