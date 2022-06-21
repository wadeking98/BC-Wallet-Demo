import type { Character } from '../types'
import { Progress } from '../../utils/progress'
import { v4 as uuid } from 'uuid'

export const BusinessWoman: Character = {
  id: '2',
  image: '/public/businesswoman/businesswoman.svg',
  name: 'Joyce',
  type: 'Lawyer',
  backstory:
    "Joyce is under development",
  content: {
    [Progress.PICK_CHARACTER]: {
      title: 'Meet Joyce',
      text: "Meet Joyce (that's you in this demo!). Joyce is a Laywer. To help make court life easier, Court Services is going to offer Joyce a digital Member Card to put in her BC Wallet",
    },
    [Progress.RECEIVE_IDENTITY]: {
      title: 'Connect with Court Services',
      text: 'Under development',
    },
    [Progress.ACCEPT_CREDENTIAL]: {
      title: 'Accept your member card',
      text: 'Under development',
    },
    [Progress.SETUP_COMPLETED]: {
      title: '',
      text: 'Member Card',
    }
  },
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
