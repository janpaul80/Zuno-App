# Quests Domain v1

**Version:** 1.0  
**Status:** Active

---

## Purpose
Implements server-authoritative quest tracking for daily and weekly objectives.

Quests enable structured player progression, rewarding consistent engagement without allowing client-controlled manipulation.

---

## Architecture
- **Quest Definitions:** Global immutable metadata tables defining objectives and rewards.
- **Player Quests:** Per-player progress tracking including completion and claim states.
- **Service Layer:** Business logic ensuring server-side validation and progress enforcement.
- **API Layer:** Read-only endpoint returning player quest summary.

---

## Database Schema

### `quest_definitions`
| Column | Type | Description |
|---------|------|-------------|
| key | TEXT (PK) | Unique quest identifier |
| name | TEXT | Display name |
| description | TEXT | Description for UI |
| target_value | INTEGER | Completion target value (≥1) |
| reward_type | TEXT | Reward type (optional) |
| reward_amount | INTEGER | Reward amount (≥0) |
| created_at | TIMESTAMPTZ | Creation timestamp |

### `player_quests`
| Column | Type | Description |
|---------|------|-------------|
| player_id | UUID FK | References `players(id)` |
| quest_key | TEXT FK | References `quest_definitions(key)` |
| progress | INTEGER | Current progress |
| completed | BOOLEAN | Completion flag |
| claimed | BOOLEAN | Reward claimed flag |
| completed_at | TIMESTAMPTZ | Completion time |
| claimed_at | TIMESTAMPTZ | Claim time |
| updated_at | TIMESTAMPTZ | Last update time |

---

## API Route

### `GET /api/v1/player/quests`
Read-only endpoint returning active quest definitions and player progress.

**Example Response:**
```json
{
  "definitions": [
    {
      "key": "daily_jump",
      "name": "Daily Jumper",
      "description": "Perform 10 jumps in a day.",
      "target_value": 10,
      "reward_type": "coins",
      "reward_amount": 100,
      "created_at": "2026-07-01T00:00:00Z"
    }
  ],
  "progress": [
    {
      "player_id": "uuid",
      "quest_key": "daily_jump",
      "progress": 7,
      "completed": false,
      "claimed": false,
      "updated_at": "2026-07-01T12:00:00Z"
    }
  ]
}
```

---

**Notes:**
- No client mutation endpoints are available at this stage.
- Quest reward and claim behavior will be implemented in future versions.
- The system enforces strict server-authoritative controls per Constitution.
