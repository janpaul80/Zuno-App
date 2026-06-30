import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env';

// Service role should only be used on server-side contexts.
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseServer = createClient(supabaseUrl, serviceRoleKey);
