import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

enum Progress {
  PICK_CHARACTER = 0,
  SETUP_START,
  CHOOSE_WALLET,
  GOING_DIGITAL,
  ACCESS_COURT_MATERIALS,
  CONNECT_LSBC,
  ACCEPT_LSBC,
  CONNECT_PERSON,
  ACCEPT_PERSON,
  SETUP_COMPLETED,
}

export const Lawyer2: Character = {
  id: '2',
  image: '/public/lawyer2/lawyer2.svg',
  name: 'Joyce',
  type: 'Lawyer',
  backstory: 'Joyce is a member of the Law Society of British Columbia looking to access court materials online.',
  content: {
    [Progress.PICK_CHARACTER]: {
      title: 'Meet Joyce',
      text: `Meet Joyce (that's you in this demo!). Joyce is a lawyer in good standing with The Law Society of British Columbia. We know this because she's got her physical Law Society of British Columbia Member Card.

      She's also a resident of British Columbia and has gone through the process to prove her identity with Service BC and has obtained a physical BC Services Card.
        
      This has allowed her to use in person services.
      `,
    },
    [Progress.SETUP_START]: {
      title: '',
      text: `BC Wallet is a new app for storing and using credentials on your smartphone. Credentials are things like IDs, licences and diplomas.
 
      Using your BC Wallet is fast and simple. In the future it can be used online and in person.
      You approve every use, and share only what is needed.
       
      In this demo, you will use two credentials to prove who you are and access court materials online instead of in-person.
      `,
      image: '/public/lawyer2/onboarding/scan.svg',
    },
    [Progress.GOING_DIGITAL]: {
      image: '/public/lawyer2/onboarding/goingDigital.svg',
    },
    [Progress.ACCESS_COURT_MATERIALS]: {
      image: '/public/lawyer2/onboarding/loginLSBC.svg',
    },
    [Progress.CONNECT_LSBC]: {
      image: '/public/lawyer2/onboarding/lawyerCredPhone.svg',
    },
    [Progress.ACCEPT_LSBC]: {
      image: '/public/lawyer2/onboarding/lawyerCredPhone.svg',
    },
    [Progress.CONNECT_PERSON]: {
      image: '/public/lawyer2/onboarding/personCredPhone.svg',
      isBackDisabled: true
    },
    [Progress.ACCEPT_PERSON]: {
      image: '/public/lawyer2/onboarding/personCredPhone.svg',
    },
    [Progress.SETUP_COMPLETED]: {
      title: '',
      text: 'Member Card and Person credential',
      image: '/public/lawyer2/onboarding/lawyer2Success.svg',
      isBackDisabled: true
    },
  },
  starterCredentials: {
    [Progress.ACCEPT_PERSON]: {
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
    [Progress.ACCEPT_LSBC]: {
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
  },
  onboardingEntity: {
    name: 'Service BC (DEMO)',
    icon: '#',
  },
}
