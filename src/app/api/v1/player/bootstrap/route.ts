import { NextRequest } from 'next/server';
import { apiHandler } from '@/lib/api/handler';
import { playerBootstrapService } from '@/lib/services/playerBootstrapService';

// Temporary simulated authentication (placeholder until real auth pipeline)
function getMockPlayerId() {
  // Generate a static mock UUID for now
  return '00000000-0000-0000-0000-000000000001';
}

export const POST = (req: NextRequest) =>
  apiHandler(req, async () => {
    const playerId = getMockPlayerId();
    const summary = await playerBootstrapService.bootstrap(playerId);
    return summary;
  });
