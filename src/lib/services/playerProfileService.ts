import { supabaseServer } from '../supabase/server';
import { ApiError } from '../api/errors';
import type {
  Player,
  PlayerProfile,
  PlayerCurrency,
  PlayerInventoryItem,
} from '../repositories/types';
import type { PlayerSummary } from './playerBootstrapService';
import { playerCurrencyService } from './playerCurrencyService'
import { playerInventoryService } from './playerInventoryService'

export const playerProfileService = {
  async getProfileSummary(playerId: string): Promise<PlayerSummary> {
    const client = supabaseServer;

    const { data: player, error: pErr } = await client.from('players').select('*').eq('id', playerId).maybeSingle();
    if (pErr) throw new ApiError('INTERNAL_ERROR', pErr.message, 500);
    if (!player) throw new ApiError('NOT_FOUND', 'Player not found', 404);

    const { data: profile } = await client.from('player_profiles').select('*').eq('player_id', playerId).maybeSingle();
    const currency = await playerCurrencyService.getCurrency(playerId)
    const inventory = await playerInventoryService.getInventory(playerId)

    return {
      player: player as Player,
      profile: profile as PlayerProfile,
      currency: currency as PlayerCurrency,
      inventory: (inventory as PlayerInventoryItem[]) ?? [],
    };
  },
};
