import { ApiError } from '../api/errors';
import type { PlayerCurrency } from '../repositories/types';
import { economyService } from './economyService'

export const playerCurrencyService = {
  async getCurrency(playerId: string): Promise<PlayerCurrency> {
    if (!playerId) {
      throw new ApiError('BAD_REQUEST', 'playerId is required', 400)
    }

    const wallet = await economyService.getBalance(playerId)

    // Legacy response shape for compatibility with existing client/UI.
    return {
      id: playerId,
      player_id: playerId,
      coins: wallet.coins,
      gems: wallet.gems,
      updated_at: wallet.updated_at,
    }
  },
};
