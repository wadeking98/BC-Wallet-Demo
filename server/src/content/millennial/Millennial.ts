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
      name: 'BC ID Card',
      icon: '/public/millennial/icon-millennial.svg',
      attributes: [
        { name: 'name', value: 'Jan van Dalen' },
        { name: 'emailAddress', value: 'test@mail.com' },
        { name: 'iss_dateint', value: "2025" },
        { name: 'program', value: "LSBC" }
      ],
    },
  ],
}
