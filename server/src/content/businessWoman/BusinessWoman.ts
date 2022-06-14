import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

export const BusinessWoman: Character = {
  id: '2',
  image: '/public/businesswoman/businesswoman.svg',
  name: 'Joyce',
  type: 'Lawyer',
  backstory:
    "Joyce is on her way to the top! She's the CEO of a fortune 500 company and is always working around the clock to keep business going, join her in her endeavor!",
  starterCredentials: [
    {
      id: uuid(),
      name: 'Member Card',
      icon: '/public/businesswoman/icon-businesswoman.svg',
      attributes: [
        { name: 'Member Status', value: 'Active' },
        { name: 'Given Name', value: 'Joyce' },
        { name: 'PPID', value: '42' },
        { name: 'Member Status Code', value: '1' },
        { name: 'Surname', value: 'Smith' },
      ],
    },
  ],
}
