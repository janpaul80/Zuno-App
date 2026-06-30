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

---

### `POST /api/v1/shop/purchase`
Initiates a coin‑based purchase for an active shop item.

**Method:** `POST`

**Authentication:**
TODO – replace mock ID with Supabase Auth user.

**Request:**
```json
{
  "itemId": "uuid-or-slug",
  "idempotencyKey": "unique-client-id"
}
```

**Response:**
```json
{
  "ok": true,
  "data": {
    "purchase_id": "uuid",
    "item": { "id": "uuid", "name": "Energy Blade", "price_coins": 500 },
    "currency": { "coins": 500, "gems": 0 },
    "inventory_item": { "item_id": "Energy Blade", "quantity": 1 }
  }
}
```

**Error Responses:**
| Code | Message | Description |
|------|----------|-------------|
| 400 | BAD_REQUEST | Malformed JSON or missing field |
| 404 | NOT_FOUND | Item or currency record missing |
| 402 | INSUFFICIENT_FUNDS | Player lacks enough funds |
| 409 | ALREADY_OWNED | Item already owned (non‑consumable) |
| 409 | IDEMPOTENT_REPLAY | Duplicate request detected |
| 500 | INTERNAL_ERROR | Unhandled server error |
