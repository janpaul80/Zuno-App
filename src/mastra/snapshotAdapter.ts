export type JsonPrimitive = string | number | boolean | null
export type JsonValue = JsonPrimitive | JsonObject | JsonArray
export type JsonObject = { [key: string]: JsonValue }
export type JsonArray = JsonValue[]

export interface PlayerContextSnapshotEnvelope {
  snapshot: Readonly<JsonValue>
  meta: {
    schemaVersion: 1
  }
}

function deepFreeze<T>(value: T): Readonly<T> {
  if (value === null || typeof value !== 'object' || Object.isFrozen(value)) {
    return value
  }

  for (const child of Object.values(value)) {
    deepFreeze(child)
  }

  return Object.freeze(value)
}

/**
 * Creates the exact JSON snapshot sent to the AI Director. The stringify/parse
 * round trip deliberately follows JSON semantics and rejects unsupported
 * values such as bigint and circular references.
 */
export function toPlayerContextSnapshot(
  context: unknown,
): PlayerContextSnapshotEnvelope {
  const serialized = JSON.stringify(context)
  if (serialized === undefined) {
    throw new TypeError('Player context cannot be represented as JSON')
  }

  const parsed = JSON.parse(serialized) as JsonValue
  return {
    snapshot: deepFreeze(parsed),
    meta: { schemaVersion: 1 },
  }
}
