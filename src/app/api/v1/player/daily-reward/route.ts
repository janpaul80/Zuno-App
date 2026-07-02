import { NextRequest } from 'next/server'
import { apiHandler } from '@/lib/api/handler'
import { dailyRewardService } from '@/lib/services/dailyRewardService'

function getMockPlayerId() {
  // TODO: Replace with Supabase Auth session-based player ID
  return '00000000-0000-0000-0000-000000000003'
}

export const GET = (req: NextRequest) =>
  apiHandler(req, async () => {
    const playerId = getMockPlayerId()
    return dailyRewardService.getDailyRewardSummary(playerId)
  })
