import type { CharWithUseCases } from '../types'

import { Lawyer, LawyerUseCase } from '../../../../config/lawyer'

export const Lawyer2UseCases: CharWithUseCases = {
  characterId: Lawyer.id,
  useCases: [LawyerUseCase],
}
