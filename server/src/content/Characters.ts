import type { Character } from './types'

import { BusinessWoman } from './businessWoman/BusinessWoman'
import { Student } from './student/Student'
import { Millennial } from './millennial/Millennial'

const characters: Character[] = [Student, BusinessWoman, Millennial]

export default characters
