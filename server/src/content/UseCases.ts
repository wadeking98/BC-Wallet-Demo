import type { CharWithUseCases } from './types'

import { BusinessWomanUseCases } from './businessWoman/BusinesswomanUseCases'
import { StudentUseCases } from './student/StudentUseCases'
import { MillennialUseCases } from './millennial/MillennialUseCases'

const useCases: CharWithUseCases[] = [StudentUseCases, BusinessWomanUseCases, MillennialUseCases]

export default useCases
