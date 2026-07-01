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

**Notes:**
- No mutation endpoints are available yet.
- Reward claiming logic will be introduced in a future milestone.
