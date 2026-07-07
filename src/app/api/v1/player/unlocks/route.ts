import { NextRequest } from 'next/server';
import { apiHandler } from '@/lib/api/handler';
import { resolveAuthenticatedPlayerId } from '@/lib/auth/player';
import { unlockService } from '@/lib/services/unlockService';

export const GET = (req: NextRequest) =>
  apiHandler(req, async (request) => {
    const playerId = await resolveAuthenticatedPlayerId(request);
    const unlocks = await unlockService.getPlayerUnlocks(playerId);
    return unlocks;
  });
