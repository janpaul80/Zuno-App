# Backend Roadmap

Version: 1.0  
Status: Active

---

## Overview
Defines the prioritized development order for all backend domains and their dependencies.  
Each domain follows server‑authoritative design and includes its own repository, service, and API layers.

---

| Domain | Purpose | Dependencies | Status |
|---------|----------|--------------|---------|
| **Unlocks** | Manage character and cosmetic unlocks | Progression, Inventory | Planned |
| **Achievements** | Track player milestones and rewards | Progression | Planned |
| **Quests** | Daily/weekly objectives that grant XP and currency | Progression, Achievements | Planned |
| **Daily Rewards** | Login streak tracking and claim handling | Profile | Planned |
| **Leaderboards** | Global and seasonal player rankings | Progression, Achievements | Planned |
| **LiveOps** | Dynamic feature flags and seasonal events | All above | Planned |
| **Multiplayer Foundation** | Matchmaking, presence, and match state | Auth, Profiles, LiveOps | Planned |

---

## Domain Development Principles
* Server‑authoritative logic only.  
* Each domain has a dedicated service and repository.  
* Migrations and policies are additive.  
* API routes defined *after* service functions are verified.  

---

## Future Phases
1. Establish cross‑domain reward hooks between Progression → Unlocks → Achievements.  
2. Introduce LiveOps configuration UI for dynamic events.  
3. Prototype Multiplayer relay and matchmaking architecture.  
4. Automate leaderboard resets via scheduled maintenance jobs.  