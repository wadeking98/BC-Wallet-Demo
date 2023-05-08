import type { Entity } from '../client/src/slices/types'
import type { Character, UseCase } from 'server/src/content/types'

import { StepType } from 'server/src/content/types'
import { v4 as uuid } from 'uuid'

import { prependApiUrl } from '../client/src/utils/Url'

enum LawyerProgress {
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

export const Lawyer: Character = {
  id: '2',
  image: '/public/lawyer2/lawyer2.svg',
  name: 'Joyce',
  type: 'Lawyer',
  backstory: 'Joyce is a member of the Law Society of British Columbia looking to access court materials online.',
  content: {
    [LawyerProgress.PICK_CHARACTER]: {
      title: 'Meet Joyce',
      text: `Meet Joyce (that's you in this demo!). Joyce is a lawyer in good standing with The Law Society of British Columbia. We know this because she's got her physical Law Society of British Columbia Member Card.
  
        She's also a resident of British Columbia and has gone through the process to prove her identity with Service BC and has obtained a physical BC Services Card.
          
        This has allowed her to use in person services.
        `,
    },
    [LawyerProgress.SETUP_START]: {
      title: '',
      text: `BC Wallet is a new app for storing and using credentials on your smartphone. Credentials are things like IDs, licences and diplomas.
   
        Using your BC Wallet is fast and simple. In the future it can be used online and in person.
        You approve every use, and share only what is needed.
         
        In this demo, you will use two credentials to prove who you are and access court materials online instead of in-person.
        `,
      image: '/public/lawyer2/onboarding/scan.svg',
    },
    [LawyerProgress.GOING_DIGITAL]: {
      image: '/public/lawyer2/onboarding/goingDigital.svg',
    },
    [LawyerProgress.ACCESS_COURT_MATERIALS]: {
      image: '/public/lawyer2/onboarding/loginLSBC.svg',
    },
    [LawyerProgress.CONNECT_LSBC]: {
      image: '/public/lawyer2/onboarding/lawyerCredPhone.svg',
    },
    [LawyerProgress.ACCEPT_LSBC]: {
      image: '/public/lawyer2/onboarding/lawyerCredPhone.svg',
    },
    [LawyerProgress.CONNECT_PERSON]: {
      image: '/public/lawyer2/onboarding/personCredPhone.svg',
      isBackDisabled: true,
    },
    [LawyerProgress.ACCEPT_PERSON]: {
      image: '/public/lawyer2/onboarding/personCredPhone.svg',
    },
    [LawyerProgress.SETUP_COMPLETED]: {
      title: '',
      text: 'Member Card and Person credential',
      image: '/public/lawyer2/onboarding/lawyer2Success.svg',
      isBackDisabled: true,
    },
  },
  starterCredentials: {
    [LawyerProgress.ACCEPT_PERSON]: {
      id: uuid(),
      name: 'Person',
      icon: '/public/lawyer2/icon-lawyer2.svg',
      attributes: [
        { name: 'postal_code', value: 'V8N2X6' },
        { name: 'picture', value: 'data:image/png;base64,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' },
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
    [LawyerProgress.ACCEPT_LSBC]: {
      id: uuid(),
      name: 'member_card',
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
    name: 'Law Society of BC (Demo)',
    icon: '#',
    imageUrl: '/public/lawyer2/connection/lsbc-logo.png',
    imageFromBackend: true,
  },
  additionalEntity: {
    name: 'Service BC (Demo)',
    icon: '#',
    imageUrl: '/public/lawyer2/connection/bc-logo.png',
    imageFromBackend: true,
  },
}

export const LawyerUseCase: UseCase = {
  slug: 'courtServices',
  card: {
    title: 'Gain access to court materials online',
    description: '',
  },

  stepper: [
    {
      id: uuid(),
      name: `Scan the QR code`,
      description: '',
      steps: 1,
      section: 1,
    },
    {
      id: uuid(),
      name: `Confirm the information to send`,
      description: '',
      steps: 2,
      section: 1,
    },
    {
      id: uuid(),
      name: `Done!`,
      description: '',
      steps: 3,
      section: 1,
    },
  ],

  sections: [
    {
      id: uuid(),
      entity: {
        name: 'Court Services Branch (DEMO)',
        icon: '/public/student/useCases/school/logo-university.png',
        imageUrl: '/public/lawyer2/connection/lsbc-logo.png',
        imageFromBackend: true,
      },
      colors: {
        primary: '#92E3A9',
        secondary: '#C9EDD3',
      },
      requestedCredentials: [
        {
          id: uuid(),
          name: 'member_card',
          icon: '/public/lawyer2/icon-lawyer2.svg',
          properties: ['Given Name', 'Surname', 'PPID'],
        },
        {
          id: uuid(),
          name: 'Person',
          icon: '/public/lawyer2/icon-lawyer2.svg',
          properties: ['given_names', 'family_name'],
        },
      ],
      issueCredentials: [],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: '/public/lawyer2/useCases/courtServices/bothCreds.svg',
          title: 'Gain access to court materials online',
          description: `Joyce can gain entry to Access to Court Materials, a service online by Court Services Branch where lawyers can access court documents online. They require proof that you’re a practising lawyer in B.C. and a matching name to your lawyer member card.`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: 'Start proving you’re a lawyer',
          description: `As Joyce you’re now ready to prove you’re a practising lawyer in B.C. and your name to Court Services Branch and gain entry to Access to Court Materials online. Scan the QR code.`,
          image: '/public/lawyer2/useCases/courtServices/courtServicesOverlay.png',
          overlay: {
            header: 'Scan with your BC Wallet to login',
          },
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'Confirm the information to send',
          description: `BC Wallet will now ask you to confirm what to send. Notice how you’re not sharing your entire credential. Court Services Branch is requesting that you prove only what is needed.`,
          requestOptions: {
            name: 'Court Services Branch (DEMO) Request',
            comment: 'Court Services Branch (DEMO) would like some of your personal information.',
          },
        },
        {
          id: uuid(),
          type: StepType.STEP_END,
          title: `You're done!`,
          description: `You’ve proved to Court Services Branch that you’re a practising lawyer from B.C. and your identity using your Person credential. You can now access court materials online from the comfort of your own home. It only took a few seconds and you revealed minimal information that Court Services Branch could easily and automatically trust.`,
          image: '/public/lawyer2/onboarding/lawyer2Success.svg',
        },
      ],
    },
  ],
}
