import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

export const Millennial: Character = {
  id: '3',
  image: '/public/millennial/millennial.svg',
  name: 'Noah',
  type: 'Millennial',
  backstory:
    'Web designer Noah loves to explore. He has spent the last year as a digital nomad, traveling and working around the globe, guide him through his next adventure!',
  starterCredentials: [
    {
      id: uuid(),
      name: 'Student ID Card',
      icon: '/public/millennial/icon-millennial.svg',
      attributes: [
        { name: 'student_first_name', value: 'Jan' },
        { name: 'student_last_name', value: 'Test' },
        { name: 'expiry_date', value: '05-05-2025' },
      ],
    },
  ],
}
