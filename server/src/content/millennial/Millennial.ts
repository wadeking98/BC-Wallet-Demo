import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

import { Progress } from '../../utils/progress'

export const Millennial: Character = {
  id: '3',
  image: '/public/millennial/millennial.svg',
  name: 'Noah',
  type: 'Lawyer2',
  content: {
    [Progress.PICK_CHARACTER]: {
      title: 'Under Development',
      text: 'Under Development',
    },
    [Progress.RECEIVE_IDENTITY]: {
      title: 'Under Development',
      text: 'Under development',
    },
    [Progress.ACCEPT_CREDENTIAL]: {
      title: 'Under Development',
      text: 'Under development',
    },
    [Progress.SETUP_COMPLETED]: {
      title: '',
      text: 'Under Development',
    },
  },
  backstory: 'lawyer2 is under development',
  starterCredentials: [
    {
      id: uuid(),
      name: 'Member Card',
      icon: '/public/millennial/millennial.svg',
      attributes: [
        { name: 'Member Status', value: 'Active' },
        { name: 'Given Name', value: 'Lawyer2' },
        { name: 'PPID', value: '43' },
        { name: 'Member Status Code', value: '1' },
        { name: 'Surname', value: 'Lawyerson' },
      ],
    },
  ],
  onboardingEntity: {
    name: 'Law Society BC',
    icon: '#',
  },
}
