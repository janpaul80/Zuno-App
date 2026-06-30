import { supabaseServer } from '../supabase/server';
import { ApiError } from '../api/errors';
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

    // 3. Ensure currency
    const { data: currency, error: curErr } = await client
      .from('player_currency')
      .select('*')
      .eq('player_id', playerId)
      .maybeSingle();

    let currentCurrency = currency;
    if (!currentCurrency) {
      const { data: newCur, error: newCurErr } = await client
        .from('player_currency')
        .insert({ player_id: playerId, coins: 0, gems: 0 })
        .select('*')
        .maybeSingle();
      if (newCurErr) throw new ApiError('INTERNAL_ERROR', newCurErr.message, 500);
      currentCurrency = newCur;
    }

    // 4. Ensure starter inventory (Explorer Suit)
    const { data: existingInv } = await client
      .from('player_inventory')
      .select('*')
      .eq('player_id', playerId);

    const currentInventory: PlayerInventoryItem[] = existingInv || [];

    const hasExplorerSuit = currentInventory.some(
      (i: PlayerInventoryItem) => i.item_id === 'explorer_suit_default',
    );
    if (!hasExplorerSuit) {
      const { error: invErr } = await client
        .from('player_inventory')
        .insert({ player_id: playerId, item_id: 'explorer_suit_default', quantity: 1 });
      if (invErr) throw new ApiError('INTERNAL_ERROR', invErr.message, 500);
    }

    return {
      player: currentPlayer,
      profile: currentProfile,
      currency: currentCurrency,
      inventory: currentInventory,
    };
  },
};
