import { NextRequest } from 'next/server'
import { z } from 'zod'

import { apiHandler } from '@/lib/api/handler'
import { ApiError } from '@/lib/api/errors'
import { resolveAuthenticatedPlayerId } from '@/lib/auth/player'
import { aiDirectorService } from '@/lib/services/aiDirectorService'
import { extractRequestId, generateRequestId } from '@/lib/api/requestId'

const DirectorMessageSchema = z.object({
  message: z.string().min(1, 'message is required'),
  // Allows the client to keep multiple parallel chats if desired.
  conversationId: z.string().min(1).optional(),
  // e.g. 'en', 'es', 'pt-BR'
  locale: z.string().min(2).max(10).optional(),
})

export const POST = (req: NextRequest) =>
  apiHandler(req, async (request) => {
    const body = await req.json().catch(() => {
      throw new ApiError('BAD_REQUEST', 'Invalid JSON body', 400)
    })

    const parse = DirectorMessageSchema.safeParse(body)
    if (!parse.success) {
      const message =
        parse.error.issues && parse.error.issues.length > 0
          ? parse.error.issues[0].message
          : 'Invalid request body'
      throw new ApiError('BAD_REQUEST', message, 400)
    }

    const playerId = await resolveAuthenticatedPlayerId(request)
    const requestId = extractRequestId(request) ?? generateRequestId()

    // AI Director is advisory/orchestration only. It MUST NOT mutate gameplay state.
    return aiDirectorService.replyToPlayerMessage({
      playerId,
      message: parse.data.message,
      conversationId: parse.data.conversationId,
      locale: parse.data.locale,
      requestId,
    })
  })
