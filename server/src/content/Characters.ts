import type { Character } from './types'

import { BusinessWoman } from './businessWoman/BusinessWoman'
import { Student } from './student/Student'
import { VerifiedPerson } from './verifiedPerson/VerifiedPerson'

const characters: Character[] = [Student, BusinessWoman, VerifiedPerson]

export default characters
