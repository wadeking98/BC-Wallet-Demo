import type { CharWithUseCases } from './types'

import { BusinessWomanUseCases } from './businessWoman/BusinesswomanUseCases'
import { StudentUseCases } from './student/StudentUseCases'
import { VerifiedPersonUseCases } from './verifiedPerson/VerifiedPersonUseCases'

const useCases: CharWithUseCases[] = [StudentUseCases, BusinessWomanUseCases, VerifiedPersonUseCases]

export default useCases
