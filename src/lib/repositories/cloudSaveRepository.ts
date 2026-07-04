import { supabaseServer } from '../supabase/server';
import { ApiError } from '../api/errors';

export interface CloudSaveDocument {
  saveVersion: number;
  schemaVersion: number;
  updatedAt: string;
  checksum: string;
  clientState: Record<string, unknown>;
}

export const cloudSaveRepository = {
  async getByPlayerId(playerId: string): Promise<CloudSaveDocument | null> {
    const { data, error } = await supabaseServer
      .from('player_cloud_saves')
      .select('save_data')
      .eq('player_id', playerId)
      .maybeSingle();
    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500);
    if (!data) return null;
    return data.save_data as CloudSaveDocument;
  },

  async upsert(playerId: string, document: CloudSaveDocument): Promise<CloudSaveDocument> {
    const { error } = await supabaseServer
      .from('player_cloud_saves')
      .upsert({ player_id: playerId, save_data: document }, { onConflict: 'player_id' });
    if (error) throw new ApiError('INTERNAL_ERROR', error.message, 500);
    return document;
  },
};