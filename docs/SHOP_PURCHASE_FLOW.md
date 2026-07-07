# Shop Purchase Flow – Design Document

### 1. Purchase Request Format
```json
POST /api/v1/shop/purchase
{
  "item_id": "uuid or slug of shop item",
  "currency_type": "coins | gems",
  "quantity": 1,
  "transaction_id": "optional client idempotency key"
}
```

### 2. Server‑Side Validation Steps
1. **Authenticate player** via Supabase Auth.
2. **Verify item exists** in `shop_items` and `is_active = true`.
3. **Check player ownership** (to prevent duplicate single‑ownership items).
4. **Verify sufficient currency balance**.
5. **Validate quantity and request schema** using Zod.
6. **Ensure transaction_id (if provided) is unused** to maintain idempotency.

### 3. Currency Deduction Rules
* Deduct currency through Shop Purchase RPC (`process_shop_purchase_rpc`), which internally debits via Economy v2.
* Prefer integer arithmetic (no floats).
* Insufficient balance → reject with `INSUFFICIENT_FUNDS`.

### 4. Inventory Grant Rules
* Grant purchased items through Shop Purchase RPC (`process_shop_purchase_rpc`), which internally grants via Inventory v2.
* If stackable → increment quantity.
* If unique item → reject duplicate acquisition.

### 4.1 Quantity Limitation
* Current implementation supports `quantity = 1` only.
* Multi-quantity purchases require explicit product/UI support and careful stack-limit UX.

### 5. Ledger / Audit Requirements
* Every currency debit creates an Economy v2 `economy_transactions` row through Economy Service.
* Every item grant creates an Inventory v2 `inventory_transactions` row through Inventory Service.
* Every purchase creates a `purchases` audit row with `idempotency_key`, `currency_type`, `price`, `status`, and `completed_at`.
* Use database triggers or Supabase RPC for atomic ledger + inventory consistency.

### 6. Idempotency Strategy
* Client may send `transaction_id` header or body field.
* Server ensures each (player_id, transaction_id) pair is used once.
* Repeated request with same ID → returns previous result (idempotent).
* Database constraint (unique index) enforces consistency.

**Current Implementation (2026‑07):**
* Shop purchases execute through a single RPC: `process_shop_purchase_rpc`.
* Idempotency is enforced by the unique `(player_id, idempotency_key)` purchase index.
* Retries return the existing purchase receipt without double-charging or duplicating inventory grants.

### 6.1 Duplicate Non‑Consumable Protection
* Non‑consumable items (`is_consumable = false`) are protected against re‑purchase.
* Existing ownership is checked in Inventory v2 (`player_inventory_items`) before currency deduction.
* A second attempt yields `409 ALREADY_OWNED`.

### 6.2 Atomicity Limitation
* The purchase flow is now implemented as a single Postgres RPC: `process_shop_purchase_rpc`.
* Wallet debit (Economy v2), inventory grant (Inventory v2), and purchase receipt updates occur atomically inside the database transaction.
* Idempotency is enforced by `(player_id, idempotency_key)` uniqueness on `purchases` and returns the original receipt on retries.

### 7. Failure Cases
| Case | Behavior |
|------|-----------|
| Invalid item | 404 NOT_FOUND |
| Inactive item | 403 ITEM_INACTIVE |
| Insufficient funds | 402 INSUFFICIENT_FUNDS |
| Duplicate ownership | 409 ALREADY_OWNED |
| Concurrent spend conflict | 409 ACQUIRE_CONFLICT |
| Internal DB error | 500 INTERNAL_ERROR |

### 8. Response Format
Successful purchase:
```json
{
  "ok": true,
  "data": {
    "purchase_id": "uuid",
    "item_id": "uuid",
    "currency_deducted": { "coins": 500 },
    "inventory_granted": { "item_id": "explorer_suit_default", "quantity": 1 },
    "player_currency": { "coins": 500, "gems": 0 }
  }
}
```
Failure uses standard `errorResponse(code, message)` shape.

### 9. Security Notes
* Server‑authoritative. No client‑trusted pricing or currency balance.
* Verify item cost from server DB, not request body.
* Validate ownership and prevent inventory spamming.
* Enforce HTTPS and validate JWTs.
* Detect replayed transactions via `transaction_id`.
* Audit trail entries for dispute handling.

### 10. Future Real‑Money / IAP Considerations
* Integrate with platform billing (Google Play / Apple Store) by verifying signed purchase tokens.
* Keep virtual‑currency purchases separate from real‑money IAPs.
* Real‑money transactions require server‑verified receipts to mitigate fraud.
* Maintain a mapping between IAP SKU → shop item for item delivery.
* Extend ledger for external IAP reference IDs.

---

This document defines the **logical contract and safety guarantees** for purchases. Implementation will follow only after all Player and Shop read‑only domains are stable and auth integration is complete.
