import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

import { Progress } from '../../utils/progress'

export const Millennial: Character = {
  id: '3',
  image: '/public/businesswoman/businesswoman.svg',
  name: 'Joyce',
  type: 'Lawyer2',
  disableSkipConnection: true,
  backstory: 'Joyce is under development',
  content: {
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
      text: 'Member Card',
    },
  },
  customScreens: {
    startAt: Progress.PICK_CHARACTER,
    screens: ['LAWYER2_PREAMBLE', 'LAWYER2_MEMBER_CONNECT', 'LAWYER2_MEMBER_ISSUE'],
    endAt: Progress.PICK_CHARACTER + 1,
  },
  starterCredentials: [
    {
      id: uuid(),
      name: 'Person',
      icon: '/public/businesswoman/icon-businesswoman.svg',
      attributes: [
        { name: 'postal_code', value: 'V8N2X6' },
        { name: 'picture', value: '' },
        { name: 'given_names', value: 'Joyce' },
        { name: 'family_name', value: 'Smith' },
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
      icon: '/public/businesswoman/icon-businesswoman.svg',
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
    name: 'Law Society of BC (DEMO)',
    icon: '#',
  },
}
