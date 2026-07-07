import { NextRequest } from 'next/server';
import { apiHandler } from '@/lib/api/handler';
import { resolveAuthenticatedPlayerId } from '@/lib/auth/player';
import { playerInventoryService } from '@/lib/services/playerInventoryService';

export const GET = (req: NextRequest) =>
  apiHandler(req, async (request) => {
    const playerId = await resolveAuthenticatedPlayerId(request);
    const inventory = await playerInventoryService.getInventory(playerId);
    return inventory;
  });
