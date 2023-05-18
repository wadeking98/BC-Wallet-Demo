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
        {
          name: 'picture',
          value:
            'data:image/jpeg;base64,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',
        },
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
