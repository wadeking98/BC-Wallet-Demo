import type { CharWithUseCases } from '../types'

import { Student } from './Student'
import { OnlineStore } from './useCases/OnlineStore'
import { StudyRoom } from './useCases/StudyRoom'

export const StudentUseCases: CharWithUseCases = {
  characterId: Student.id,
  useCases: [OnlineStore, StudyRoom],
}
