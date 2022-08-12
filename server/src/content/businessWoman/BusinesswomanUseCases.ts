import type { CharWithUseCases } from '../types'

import { BusinessWoman } from './BusinessWoman'
import { CourtServices } from './useCases/CourtServices'

export const BusinessWomanUseCases: CharWithUseCases = {
  characterId: BusinessWoman.id,
  useCases: [CourtServices],
}
