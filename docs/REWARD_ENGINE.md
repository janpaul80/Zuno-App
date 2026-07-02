# Reward Engine

Version: 1.0
Status: Architecture Approved

## 1. Purpose
The Reward Engine is the sole authority responsible for orchestrating all gameplay rewards under ADR-003.

It exists to centralize reward mutation handling so gameplay domains never directly grant or modify XP, currency, inventory, unlocks, or reward bundles.

## 2. Responsibilities
The Reward Engine is responsible for orchestrating:
- XP grants
- currency grants
- inventory item grants
- unlock grants
- reward bundles
- reward validation
- audit logging
- idempotency enforcement
- failure handling

## 3. Reward Flow
```text
Gameplay Domain
        ↓
Reward Engine
        ↓
Economy
Inventory
Progression
Unlocks
        ↓
Repositories
        ↓
Supabase
```

## 4. Reward Request Contract
Canonical `RewardRequest` shape:

```ts
interface RewardRequest {
  requestId: string
  playerId: string
  sourceDomain: string
  sourceReference: string
  rewards: RewardEntry[]
  metadata: Record<string, unknown>
  createdAt: string
}

interface RewardEntry {
  type: 'xp' | 'coins' | 'gems' | 'inventory_item' | 'unlock' | 'bundle'
  amount?: number
  itemId?: string
  unlockKey?: string
  bundleId?: string
}
```

## 5. Reward Types
Supported reward categories:
- XP
- Coins
- Gems
- Inventory Items
- Unlocks
- Reward Bundles

Reward bundles are composed reward payloads that may expand into multiple RewardEntry objects during processing.

## 6. Idempotency
Reward Engine must prevent duplicate reward application.

Primary rule:
- Duplicate `requestId` values must not re-apply rewards.

Idempotency expectations:
- requests are recorded before execution where practical
- duplicate requests return the prior result or a safe no-op response
- gameplay domains must provide stable source identifiers

## 7. Audit Trail
Every processed reward should produce an immutable audit record.

Minimum audit fields:
- playerId
- sourceDomain
- rewardType
- amount
- timestamp
- requestId
- status

Additional fields may include:
- sourceReference
- metadata
- processing notes
- failure reason

## 8. Failure Handling
Reward processing must be atomic wherever practical.

Rules:
- partial reward application should be avoided
- multi-step reward operations should use transactions where possible
- retry behavior must remain idempotent
- failures must be logged against the reward request and audit trail
- replaying a failed request must not create duplicate grants

## 9. Integration Matrix
Initial domains expected to call Reward Engine:
- Achievements
- Quests
- Daily Rewards
- Purchases
- Promo Codes
- LiveOps
- Battle Pass
- Seasonal Events

Future domains may be added without changing Reward Engine architecture.

## 10. Non-Goals
Reward Engine does not:
- expose gameplay logic
- determine eligibility
- calculate quest progress
- determine achievement completion
- manage matchmaking

Its responsibility begins only after a gameplay domain produces a validated reward request.

## Architectural Notes
- Economy v2 remains the balance authority for currency.
- Reward Engine orchestrates downstream services; it does not replace their internal responsibilities.
- Gameplay domains remain responsible for their own validation and completion logic.

## Implementation Direction
Reward Engine v1 should be implemented only after this document is approved and should follow this specification rather than redesigning reward orchestration during coding.
