import { createClient } from '@supabase/supabase-js';
import { getEnv } from '../config/env';

// Service role should only be used on server-side contexts.
export function getSupabaseServer() {
  const env = getEnv();
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
}

export const supabaseServer = getSupabaseServer();
