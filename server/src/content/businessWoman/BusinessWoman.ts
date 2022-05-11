import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

export const BusinessWoman: Character = {
  id: '2',
  image: '/public/businesswoman/businesswoman.svg',
  name: 'Joyce',
  type: 'Businesswoman',
  backstory:
    "Joyce is on her way to the top! She's the CEO of a fortune 500 company and is always working around the clock to keep business going, join her in her endeavor!",
  starterCredentials: [
    {
      id: uuid(),
      name: 'Student ID Card',
      icon: '/public/businesswoman/icon-businesswoman.svg',
      attributes: [
        { name: 'student_first_name', value: 'Jan' },
        { name: 'student_last_name', value: 'Test' },
        { name: 'expiry_date', value: '05-05-2025' },
      ],
    },
  ],
}
