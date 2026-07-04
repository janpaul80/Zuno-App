# Cloud Save Domain v1

**Version:** 1.0  
**Status:** Active

---

## Purpose
Defines the secure, server‑authoritative mechanisms for persisting non‑authoritative player data such as settings, checkpoints, and preferences. This ensures continuity between sessions while protecting authoritative server data such as economy, inventory, and progression.

---

## Server‑Authoritative Boundaries
Server exclusively controls and validates economy, inventory, progression, purchases, and unlocks. Cloud Save operates **outside** those domains and may store only non‑authoritative client configuration (
graphics, input bindings, HUD layout etc.).

---

## Client‑Authoritative Fields
The following client‑side state is allowed in the cloud document:
* configuration and preferences
* checkpoints and camera settings
* exploration state and tutorial flags
* UI and control bindings

---

## Document Schema
Cloud Save documents are persisted in the `player_cloud_saves` table under the `save_data` JSONB column. There is one active Cloud Save document per player, keyed by `player_id`.

| Field | Type | Description |
|-------|------|-------------|
| `saveVersion` | integer | Server‑incremented optimistic version number |
| `schemaVersion` | integer | Version of schema definition enforced by server |
| `updatedAt` | string (ISO) | Last update timestamp (UTC) |
| `checksum` | string (sha‑256) | Integrity checksum of `clientState` |
| `clientState` | object | JSON object of non‑authoritative client state |

### Request‑Only Field
| Field | Description |
|--------|-------------|
| `baseSaveVersion` | Version the client based its save on (used for optimistic concurrency) |

---

## Versioning
Cloud Save schema version is currently **1**, stored as `CLOUD_SAVE_SCHEMA_VERSION` in code. Future versions must be backward‑compatible or handled through migration inside the service layer.

---

## Checksum Validation
Each POST request must provide a `checksum` computed via SHA‑256 over the serialized `clientState` JSON. The server recomputes it and rejects mismatches with `400 BAD_REQUEST Checksum mismatch`.

---

## Payload Limit
Maximum allowed serialized payload size: **256 KB** (`MAX_CLOUD_SAVE_BYTES = 256 * 1024`). Requests exceeding the limit return `413 PAYLOAD_TOO_LARGE`.

---

## Conflict Handling
If `baseSaveVersion ≤ existing.saveVersion`, the request is rejected with `409 CONFLICT Outdated base save version`. Clients must re‑fetch the current state and retry.

---

## Security Considerations
* Schema and payload validated via Zod.
* `player_cloud_saves.player_id` is the primary key and references `players(id)` with cascading delete.
* Auth integration (Supabase Auth) pending — currently uses mock ID placeholder.
* No direct database calls in route handlers.
* Never accepts or overwrites authoritative gameplay data.

---

## Compliance
✅ No `any` types  
✅ Server-authoritative boundaries enforced  
✅ Validated with Zod and checksum  
✅ Repository → Service → API pattern  
✅ Lint + Build verified before commit