# API Contract Updates (v1)

## Player Quests

### `GET /api/v1/player/quests`
Returns quest definitions and player quest progress.

**Response:**
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

**Authentication:** required (Supabase User)  
**Authorization:** player-owned data only.

---

## Daily Rewards

### `GET /api/v1/player/daily-reward`
Returns daily reward definitions, player streak metadata, current eligibility, pending reward metadata, and a future Reward Engine request payload.

### `POST /api/v1/player/daily-reward/claim`
Validates eligibility and records claim metadata only. Does not directly grant currency, XP, inventory, unlocks, or bundles.

**Notes:**
- Daily Rewards v1 follows ADR-003 and prepares a reward request without executing reward mutations.
- Reward granting remains deferred until Reward Engine v1 is implemented.
