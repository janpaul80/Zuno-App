# Project Non‑Goals

Version: 1.0  
Status: Active

---

These boundaries define what ZUNO intentionally **will not** pursue. Adhering to non‑goals ensures focus, ethical gameplay, and architectural clarity.

---

## Gameplay and Monetization
* No pay‑to‑win systems or advantages.  
* No RNG‑based purchases or loot boxes.  
* No real‑money shortcuts for gameplay progression.  

---

## Engineering and Infrastructure
* No client‑authoritative economy or progression logic.  
* No direct database writes allowed from clients.  
* No secrets, keys, or credentials in source control.  
* No manual production deployments — all via CI/CD.  
* No destructive SQL migrations in production.  

---

## Organizational Scope
* No self‑hosted infrastructure unless strategically required.  
* No uncontrolled AI contributor autonomy without review.  
* No deviation from Repository → Service → API pattern.  

---

## Process and Governance
* No feature merges without passing verification (lint + build + tests).  
* No unreviewed architectural changes outside an ADR.  
* No suppression of documentation requirements.  

---

These restrictions protect ZUNO’s long‑term maintainability, fairness, and player trust.  