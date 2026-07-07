import { NextRequest } from 'next/server'
import { ApiError } from '@/lib/api/errors'
import { supabaseAuthServer } from '@/lib/supabase/server'

function getBearerToken(req: NextRequest): string | null {
  const authorization = req.headers.get('authorization')
  if (!authorization) return null

  const [scheme, token] = authorization.split(' ')
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return null
  }

  return token
}

// API boundary helper. Converts a Supabase access token into the canonical playerId.
export async function resolveAuthenticatedPlayerId(req: NextRequest): Promise<string> {
  const token = getBearerToken(req)

  if (!token) {
    throw new ApiError('UNAUTHORIZED', 'Missing Supabase access token', 401)
  }

  const { data, error } = await supabaseAuthServer.auth.getUser(token)
  if (error || !data.user) {
    throw new ApiError('UNAUTHORIZED', 'Invalid or expired Supabase access token', 401)
  }

  return data.user.id
}
