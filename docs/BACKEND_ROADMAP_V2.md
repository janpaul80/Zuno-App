# Backend Roadmap V2

This document outlines the next backend implementation phases for **ZUNO**, in order of priority. Each domain specifies its purpose, dependencies, authoritative rules, key API endpoints, and expansion points.

---

## 1. Unlocks Domain

**Purpose:**  Manage and track unlockable content like characters, cosmetics, and reward grants.

**Dependencies:**  Progression, Inventory.

**Server Authority:**  Server validates unlocks. Clients cannot alter direct unlock state.

**APIs:**
* `GET /api/v1/player/unlocks`
* `POST /api/v1/player/unlocks/claim`

**Expansion:**  Cosmetic previews, event-based unlocks, temporary campaigns.

---

## 2. Achievements Domain

**Purpose:**  Define and track milestone goals (e.g., Reach Level 50).

**Dependencies:**  Progression, Unlocks.

**Server Authority:**  Updates only via trusted events.

**APIs:**
* `GET /api/v1/player/achievements`

**Expansion:**  Multi-tier achievements, reward integration, seasonal badges.

---

## 3. Quest Domain

**Purpose:**  Handle daily and weekly quests that grant XP or items.

**Dependencies:**  Progression, Achievements.

**Server Authority:**  Quest assignment, progress, and completion fully validated server-side.

**APIs:**
* `GET /api/v1/player/quests`
* `POST /api/v1/player/quests/claim`

**Expansion:**  Quest chains, coop quests, seasonal events.

---

## 4. Daily Rewards

**Purpose:**  Reward login streaks and consistent play.

**Dependencies:**  Player Profile.

**Server Authority:**  Claim validation and streak reset handled by server.

**APIs:**
* `GET /api/v1/player/daily-reward`
* `POST /api/v1/player/daily-reward/claim`

**Expansion:**  Dynamic multipliers, seasonal reward variants.

---

## 5. Leaderboards

**Purpose:**  Display and rank player performance globally and socially.

**Dependencies:**  Progression, Achievements.

**Server Authority:**  All score submissions verified server-side.

**APIs:**
* `GET /api/v1/leaderboards/global`
* `GET /api/v1/leaderboards/friends`

**Expansion:**  Seasonal resets, alternate leaderboard categories.

---

## 6. LiveOps

**Purpose:**  Drive dynamic gameplay changes through configuration and feature flags.

**Dependencies:**  None (operates system-wide).

**Server Authority:**  Only the backend defines and distributes live configuration.

**APIs:**
* `GET /api/v1/liveops/config`

**Expansion:**  Remote A/B tests, real-time flag propagation.

---

## 7. Multiplayer Foundation

**Purpose:**  Establish multiplayer groundwork: matchmaking, presence, and parties.

**Dependencies:**  Auth, Profiles, LiveOps.

**Server Authority:**  Match lifecycle and session management handled server-side.

**APIs:**
* `POST /api/v1/matchmaking/join`
* `POST /api/v1/matchmaking/leave`
* `GET /api/v1/match/:id/state`

**Expansion:**  Ranked matchmaking, spectator support, regional instances.

---

## Implementation Sequence
1. Unlocks Domain
2. Achievements Domain
3. Quest Domain
4. Daily Rewards
5. Leaderboards
6. LiveOps
7. Multiplayer Foundation

These milestones will stabilize ZUNO's backend into modular, server-authoritative systems ready for long-term growth.