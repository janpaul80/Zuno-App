// Core entity type definitions for repository layer

export interface Player {
  id: string;
  username: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

export interface PlayerProfile {
  id: string;
  player_id: string;
  display_name?: string;
  avatar_url?: string;
  level: number;
  experience: number;
  created_at: string;
  updated_at: string;
}

export interface PlayerCurrency {
  id: string;
  player_id: string;
  coins: number;
  gems: number;
  updated_at: string;
}

export interface PlayerInventoryItem {
  id: string;
  player_id: string;
  item_id: string;
  quantity: number;
  created_at: string;
}

export interface ShopItem {
  id: string;
  name: string;
  description?: string;
  price_coins: number;
  price_gems: number;
  category: string;
  is_active: boolean;
  is_consumable: boolean;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  player_id: string;
  item_id: string;
  quantity: number;
  total_cost_coins: number;
  total_cost_gems: number;
  currency_type: 'coins' | 'gems';
  price: number;
  idempotency_key: string;
  status: 'pending' | 'completed' | 'failed';
  completed_at: string | null;
  created_at: string;
}
