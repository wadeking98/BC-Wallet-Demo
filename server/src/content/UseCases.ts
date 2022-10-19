import type { CharWithUseCases } from './types'

import { BusinessWomanUseCases } from './businessWoman/BusinesswomanUseCases'
import { MillennialUseCases } from './millennial/MillennialUseCases'
import { StudentUseCases } from './student/StudentUseCases'
import { VerifiedPersonUseCases } from './verifiedPerson/VerifiedPersonUseCases'

const useCases: CharWithUseCases[] = [
  StudentUseCases,
  BusinessWomanUseCases,
  MillennialUseCases,
  VerifiedPersonUseCases,
]

export default useCases
