import { NextRequest } from 'next/server';
import { apiHandler } from '@/lib/api/handler';
import { playerCurrencyService } from '@/lib/services/playerCurrencyService';

// Temporary mock player identity for development
// TODO: replace with Supabase Auth user ID before production
function getMockPlayerId() {
  return '00000000-0000-0000-0000-000000000001';
}

export const GET = (req: NextRequest) =>
  apiHandler(req, async () => {
    const playerId = getMockPlayerId();
    const currency = await playerCurrencyService.getCurrency(playerId);
    return currency;
  });
