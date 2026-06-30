import { createClient } from '@supabase/supabase-js';
import { getEnv } from '../config/env';

// Lazy Supabase client initialization based on validated environment.
export function getSupabaseClient() {
  const env = getEnv();
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// Singleton reference (optional lazy init to avoid early failure)
export const supabaseClient = getSupabaseClient();
