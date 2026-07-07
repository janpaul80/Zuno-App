# Transactional Orchestration (Milestone 9B Planning)

**Status:** Planning only (do not implement SQL/RPC in this milestone)

## Goal
Make multi-step reward, purchase, economy, inventory, progression, and unlock flows atomic (all-or-nothing) using database-backed transactions.

Given the current stack, **Postgres RPC (stored procedures) is the preferred production-safe path** because Supabase JS does not expose multi-statement transactions directly from application code.

## Scope (Planning)
This document defines:
- which current flows are non-atomic
- what failure modes we must prevent
- the proposed RPC surface area
- boundary rules (API → Service → Repository → RPC)
- an additive migration strategy and recommended order

This document intentionally does **not** include SQL/RPC implementations.

## Current Non-Atomic Flows

### 1. Reward Engine Processing
Current behavior (conceptual):
1. Validate `RewardRequest`.
2. Create/update reward request state (idempotency row).
3. Fan out to authority services:
   - economy credit/debit
   - inventory grant/remove
   - progression XP grant
   - unlock grant
4. Mark request processed / failed.

Non-atomic risk: steps 2–4 can partially succeed across multiple tables.

### 2. Shop Purchase
Current behavior (conceptual):
1. Verify item availability / pricing.
2. Debit wallet.
3. Grant inventory item(s) and/or unlock(s).
4. Persist purchase record / receipt.

Non-atomic risk: wallet changes can succeed without item/unlock grant (or vice versa).

### 3. Economy Debit/Credit
Current behavior (conceptual):
- Wallet balance + transaction ledger updates are performed via repository calls.

Non-atomic risk:
- balance updates separated from immutable ledger entry (or ledger written without balance change).

### 4. Inventory Grant/Remove
Current behavior (conceptual):
- Inventory state table and inventory transaction/audit table updates are performed via repository calls.

Non-atomic risk:
- item granted/removed without the corresponding inventory transaction entry.

### 5. Progression XP Grant
Current behavior (conceptual):
1. Add XP.
2. Compute level progression.
3. Persist progression state.

Non-atomic risk:
- XP increment without level calculation persistence (or partial progression state writes).

### 6. Unlock Grant
Current behavior (conceptual):
- Insert unlock & avoid duplicates.

Non-atomic risk:
- unlock granted without upstream purchase/reward request being committed.

## Risks We Must Eliminate

### Partial Success
- Wallet debited but inventory/unlock not granted.
- Inventory granted but purchase record not written.
- Reward request marked processed even though some reward side effects did not persist.

### Accounting Integrity
- Balance changed without a matching immutable ledger record.
- Ledger record written without a matching balance change.

### Incorrect Reward Request State
- Request marked `processed` incorrectly.
- Request marked processed but event/audit trail incomplete.

### Duplicate / Replay
- Duplicate processing of the same logical request (retry, replay, client race).
- Same purchase submitted twice.

### Race Conditions
- Concurrent debits causing negative or inconsistent balances.
- Concurrent item grants leading to incorrect stack counts.
- Concurrent unlock grants causing unique constraint errors or inconsistent state.

## Proposed RPC Strategy

### Design Principle
Each RPC:
1. accepts a stable `transaction_id` (idempotency key)
2. performs all persistence work inside a single database transaction
3. writes an immutable audit/ledger entry
4. returns a canonical result that the repository maps back into the service-facing response

### Candidate RPCs

#### `process_reward_request_rpc`
Purpose:
- Perform Reward Engine processing atomically:
  - ensure request idempotency
  - apply all side effects (economy, inventory, progression, unlock)
  - write audit trail
  - finalize request status

Suggested inputs:
- `player_id`
- `request_id` / `transaction_id` (stable)
- full reward payload (or normalized inputs)

Suggested outputs:
- final request status
- deltas applied (wallet, items, xp, unlocks)
- error code if failed

#### `process_shop_purchase_rpc`
Purpose:
- Atomically:
  - validate item + price
  - debit wallet
  - grant inventory/unlocks
  - persist purchase/receipt
  - ensure idempotency for retries

Suggested inputs:
- `player_id`
- `purchase_id` / `transaction_id` (stable)
- `shop_item_id`
- purchase context (quantity, currency)

Suggested outputs:
- receipt
- any grants/unlocks
- updated balances and/or deltas

#### `credit_wallet_rpc` / `debit_wallet_rpc` (if needed)
Purpose:
- Provide atomic, locked balance updates with ledger writes.
- May be used internally by other RPCs or as a public persistence primitive.

Notes:
- Prefer keeping these internal helpers called by higher-level RPCs unless there is a strong need for direct invocation.

Status:
- Implemented for Economy v2 in Phase 13 as the foundation for transactional orchestration.

#### `grant_inventory_item_rpc` / `remove_inventory_item_rpc` (if needed)
Purpose:
- Provide atomic inventory state updates + inventory transaction record.

Notes:
- Prefer calling via higher-level RPCs unless direct mutation endpoints require it.

#### `grant_xp_rpc` (if needed)
Purpose:
- Atomically grant XP and persist the derived progression state.

#### `grant_unlock_rpc` (if needed)
Purpose:
- Atomically grant an unlock with duplicate protection.

## Boundary Rules

### Layering
- API routes still call services.
- Services call repositories.
- Repositories invoke RPCs.

### Prohibited
- No SQL in API routes.
- No direct `supabase.from(...).update/insert` in API routes.
- No business logic in repositories beyond persistence/RPC invocation.

### Allowed
- Repositories may map RPC results into domain DTOs.
- Services may validate inputs and orchestrate *which* repository calls to make.
- Authentication is resolved at route boundary and passed down as `playerId` only.

## Migration Approach
Additive-only, flow-by-flow, with compatibility preserved.

1. Introduce RPC(s) for a single flow.
2. Add repository method(s) that call the RPC(s).
3. Update service layer to use the repository RPC method(s) behind a minimal switch or direct substitution.
4. Keep API contracts stable.
5. Observe audit/ledger correctness and replay behavior in logs.
6. Migrate next flow.

Do not remove existing non-RPC code until:
- the RPC path is stable
- idempotency behavior is verified
- replay handling is correct
- telemetry indicates no partial-write scenarios in production

## Recommended Implementation Order
1. Economy RPC foundation (atomic debit/credit + ledger correctness)
2. Inventory RPC foundation (atomic grant/remove + inventory ledger correctness)
3. Shop purchase RPC (ties Economy + Inventory/Unlock + receipt)
4. Reward Engine RPC (ties all authorities + reward request status + audit)
5. Progression/Unlock hardening (dedicated RPCs if needed; ensure concurrency correctness)

## Known Limitations
- Supabase JS does not expose multi-statement transactions directly from application code.
- RPC/stored procedures are the preferred production-safe path for multi-step atomic flows.

## Documentation Updates Required

### `docs/PROJECT_STATUS.md`
- Confirm Milestone 9B planning completion.
- Keep "Transactional Orchestration" as upcoming, but reference this document.

### `docs/REWARD_ENGINE_IMPLEMENTATION.md`
- Add a short note that Reward Engine is currently multi-call and will be migrated to `process_reward_request_rpc`.

## Acceptance Criteria (for this planning milestone)
- This document exists and matches the architecture constraints.
- No SQL/RPC implementation code is added in this milestone.
- `npm run lint` passes.
- `npm run build` passes.
