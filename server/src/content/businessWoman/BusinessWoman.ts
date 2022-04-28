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
      name: 'BC ID Card',
      icon: '/public/businesswoman/icon-businesswoman.svg',
      attributes: [
        { name: 'name', value: 'Jan van Dalen' },
        { name: 'emailAddress', value: 'test@mail.com' },
        { name: 'iss_dateint', value: "2025" },
        { name: 'program', value: "LSBC" }
      ],
    }
  ],
}
