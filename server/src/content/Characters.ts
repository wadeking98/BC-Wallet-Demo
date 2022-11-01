import type { Character } from './types'

import { BusinessWoman } from './businessWoman/BusinessWoman'
import { Lawyer2 } from './lawyer2/Lawyer2'
import { Student } from './student/Student'
import { VerifiedPerson } from './verifiedPerson/VerifiedPerson'

const characters: Character[] = [Student, BusinessWoman, VerifiedPerson, Lawyer2]

export default characters
