import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

export const Student: Character = {
  id: '1',
  image: '/public/student/student.svg',
  name: 'Alice',
  type: 'Student',
  backstory:
    "Meet Alice. (That's you in this demo!)\n\nAlice is a student at BestBC College.\n\nTo help make student life easier, BestBc College is going to offer Alice a DIgital Student Card to put in her BC Wallet",
  starterCredentials: [
    {
      id: uuid(),
      name: 'Student ID Card',
      icon: '/public/student/icon-student.svg',
      attributes: [
        { name: 'student_first_name', value: 'Jan' },
        { name: 'student_last_name', value: 'Test' },
        { name: 'expiry_date', value: '05-05-2025' },
      ],
    },
  ],
}
