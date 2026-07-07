import type { PlayerInventoryItem } from '../repositories/types';
import { inventoryService } from './inventoryService'

export const playerInventoryService = {
  async getInventory(playerId: string): Promise<PlayerInventoryItem[]> {
    const inventory = await inventoryService.getInventory(playerId)

    // Legacy response shape for compatibility with existing client/UI.
    return inventory.map((record) => ({
      id: `${record.player_id}:${record.item_id}`,
      player_id: record.player_id,
      item_id: record.item_id,
      quantity: record.quantity,
      created_at: record.updated_at,
    }))
  },
};
