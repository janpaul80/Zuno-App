import { NextRequest } from 'next/server'
import { apiHandler } from '@/lib/api/handler'
import { resolveAuthenticatedPlayerId } from '@/lib/auth/player'
import { questService } from '@/lib/services/questService'

export const GET = (req: NextRequest) =>
  apiHandler(req, async (request) => {
    const playerId = await resolveAuthenticatedPlayerId(request)
    return questService.getQuestsForPlayer(playerId)
  })
