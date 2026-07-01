import { NextRequest } from 'next/server'
import { apiHandler } from '@/lib/api/handler'
import { achievementService } from '@/lib/services/achievementService'

function getMockPlayerId() {
  return '00000000-0000-0000-0000-000000000001'
}

export const GET = (req: NextRequest) =>
  apiHandler(req, async () => {
    const playerId = getMockPlayerId()
    return achievementService.getAchievementsForPlayer(playerId)
  })
