import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/student/useCases/school'

export const CourtServices: UseCase = {
  slug: 'court2',
  card: {
    title: 'Gain access to court materials online',
    // image: `${URL}/card-sport.svg`,
    description: '',
  },

  stepper: [
    // {
    //   id: uuid(),
    //   name: `Start the login process`,
    //   description: '',
    //   steps: 1,
    //   section: 1,
    // },
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
        icon: `${URL}/logo-university.png`,
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
          schemaName: 'Member Card'
        },
        {
          id: uuid(),
          name: 'Person',
          icon: '/public/lawyer2/icon-lawyer2.svg',
          properties: ['given_names', 'family_name'],
          schemaName: 'Person'
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
