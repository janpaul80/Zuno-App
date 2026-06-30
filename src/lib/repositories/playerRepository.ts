import { Player, PlayerProfile, PlayerCurrency, PlayerInventoryItem, Purchase } from './types';

// Interface defining signatures for player‑related repositories.
export interface PlayerRepository {
  // Player basic info
  getPlayerById(playerId: string): Promise<Player | null>;
  createPlayer(username: string, email?: string): Promise<Player>;

  // Profiles
  getProfile(playerId: string): Promise<PlayerProfile | null>;
  updateProfile(playerId: string, data: Partial<PlayerProfile>): Promise<PlayerProfile>;

  // Currency operations
  getCurrency(playerId: string): Promise<PlayerCurrency | null>;
  updateCurrency(playerId: string, changes: Partial<PlayerCurrency>): Promise<PlayerCurrency>;

  // Inventory operations
  getInventory(playerId: string): Promise<PlayerInventoryItem[]>;
  addInventoryItem(playerId: string, itemId: string, quantity?: number): Promise<void>;
  removeInventoryItem(playerId: string, itemId: string, quantity?: number): Promise<void>;

  // Purchases
  listPurchases(playerId: string): Promise<Purchase[]>;
  recordPurchase(purchase: Omit<Purchase, 'id' | 'created_at'>): Promise<Purchase>;
}
