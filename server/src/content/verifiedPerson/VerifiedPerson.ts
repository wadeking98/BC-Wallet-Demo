import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

import { Progress } from '../../utils/progress'

export const VerifiedPerson: Character = {
  id: '4',
  image: '/public/businesswoman/businesswoman.svg',
  name: 'Mallory',
  type: 'Person',
  backstory: 'Mallory is under development',
  skipWalletPrompt: true,
  content: {
    [Progress.PICK_CHARACTER]: {
      title: 'Meet Mallory',
      text: "Meet Mallory (that's you in this demo!). Mallory is a person. <stuff about credential issuance>",
    },
    [Progress.RECEIVE_IDENTITY]: {
      title: 'Connect with BC Digital ID',
      text: 'Under development',
    },
    [Progress.ACCEPT_CREDENTIAL]: {
      title: 'Accept your Person credential',
      text: 'Under development',
    },
    [Progress.SETUP_COMPLETED]: {
      title: '',
      text: 'Person Credential',
    },
  },
  starterCredentials: [],
  onboardingEntity: {
    name: 'BC Digital ID',
    icon: '#',
  },
}
