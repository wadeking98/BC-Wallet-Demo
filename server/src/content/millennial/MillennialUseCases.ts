import type { CharWithUseCases } from '../types'

import { Millennial } from './Millennial'
import { CourtServices } from './useCases/CourtServices'

export const MillennialUseCases: CharWithUseCases = {
  characterId: Millennial.id,
  useCases: [CourtServices],
}
