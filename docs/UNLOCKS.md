# Unlocks Domain

**Version:** 1.0  
**Status:** Active

---

## Purpose
Defines the server‑authoritative model and API surface for player unlocks — characters, cosmetics, and progression‑based rewards.

---

## Architecture
Unlocks follow the Repository → Service → API pattern.

### Repository
`unlockRepository.ts` provides persistence‑only methods:
* `findAllByPlayerId(playerId)`
* `findByPlayerIdAndKey(playerId, unlockKey)`
* `insertUnlock(record)`

### Service
`unlockService.ts` governs domain logic:
* Ensures idempotent unlock grants (returns existing record when already unlocked)
* Invokes persistence methods only through the repository
* Future hook points for reward/progression systems

### API
`GET /api/v1/player/unlocks` returns the player’s current unlock list.
* Read‑only endpoint (no public POST/PUT)
* Auth: temporary mock player ID until Supabase Auth integration

---

## Database Schema
`player_unlocks` table (see `0004_phase4_player_unlocks.sql`):
| Column | Type | Description |
|---------|------|-------------|
| `player_id` | `uuid` | Foreign key to `players.id` |
| `unlock_key` | `text` | Unique unlock identifier |
| `unlock_type` | `text` | `'character'`, `'cosmetic'`, or `'reward'` |
| `granted_at` | `timestamptz` | UTC timestamp |

RLS ensures each player can query only their own records.

---

## Example Response
```json
[
  {
    "player_id": "00000000-0000-0000-0000-000000000001",
    "unlock_key": "hero_knight",
    "unlock_type": "character",
    "granted_at": "2026-07-01T12:00:00Z"
  },
  {
    "player_id": "00000000-0000-0000-0000-000000000001",
    "unlock_key": "cape_blue",
    "unlock_type": "cosmetic",
    "granted_at": "2026-07-01T12:00:00Z"
  }
]
```

---

## Compliance
✅ No `any` types  
✅ Server‑authoritative  
✅ Repository → Service → API separation  
✅ Lint + Build verified