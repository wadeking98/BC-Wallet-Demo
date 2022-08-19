import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/student/useCases/store'

export const OnlineStore: UseCase = {
  slug: 'store',
  card: {
    title: 'Get a student discount at an online store',
    // image: `${URL}/card-school.svg`,
    description: '',
  },

  stepper: [
    {
      id: uuid(),
      name: `Start proving you're a student`,
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
        name: 'Cool Clothes Online',
        icon: `${URL}/logo-university.png`,
        imageUrl: 'https://i.imgur.com/KPrshWf.png',
      },
      colors: {
        primary: '#4686C6',
        secondary: '#c4dbf3',
      },
      requestedCredentials: [
        {
          id: uuid(),
          name: 'Student Card',
          icon: '/public/student/icon-student.svg',
          // properties: ['expiry_date'],
          predicates: {
            name: 'expiry_date',
            value() {
              const date = new Date()
              return Number(date.toISOString().split('T')[0].replace(/-/g, ''))
            },
            type: '>=',
          },
        },
      ],
      issueCredentials: [],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: `${URL}/card-school.svg`,
          title: 'Getting a student discount',
          description: `Alice (that's you in this demo!) can get a student discount on her online purchase. In this example, you will just tell Cool Clothes Online you're a student.`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: `Start proving you're a student`,
          description: `Imagine, as Alice, you are in the checkout process for Cool Clothes Online. They're offering you a 15% discount on your purchase if you can prove you're a student. First, scan the QR code.`,
          image: `${URL}/cool-clothes-no-overlay.png`,
          overlay: {
            header: `Students get 15% off their entire order`,
            footer: `Scan the QR Code above with your digital wallet to prove you're a student`,
          },
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'Confirm the information to send',
          description: `BC Wallet will now ask you to confirm what to send. Notice how it will only share if the credential has expired, not even the expiry date itself gets shared. You don't have to share anything else for it to be trustable.`,
          requestOptions: {
            name: 'Cool Clothes Online Request',
            comment: 'Cool Clothes Online would like some of your personal information.',
          },
        },
        {
          id: uuid(),
          type: StepType.STEP_END,
          title: `You're done!`,
          description: `You proved that you're a student, and Cool Clothes Online gave you the discount. It only took a few seconds, you revealed minimal information, and Cool Clothes Online could easily and automatically trust what you sent.`,
          image: `${URL}/student-accepted.svg`,
        },
      ],
    },
  ],
}
