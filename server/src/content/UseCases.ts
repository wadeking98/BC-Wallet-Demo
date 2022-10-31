import type { CharWithUseCases } from './types'

import { BusinessWomanUseCases } from './businessWoman/BusinesswomanUseCases'
import { Lawyer2UseCases } from './lawyer2/Lawyer2UseCases'
import { StudentUseCases } from './student/StudentUseCases'
import { VerifiedPersonUseCases } from './verifiedPerson/VerifiedPersonUseCases'

const useCases: CharWithUseCases[] = [StudentUseCases, BusinessWomanUseCases, Lawyer2UseCases, VerifiedPersonUseCases]

export default useCases
