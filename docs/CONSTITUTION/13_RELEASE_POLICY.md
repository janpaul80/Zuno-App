# Release and Versioning Policy

Version: 1.0  
Status: Active

---

## Purpose
Defines how releases are versioned, tagged, and deployed to ensure stable, trackable production deployments for ZUNO.

---

## Versioning Model
* Follows **Semantic Versioning (semver)**: `MAJOR.MINOR.PATCH`.  
* Increment:  
  * **MAJOR** — breaking architecture or Constitution change.  
  * **MINOR** — new functionality or domain added.  
  * **PATCH** — small documentation or fix.  

---

## Git Tags
* Every production release is tagged `vX.Y.Z`.  
* Git tags trigger automatic Vercel production builds.  
* Tags are immutable once released and archived in Git history.  

---

## Release Cadence
* Minor releases occur monthly or after each major verified milestone.  
* Major releases follow full architectural or governance updates.  
* Hotfixes permitted only for production‑blocking failures.  

---

## Approval Process
1. Verify `npm run lint`, `npm run build`, and `npm test`.  
2. Update documentation and CHANGELOG.md with new version.  
3. Obtain maintainer review and merge into main.  
4. Tag using semantic version and deploy via GitHub → Vercel integration.  

---

## Production Policy
* Production deployments originate only from tagged commits.  
* Environment variables verified in Vercel prior to production push.  
* Each version must be reproducible from source using its tag.  

---

## Documentation
* Each release must note version, release date, and summary in CHANGELOG.md.  
* Major versions require explicit ADR reference noting breaking changes.  

---

This policy ensures predictable, transparent releases and auditable history across every ZUNO environment.  