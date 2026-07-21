import { describe, expect, it } from 'vitest'

import { toPlayerContextSnapshot } from './snapshotAdapter'

describe('toPlayerContextSnapshot', () => {
  it('uses JSON round-trip semantics and deep-freezes the result', () => {
    const snapshot = toPlayerContextSnapshot({
      date: new Date('2026-07-21T00:00:00.000Z'),
      missing: undefined,
      notANumber: Number.NaN,
      nested: { items: ['guardian', 1, true, null] },
    })

    expect(snapshot).toEqual({
      snapshot: {
        date: '2026-07-21T00:00:00.000Z',
        notANumber: null,
        nested: { items: ['guardian', 1, true, null] },
      },
      meta: { schemaVersion: 1 },
    })
    expect(Object.isFrozen(snapshot.snapshot)).toBe(true)
    expect(Object.isFrozen((snapshot.snapshot as { nested: object }).nested)).toBe(true)
  })

  it('rejects bigint values', () => {
    expect(() => toPlayerContextSnapshot({ coins: BigInt(1) })).toThrow()
  })

  it('rejects circular references', () => {
    const circular: Record<string, unknown> = {}
    circular.self = circular

    expect(() => toPlayerContextSnapshot(circular)).toThrow()
  })
})
