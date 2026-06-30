import { NextRequest } from 'next/server';
import { apiHandler } from '@/lib/api/handler';
import { playerProfileService } from '@/lib/services/playerProfileService';

// Temporary mock player identity for development
// TODO: replace with authenticated Supabase user ID before production
function getMockPlayerId() {
  return '00000000-0000-0000-0000-000000000001';
}

export const GET = (req: NextRequest) =>
  apiHandler(req, async () => {
    const playerId = getMockPlayerId();
    const summary = await playerProfileService.getProfileSummary(playerId);
    return summary;
  });
