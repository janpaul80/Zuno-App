import { NextRequest } from 'next/server'
import { apiHandler } from '@/lib/api/handler'
import { resolveAuthenticatedPlayerId } from '@/lib/auth/player'
import { achievementService } from '@/lib/services/achievementService'

export const GET = (req: NextRequest) =>
  apiHandler(req, async (request) => {
    const playerId = await resolveAuthenticatedPlayerId(request)
    return achievementService.getAchievementsForPlayer(playerId)
  })
