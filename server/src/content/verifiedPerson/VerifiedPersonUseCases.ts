import type { CharWithUseCases } from '../types'

import { VerifiedPerson } from './VerifiedPerson'
import { DigitalID } from './useCases/DigitalId'

export const VerifiedPersonUseCases: CharWithUseCases = {
  characterId: VerifiedPerson.id,
  useCases: [DigitalID],
}
