import { shopRepository } from '../repositories/shopRepository'

export const shopService = {
  async listActiveItems() {
    return shopRepository.listActiveItems()
  },
}
