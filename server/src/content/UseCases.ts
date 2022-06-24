import type { CharWithUseCases } from './types'

import { BusinessWomanUseCases } from './businessWoman/BusinesswomanUseCases'
import { StudentUseCases } from './student/StudentUseCases'

const useCases: CharWithUseCases[] = [StudentUseCases, BusinessWomanUseCases]

export default useCases
