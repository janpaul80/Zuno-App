import { ShopItem, Purchase } from './types';

// Interface defining signatures for shop and marketplace repositories.
export interface ShopRepository {
  // Shop item operations
  listItems(): Promise<ShopItem[]>;
  getItemById(itemId: string): Promise<ShopItem | null>;

  // Purchase operations
  createPurchase(purchase: Omit<Purchase, 'id' | 'created_at'>): Promise<Purchase>;
  listPurchasesByPlayer(playerId: string): Promise<Purchase[]>;
}
