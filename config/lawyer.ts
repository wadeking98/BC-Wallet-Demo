import { Character, UseCase, StepType } from 'server/src/content/types'
import { v4 as uuid } from 'uuid'

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
            isBackDisabled: true
        },
        [LawyerProgress.ACCEPT_PERSON]: {
            image: '/public/lawyer2/onboarding/personCredPhone.svg',
        },
        [LawyerProgress.SETUP_COMPLETED]: {
            title: '',
            text: 'Member Card and Person credential',
            image: '/public/lawyer2/onboarding/lawyer2Success.svg',
            isBackDisabled: true
        },
    },
    starterCredentials: {
        [LawyerProgress.ACCEPT_PERSON]: {
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
        [LawyerProgress.ACCEPT_LSBC]: {
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

export const LawyerUseCase: UseCase = {
    slug: 'courtServices',
    card: {
      title: 'Gain access to court materials online',
      description: '',
    },
  
    stepper: [
      {
        id: uuid(),
        name: `Confirm the information to send`,
        description: '',
        steps: 1,
        section: 1,
      },
      {
        id: uuid(),
        name: `Done!`,
        description: '',
        steps: 2,
        section: 1,
      },
    ],
  
    sections: [
      {
        id: uuid(),
        entity: {
          name: 'Court Services Branch (DEMO)',
          icon: '/public/student/useCases/school/logo-university.png',
          imageUrl: 'https://i.imgur.com/CbkUgpH.png',
        },
        colors: {
          primary: '#92E3A9',
          secondary: '#C9EDD3',
        },
        requestedCredentials: [
          {
            id: uuid(),
            name: 'Member Card',
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