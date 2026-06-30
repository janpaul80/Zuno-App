# API Contract – Phase 2

## Shop API

### `GET /api/v1/shop/items`
**Description:**
Retrieve the list of all active shop items currently available for purchase.

**Method:** `GET`

**Authentication:**
None required yet (public endpoint).

**Response:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "uuid",
      "name": "Energy Blade",
      "description": "Basic melee weapon with balanced attack speed",
      "price_coins": 500,
      "price_gems": 0,
      "category": "weapon",
      "created_at": "2026-06-29T00:00:00Z",
      "updated_at": "2026-06-29T00:00:00Z"
    }
  ]
}
```

**Error Responses:**
| Code | Message | Description |
|------|----------|-------------|
| 500 | INTERNAL_ERROR | Server‑side failure when fetching shop items |

**Notes:**
* Uses the unified `apiHandler()` wrapper and `successResponse()` format.
* Returns active items only (`is_active = true`).
* No write or purchase operations included.
