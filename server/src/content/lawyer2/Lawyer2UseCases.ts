import type { CharWithUseCases } from '../types'

import { Lawyer2 } from './Lawyer2'
import { CourtServices } from './useCases/CourtServices'

export const Lawyer2UseCases: CharWithUseCases = {
  characterId: Lawyer2.id,
  useCases: [CourtServices],
}
