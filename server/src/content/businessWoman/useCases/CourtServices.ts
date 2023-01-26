import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/student/useCases/school'

const date = new Date()
date.setFullYear(date.getFullYear() + 1)
const nextYear = Number(date.toISOString().replace('-', '').split('T')[0].replace('-', ''))

export const CourtServices: UseCase = {
  slug: 'court',
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
        name: 'Court Services',
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
          icon: '/public/businesswoman/icon-businesswoman.svg',
          properties: ['Member Status'],
          schemaName: 'Member Card'
        },
      ],
      issueCredentials: [],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: `${URL}/card-school.svg`,
          title: 'Login to Court Services',
          description: `Under Development`,
        },
        // {
        //   id: uuid(),
        //   type: StepType.CONNECTION,
        //   title: 'Start the Login Process',
        //   description: `Under Development`,
        //   image: `${URL}/best-bc-college-no-overlay.png`,
        //   overlay: {
        //     header: 'Scan with your BC Wallet to login',
        //   },
        // },
        {
          id: uuid(),
          type: StepType.PROOF_OOB,
          title: 'Confirm the information to send',
          description: `Under Development`,
          requestOptions: {
            name: 'Court Services Request',
            comment: 'Court Services would like some of your personal information.',
          },
        },
        {
          id: uuid(),
          type: StepType.STEP_END,
          title: `You're done!`,
          description: `Under Development`,
          image: `${URL}/student-accepted.svg`,
        },
      ],
    },
  ],
}
