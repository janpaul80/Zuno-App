import { NextRequest } from 'next/server';
import { z } from 'zod';
import { apiHandler } from '@/lib/api/handler';
import { shopPurchaseService } from '@/lib/services/shopPurchaseService';
import { ApiError } from '@/lib/api/errors';

// Temporary mock player identity for development
// TODO: replace with authenticated Supabase user ID before production
function getMockPlayerId() {
  return '00000000-0000-0000-0000-000000000001';
}

const PurchaseRequestSchema = z.object({
  itemId: z.string().min(1, 'itemId is required'),
  idempotencyKey: z.string().min(1, 'idempotencyKey is required'),
});

export const POST = (req: NextRequest) =>
  apiHandler(req, async () => {
    const body = await req.json().catch(() => {
      throw new ApiError('BAD_REQUEST', 'Invalid JSON body', 400);
    });

    const parse = PurchaseRequestSchema.safeParse(body);
    if (!parse.success) {
      const message = parse.error.issues && parse.error.issues.length > 0
        ? parse.error.issues[0].message
        : 'Invalid request body';
      throw new ApiError('BAD_REQUEST', message, 400);
    }

    const { itemId, idempotencyKey } = parse.data;
    const playerId = getMockPlayerId();

    const result = await shopPurchaseService.purchase(playerId, itemId, 'coins', idempotencyKey);
    return {
      purchase_id: result.purchase_id,
      item: result.item,
      currency: result.new_currency,
      inventory_item: result.inventory_item,
    };
  });
