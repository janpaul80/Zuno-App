import { NextRequest } from 'next/server';
import { apiHandler } from '@/lib/api/handler';
import { resolveAuthenticatedPlayerId } from '@/lib/auth/player';
import { shopRepository } from '@/lib/repositories/shopRepository';

export const GET = (req: NextRequest) =>
  apiHandler(req, async () => {
    // Authenticated catalog access aligns with shop_items RLS policy.
    await resolveAuthenticatedPlayerId(req);
    const items = await shopRepository.listActiveItems();
    return items;
  });
