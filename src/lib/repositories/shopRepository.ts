import { ShopItem } from './types';
import { supabaseClient } from '../supabase/client';
import { ApiError } from '../api/errors';

export interface ShopRepository {
  listItems(): Promise<ShopItem[]>;
  getItemById(itemId: string): Promise<ShopItem | null>;
}

export const shopRepository: ShopRepository = {
  async listItems(): Promise<ShopItem[]> {
    const { data, error } = await supabaseClient
      .from('shop_items')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      throw new ApiError('INTERNAL_ERROR', `Failed to list shop items: ${error.message}`, 500, error);
    }

    return data as ShopItem[];
  },

  async getItemById(itemId: string): Promise<ShopItem | null> {
    const { data, error } = await supabaseClient
      .from('shop_items')
      .select('*')
      .eq('id', itemId)
      .maybeSingle();

    if (error) {
      throw new ApiError('NOT_FOUND', `Error fetching shop item: ${error.message}`, 404, error);
    }

    return data as ShopItem | null;
  },
};
