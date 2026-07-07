import { NextRequest } from 'next/server';
import { apiHandler } from '@/lib/api/handler';
import { resolveAuthenticatedPlayerId } from '@/lib/auth/player';
import { playerBootstrapService } from '@/lib/services/playerBootstrapService';

export const POST = (req: NextRequest) =>
  apiHandler(req, async (request) => {
    const playerId = await resolveAuthenticatedPlayerId(request);
    const summary = await playerBootstrapService.bootstrap(playerId);
    return summary;
  });
