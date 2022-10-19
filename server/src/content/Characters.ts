import type { Character } from './types'

import { BusinessWoman } from './businessWoman/BusinessWoman'
import { Millennial } from './millennial/Millennial'
import { Student } from './student/Student'
import { VerifiedPerson } from './verifiedPerson/VerifiedPerson'

const characters: Character[] = [Student, BusinessWoman, VerifiedPerson, Millennial]

export default characters
