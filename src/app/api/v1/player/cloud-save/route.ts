import { NextRequest } from 'next/server'
import { apiHandler } from '@/lib/api/handler'
import { z } from 'zod'
import { cloudSaveService } from '@/lib/services/cloudSaveService'
import { MAX_CLOUD_SAVE_BYTES } from '@/lib/config/constants'
import { ApiError } from '@/lib/api/errors'
import { resolveAuthenticatedPlayerId } from '@/lib/auth/player'

const CloudSaveSchema = z.object({
  baseSaveVersion: z.number().int().nonnegative().optional().default(0),
  schemaVersion: z.number().int().positive(),
  checksum: z.string().length(64),
  clientState: z.record(z.string(), z.unknown()),
})

export const GET = (req: NextRequest) =>
  apiHandler(req, async (request) => {
    const playerId = await resolveAuthenticatedPlayerId(request)
    const summary = await cloudSaveService.getCloudSaveSummary(playerId)
    return summary
  })

export const POST = (req: NextRequest) =>
  apiHandler(req, async (request) => {
    const playerId = await resolveAuthenticatedPlayerId(request)
    const json = await req.json().catch(() => {
      throw new ApiError('BAD_REQUEST', 'Invalid JSON body', 400)
    })

    const parsed = CloudSaveSchema.safeParse(json)

    if (!parsed.success) {
      const message =
        parsed.error.issues.length > 0
          ? parsed.error.issues[0].message
          : 'Invalid request body'

      throw new ApiError('BAD_REQUEST', message, 400)
    }

    const data = parsed.data

    const bytes = Buffer.byteLength(JSON.stringify(data.clientState), 'utf8')
    if (bytes > MAX_CLOUD_SAVE_BYTES) {
      throw new ApiError(
        'PAYLOAD_TOO_LARGE',
        'Cloud save exceeds maximum allowed size',
        413,
      )
    }

    const result = await cloudSaveService.saveCloudSave(playerId, data)
    return result
  })
