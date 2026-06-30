import { supabaseServer } from '../supabase/server';
import { ApiError } from '../api/errors';
import type { PlayerCurrency } from '../repositories/types';

export const playerCurrencyService = {
  async getCurrency(playerId: string): Promise<PlayerCurrency> {
    const client = supabaseServer;
    const { data, error } = await client.from('player_currency').select('*').eq('player_id', playerId).maybeSingle();

    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500);
    if (!data) throw new ApiError('NOT_FOUND', 'Currency record not found', 404);

    return data as PlayerCurrency;
  },
};
