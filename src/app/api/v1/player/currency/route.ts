import { NextRequest } from 'next/server';
import { apiHandler } from '@/lib/api/handler';
import { resolveAuthenticatedPlayerId } from '@/lib/auth/player';
import { playerCurrencyService } from '@/lib/services/playerCurrencyService';

export const GET = (req: NextRequest) =>
  apiHandler(req, async (request) => {
    const playerId = await resolveAuthenticatedPlayerId(request);
    const currency = await playerCurrencyService.getCurrency(playerId);
    return currency;
  });
