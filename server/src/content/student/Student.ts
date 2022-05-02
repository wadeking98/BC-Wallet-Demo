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
      name: 'Student ID Card',
      icon: '/public/student/icon-student.svg',
      attributes: [
        { name: 'student_first_name', value: 'Jan' },
        { name: 'student_last_name', value: 'Test' },
        { name: 'expiry_date', value: "05-05-2025" }
      ],
    },
  ],
}
