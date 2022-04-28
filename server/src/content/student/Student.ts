import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

export const Student: Character = {
  id: '1',
  image: '/public/student/student.svg',
  name: 'Jan',
  type: 'Student',
  backstory:
    'Jan is feeling great! He just got into law school and is ready to experience everything that student life has to offer. Help him navigate the experience!',
  starterCredentials: [
    {
      id: uuid(),
      name: 'BC ID Card',
      icon: '/public/student/icon-student.svg',
      attributes: [
        { name: 'name', value: 'Jan van Dalen' },
        { name: 'emailAddress', value: 'test@mail.com' },
        { name: 'iss_dateint', value: "2025" },
        { name: 'program', value: "LSBC" }
      ],
    },
  ],
}
