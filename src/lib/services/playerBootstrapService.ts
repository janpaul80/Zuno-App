import { ApiError } from '../api/errors';
import { supabaseServer } from '../supabase/server';
import { economyService } from './economyService'
import { inventoryService } from './inventoryService'
import { playerCurrencyService } from './playerCurrencyService'
import { playerInventoryService } from './playerInventoryService'
import type {
  Player,
  PlayerProfile,
  PlayerCurrency,
  PlayerInventoryItem,
} from '../repositories/types';

export interface PlayerSummary {
  player: Player;
  profile: PlayerProfile;
  currency: PlayerCurrency;
  inventory: PlayerInventoryItem[];
}

export const playerBootstrapService = {
  async bootstrap(playerId: string): Promise<PlayerSummary> {
    const client = supabaseServer;

    // 1. Ensure player
    const { data: player, error: playerErr } = await client
      .from('players')
      .select('*')
      .eq('id', playerId)
      .maybeSingle();

    if (playerErr) throw new ApiError('INTERNAL_ERROR', playerErr.message, 500);

    let currentPlayer = player;
    if (!currentPlayer) {
      const { data: newPlayer, error: createErr } = await client
        .from('players')
        .insert({ id: playerId, username: `player_${playerId.substring(0, 8)}` })
        .select('*')
        .maybeSingle();
      if (createErr) throw new ApiError('INTERNAL_ERROR', createErr.message, 500);
      currentPlayer = newPlayer;
    }

    // 2. Ensure profile
    const { data: profile, error: profErr } = await client
      .from('player_profiles')
      .select('*')
      .eq('player_id', playerId)
      .maybeSingle();

    if (profErr) throw new ApiError('INTERNAL_ERROR', profErr.message, 500);

    let currentProfile = profile;
    if (!currentProfile) {
      const { data: newProf, error: insertProfErr } = await client
        .from('player_profiles')
        .insert({ player_id: playerId, display_name: currentPlayer.username })
        .select('*')
        .maybeSingle();
      if (insertProfErr) throw new ApiError('INTERNAL_ERROR', insertProfErr.message, 500);
      currentProfile = newProf;
    }

    // 3. Ensure wallet (Economy v2)
    // Bootstrap should not write to legacy `player_currency`.
    await economyService.ensureWallet(playerId)

    // 4. Ensure starter inventory (Inventory v2)
    // Bootstrap should not write to legacy `player_inventory`.
    await inventoryService.ensureItem({
      transactionId: `bootstrap:${playerId}:explorer-suit`,
      playerId,
      itemId: 'explorer_suit_default',
      quantity: 1,
      sourceDomain: 'bootstrap',
      sourceReference: 'starter_inventory',
      requestId: `bootstrap:${playerId}`,
      metadata: { starterItem: true },
    })

    // Return legacy shapes sourced from v2 authority stores.
    const currentCurrency = await playerCurrencyService.getCurrency(playerId)
    const currentInventory = await playerInventoryService.getInventory(playerId)

    return {
      player: currentPlayer,
      profile: currentProfile,
      currency: currentCurrency,
      inventory: currentInventory,
    };
  },
};
