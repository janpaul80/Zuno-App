import { createHash } from 'crypto'
import { ApiError } from '../api/errors'
import { MAX_CLOUD_SAVE_BYTES, CLOUD_SAVE_SCHEMA_VERSION } from '../config/constants'
import { cloudSaveRepository, CloudSaveDocument } from '../repositories/cloudSaveRepository'
import { playerProfileService } from '../services/playerProfileService'
import { playerCurrencyService } from '../services/playerCurrencyService'
import { playerInventoryService } from '../services/playerInventoryService'

function sha256(data: Record<string, unknown>): string {
  return createHash('sha256').update(JSON.stringify(data)).digest('hex')
}

export const cloudSaveService = {
  async getCloudSaveSummary(playerId: string) {
    const cloudSave = await cloudSaveRepository.getByPlayerId(playerId)
    const profile = await playerProfileService.getProfileSummary(playerId)
    const currency = await playerCurrencyService.getCurrency(playerId)
    const inventory = await playerInventoryService.getInventory(playerId)

    return {
      player: { id: playerId },
      profile,
      currency,
      inventory,
      cloudSave,
    }
  },

  async saveCloudSave(
    playerId: string,
    requestBody: {
      baseSaveVersion: number
      schemaVersion: number
      checksum: string
      clientState: Record<string, unknown>
    },
  ): Promise<CloudSaveDocument> {
    const { baseSaveVersion, schemaVersion, checksum, clientState } = requestBody

    if (schemaVersion !== CLOUD_SAVE_SCHEMA_VERSION) {
      throw new ApiError('BAD_REQUEST', 'Schema version mismatch', 400)
    }

    const sizeBytes = Buffer.byteLength(JSON.stringify(clientState), 'utf8')
    if (sizeBytes > MAX_CLOUD_SAVE_BYTES) {
      throw new ApiError('BAD_REQUEST', 'Cloud save exceeds max size', 400)
    }

    const calculatedChecksum = sha256(clientState)
    if (calculatedChecksum !== checksum) {
      throw new ApiError('BAD_REQUEST', 'Checksum mismatch', 400)
    }

    const existing = await cloudSaveRepository.getByPlayerId(playerId)
    if (existing && baseSaveVersion <= existing.saveVersion) {
      throw new ApiError('CONFLICT', 'Outdated base save version', 409)
    }

    const newDoc: CloudSaveDocument = {
      saveVersion: existing ? existing.saveVersion + 1 : 1,
      schemaVersion,
      checksum,
      clientState,
      updatedAt: new Date().toISOString(),
    }

    await cloudSaveRepository.upsert(playerId, newDoc)
    return newDoc
  },
}
