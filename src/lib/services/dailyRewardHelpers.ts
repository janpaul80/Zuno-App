export const DAILY_REWARD_SOURCE_DOMAIN = 'daily_rewards'

export function isEligibleToClaim(nextEligibleClaimAt: string | null): boolean {
  if (!nextEligibleClaimAt) {
    return true
  }

  return Date.now() >= new Date(nextEligibleClaimAt).getTime()
}

export interface RewardDayDefinition {
  day: number
}

export function resolveNextRewardDay(
  definitions: RewardDayDefinition[],
  currentStreak: number,
): number {
  if (definitions.length === 0) {
    return 1
  }

  // Definitions are expected to be sorted by `day` ascending.
  const maxDay = definitions[definitions.length - 1].day
  const nextDay = currentStreak + 1

  return nextDay > maxDay ? 1 : nextDay
}

export function buildDailyRewardRequestId(playerId: string, claimNumber: number): string {
  return `${DAILY_REWARD_SOURCE_DOMAIN}:${playerId}:claim:${claimNumber}`
}
