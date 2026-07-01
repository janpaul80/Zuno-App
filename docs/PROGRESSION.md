# Player Progression – Domain v1

## Overview
The Progression Domain manages a player's **XP**, **level**, and **XP-to-next-level** thresholds.
It is **server-authoritative**, meaning players cannot directly modify XP or level values.
All XP changes originate from validated game events or internal backend operations.

## Formula
* **Base XP to next level:** 100.
* **Growth rate:** 1.2 per level.
* XP required for level *n* → `100 × 1.2^(n−1)` (floored to nearest integer).

## Level-Up Rules
1. After adding XP, while `xp >= xp_to_next`, the player levels up.
2. Extra XP beyond the threshold carries over to the next level.
3. XP and level are persisted together in the `player_progression` table.

## Initialization
If no progression record exists, the server initializes it as:
```json
{
  "xp": 0,
  "level": 1,
  "xp_to_next": 100,
  "updated_at": "UTC timestamp"
}
```

## Unlock Hooks
Progression hooks will trigger unlocks or reward grants in future phases when player levels reach defined milestones.

## Security and Authority
* Players can **read** their own progression.
* Only the **service role** layer can perform progression **updates**.
* RLS enforces read-only access for authenticated players.
* Constraints ensure XP ≥ 0, Level ≥ 1, XP‑to‑next ≥ 0.

## API
### `GET /api/v1/player/progression`
**Description:** Returns the player’s current XP, level, and XP thresholds.

**Response:**
```json
{
  "ok": true,
  "data": {
    "xp": 120,
    "level": 3,
    "xp_to_next": 174,
    "updated_at": "2026-06-30T00:00:00Z"
  },
  "requestId": "..."
}
```

## Future Enhancements
* XP multiplier effects (boosts, events)
* Reward and unlock triggers
* Long-term seasonal XP tracking

---

Progression Domain v1 provides the foundational server-authoritative structure for tracking player experience and leveling inside ZUNO.