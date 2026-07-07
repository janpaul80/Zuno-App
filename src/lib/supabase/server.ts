import { createClient } from '@supabase/supabase-js'
import { getEnv } from '../config/env'

// Service role should only be used on server-side contexts.
export function getSupabaseServer() {
  const env = getEnv()
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
}

// Auth server is used for validating bearer tokens at the API boundary.
// It uses the anon key, not the service key, to reduce secret blast radius.
export function getSupabaseAuthServer() {
  const env = getEnv()
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export const supabaseServer = getSupabaseServer()
export const supabaseAuthServer = getSupabaseAuthServer()
