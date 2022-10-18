import type { Character } from './types'

import { BusinessWoman } from './businessWoman/BusinessWoman'
import { Student } from './student/Student'
import { VerifiedPerson } from './verifiedPerson/VerifiedPerson'
import { Millennial } from './millennial/Millennial'

const characters: Character[] = [Student, BusinessWoman, VerifiedPerson, Millennial]

export default characters
