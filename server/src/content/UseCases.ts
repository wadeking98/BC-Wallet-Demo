import type { CharWithUseCases } from './types'

import { BusinessWomanUseCases } from './businessWoman/BusinesswomanUseCases'
import { StudentUseCases } from './student/StudentUseCases'
import { MillennialUseCases } from './millennial/MillennialUseCases'
import { VerifiedPersonUseCases } from './verifiedPerson/VerifiedPersonUseCases'

const useCases: CharWithUseCases[] = [StudentUseCases, BusinessWomanUseCases, MillennialUseCases, VerifiedPersonUseCases]

export default useCases
