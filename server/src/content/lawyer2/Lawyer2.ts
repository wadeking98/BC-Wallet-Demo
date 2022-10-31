import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

import { Progress } from '../../utils/progress'

export const Lawyer2: Character = {
  id: '3',
  image: '/public/lawyer2/lawyer2.svg',
  name: 'Joyce',
  type: 'Lawyer2',
  disableSkipConnection: true,
  backstory: 'Joyce is a member of Law Society of BC looking to access court materials online',
  content: {
    [Progress.SETUP_START]: {
      title: '',
      text: '',
      image: '/public/lawyer2/onboarding/scan.svg',
    },
    [Progress.PICK_CHARACTER]: {
      title: 'Meet Joyce',
      text: "Meet Joyce (that's you in this demo!). Joyce is a Lawyer who has been acessing court materials in person now needs a way to verify herself to view them online, currently she has to go to the court house to get those and then new way is...",
    },
    [Progress.RECEIVE_IDENTITY]: {
      title: 'Connect with Service BC (DEMO)',
      text: 'Joyce can now be issued her Person credential through the BCSC app',
    },
    [Progress.ACCEPT_CREDENTIAL]: {
      title: 'Accept your BC Person Credential',
      text: 'This Credential proves who you say you are',
    },
    [Progress.SETUP_COMPLETED]: {
      title: '',
      text: 'Member Card and Verified Person credential',
      image: '/public/lawyer2/onboarding/lawyer2Success.svg',
    },
  },
  customScreens: {
    startAt: Progress.PICK_CHARACTER,
    screens: [
      'LAWYER2_PREAMBLE',
      'LAWYER2_LSBC_PREAMBLE',
      'LAWYER2_MEMBER_CONNECT',
      'LAWYER2_MEMBER_ISSUE',
      'LAWYER2_BCSC_PREAMBLE',
    ],
    endAt: Progress.PICK_CHARACTER + 1,
  },
  starterCredentials: [
    {
      id: uuid(),
      name: 'Person',
      icon: '/public/lawyer2/icon-lawyer2.svg',
      attributes: [
        { name: 'postal_code', value: 'V8N2X6' },
        { name: 'picture', value: '' },
        { name: 'given_names', value: 'Joyce' },
        { name: 'family_name', value: 'Lee-Martinez' },
        { name: 'locality', value: 'BC' },
        { name: 'region', value: 'Victoria' },
        { name: 'street_address', value: '123 Test Rd' },
        { name: 'country', value: 'Canada' },
        { name: 'expiry_date_dateint', value: '23052024' },
        { name: 'birthdate_dateint', value: '23051993' },
      ],
    },
  ],
  additionalCredentials: [
    {
      id: uuid(),
      name: 'Member Card',
      icon: '/public/lawyer2/icon-lawyer2.svg',
      attributes: [
        { name: 'Member Status', value: 'Active' },
        { name: 'Given Name', value: 'Joyce' },
        { name: 'PPID', value: 'MC12349' },
        { name: 'Member Status Code', value: '1' },
        { name: 'Surname', value: 'Lee-Martinez' },
      ],
    },
  ],
  onboardingEntity: {
    name: 'Service BC (DEMO)',
    icon: '#',
  },
}
