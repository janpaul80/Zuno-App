# 03_ENGINEERING_STANDARDS.md

## Reward Engine Authority
- The **Reward Engine** is the sole system permitted to grant or modify rewards across all domains.
- Authorized reward types: XP, Currency, Inventory Items, Unlocks, Reward Bundles.
- Gameplay domains must emit validated reward requests to the Reward Engine and may not directly perform grants.
- Reward Engine then routes updates to:
  - Economy Service (currency)
  - Inventory Service (items)
  - Progression Service (XP/level)
  - Unlock Service (unlocks)

## Economy Authority
- The **Economy Domain v2** is the exclusive authority for modifying player balances.
- Every currency adjustment requires creating a transaction record including:
  - player ID
  - source domain
  - reason
  - amount (+/‑)
  - timestamp
  - request ID
- No other service may modify currency directly.

## Enforcement Rules
1. All reward or economy‑affecting actions must pass through server‑authoritative services.
2. No direct Supabase write operations from gameplay domains.
3. All balance‑affecting operations must be auditable.
4. Game logic must not contain embedded reward/mutation logic — call the Reward Engine instead.

## Compliance
- Code reviews must verify adherence to these standards.
- Violations are considered architecture breaches and blocked from merge.
