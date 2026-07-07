import { NextRequest } from 'next/server'
import { apiHandler } from '@/lib/api/handler'
import { resolveAuthenticatedPlayerId } from '@/lib/auth/player'
import { dailyRewardService } from '@/lib/services/dailyRewardService'

export const GET = (req: NextRequest) =>
  apiHandler(req, async (request) => {
    const playerId = await resolveAuthenticatedPlayerId(request)
    return dailyRewardService.getDailyRewardSummary(playerId)
  })
