# API Contract Updates (v1)

## Player Achievements

### `GET /api/v1/player/achievements`

Returns the full achievement summary for the authenticated player.

**Authentication:** required (Supabase User)  
**Authorization:** player-owned data only.

**Response:**
```json
{
  "definitions": [
    {
      "key": "first_jump",
      "name": "First Jump",
      "description": "Perform your first jump.",
      "target_value": 1,
      "reward_type": null,
      "reward_amount": 0,
      "created_at": "2026-07-01T00:00:00Z"
    }
  ],
  "progress": [
    {
      "player_id": "uuid",
      "achievement_key": "first_jump",
      "progress": 1,
      "completed": true,
      "completed_at": "2026-07-02T00:00:00Z",
      "updated_at": "2026-07-02T00:00:00Z"
    }
  ]
}
```

---

**Notes:**
- No mutation endpoints are exposed yet.
- Progress updates occur only through trusted server events.
