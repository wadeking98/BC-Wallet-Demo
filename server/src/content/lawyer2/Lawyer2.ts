import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

import { Progress } from '../../utils/progress'

export const Lawyer2: Character = {
  id: '3',
  image: '/public/lawyer2/lawyer2.svg',
  name: 'Joyce',
  type: 'Joyce',
  backstory: 'Joyce is a member of the Law Society of British Columbia looking to access court materials online.',
  content: {
    [Progress.SETUP_START]: {
      title: '',
      text: `BC Wallet is a new app for storing and using credentials on your smartphone. Credentials are things like IDs, licences and diplomas.
 
      Using your BC Wallet is fast and simple. In the future it can be used online and in person.
      You approve every use, and share only what is needed.
       
      In this demo, you will use two credentials to prove who you are and access court materials online instead of in-person.
      `,
      image: '/public/lawyer2/onboarding/scan.svg',
    },
    [Progress.PICK_CHARACTER]: {
      title: 'Meet Joyce',
      text: `Meet Joyce (that's you in this demo!). Joyce is a lawyer in good standing with The Law Society of British Columbia. We know this because she's got her physical Law Society of British Columbia Member Card.

      She's also a resident of British Columbia and has gone through the process to prove her identity with Service BC and has obtained a physical BC Services Card.
        
      This has allowed her to use in person services.
      `,
    },
    [Progress.RECEIVE_IDENTITY]: {
      title: 'Get Person credential',
      text: 'Joyce gets her Person credential from the BC Services Card app. She starts the process within BC Wallet. For this demo you will scan this QR code to receive the credential offer.',
      isBackDisabled: true,
      image: '/public/lawyer2/onboarding/personCredPhone.svg'
    },
    [Progress.ACCEPT_CREDENTIAL]: {
      title: 'Accept your Person credential',
      text: 'Check your phone. You’ve received a credential offer from Service BC in your BC Wallet. You can use this credential to prove who you are online.',
      image: '/public/lawyer2/onboarding/personCredPhone.svg'
    },
    [Progress.SETUP_COMPLETED]: {
      title: '',
      text: 'Member Card and Person credential',
      image: '/public/lawyer2/onboarding/lawyerPersonCredPhone.svg',
    },
  },
  customScreens: {
    startAt: Progress.PICK_CHARACTER,
    screens: [
      'LAWYER2_PREAMBLE',
      'LAWYER2_LSBC_PREAMBLE',
      'LAWYER2_MEMBER_CONNECT',
      'LAWYER2_MEMBER_ISSUE',
    ],
    endAt: Progress.RECEIVE_IDENTITY,
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
