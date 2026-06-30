import { NextRequest } from 'next/server';
import { apiHandler } from '@/lib/api/handler';
import { shopRepository } from '@/lib/repositories/shopRepository';

export const GET = (req: NextRequest) =>
  apiHandler(req, async () => {
    const items = await shopRepository.listActiveItems();
    return items;
  });
