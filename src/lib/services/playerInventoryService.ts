import { supabaseServer } from '../supabase/server';
import { ApiError } from '../api/errors';
import type { PlayerInventoryItem } from '../repositories/types';

export const playerInventoryService = {
  async getInventory(playerId: string): Promise<PlayerInventoryItem[]> {
    const client = supabaseServer;
    const { data, error } = await client.from('player_inventory').select('*').eq('player_id', playerId);

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500);
    return (data as PlayerInventoryItem[]) || [];
  },
};
