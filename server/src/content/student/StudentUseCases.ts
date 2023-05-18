import type { CharWithUseCases } from '../types'

import { Student, OnlineStore, StudyRoom } from '../../../config/student'

export const StudentUseCases: CharWithUseCases = {
  characterId: Student.id,
  useCases: [OnlineStore, StudyRoom],
}
