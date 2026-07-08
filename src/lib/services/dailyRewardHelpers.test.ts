import { describe, expect, it } from 'vitest'

import {
  buildDailyRewardRequestId,
  isEligibleToClaim,
  resolveNextRewardDay,
} from './dailyRewardHelpers'

describe('dailyRewardHelpers', () => {
  it('isEligibleToClaim returns true when nextEligibleClaimAt is null', () => {
    expect(isEligibleToClaim(null)).toBe(true)
  })

  it('isEligibleToClaim returns false for future timestamps', () => {
    const future = new Date(Date.now() + 60_000).toISOString()
    expect(isEligibleToClaim(future)).toBe(false)
  })

  it('isEligibleToClaim returns true for past timestamps', () => {
    const past = new Date(Date.now() - 60_000).toISOString()
    expect(isEligibleToClaim(past)).toBe(true)
  })

  it('resolveNextRewardDay wraps around after last day', () => {
    const defs = [{ day: 1 }, { day: 2 }, { day: 3 }]
    expect(resolveNextRewardDay(defs, 0)).toBe(1)
    expect(resolveNextRewardDay(defs, 1)).toBe(2)
    expect(resolveNextRewardDay(defs, 2)).toBe(3)
    expect(resolveNextRewardDay(defs, 3)).toBe(1)
  })

  it('buildDailyRewardRequestId is deterministic', () => {
    expect(buildDailyRewardRequestId('player', 7)).toBe('daily_rewards:player:claim:7')
  })
})
