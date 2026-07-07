import { NextRequest } from 'next/server';
import { apiHandler } from '@/lib/api/handler';
import { resolveAuthenticatedPlayerId } from '@/lib/auth/player';
import { playerProfileService } from '@/lib/services/playerProfileService';

export const GET = (req: NextRequest) =>
  apiHandler(req, async (request) => {
    const playerId = await resolveAuthenticatedPlayerId(request);
    const summary = await playerProfileService.getProfileSummary(playerId);
    return summary;
  });
