import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/student/useCases/school'

export const CourtServices: UseCase = {
  slug: 'court2',
  card: {
    title: 'Login To Court Services',
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
          title: 'Login to Court Services',
          description: `Joyce wants to access court materials online instead of going in person, in order to get in she needs to prove who she is with her Person credential and a practicing lawyer with the LSBC credential. You will be asked for those now`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: 'Start the Login Process',
          description: `Court Services is asking Joyce for her Member Card and Verified Person credential so she can access court materials online`,
          overlay: {
            header: 'Scan with your BC Wallet to login',
          },
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'Confirm the information to send',
          description: `Confirm the verifiable information that you're sending from your BC Wallet to Court Services`,
          requestOptions: {
            name: 'Court Services Branch (DEMO) Request',
            comment: 'Court Services Branch (DEMO) would like some of your personal information.',
          },
        },
        {
          id: uuid(),
          type: StepType.STEP_END,
          title: `You're logged in!`,
          description: `Joyce successfully logged in to Court Services online using her Member Card and Person credential. She can now access court documents remotely.`,
          image: '/public/lawyer2/onboarding/lawyer2Success.svg',
        },
      ],
    },
  ],
}
