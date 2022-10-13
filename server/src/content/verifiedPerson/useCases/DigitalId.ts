import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/student/useCases/school'

const date = new Date()
date.setFullYear(date.getFullYear() + 1)
const nextYear = Number(date.toISOString().replace('-', '').split('T')[0].replace('-', ''))

export const DigitalID: UseCase = {
  slug: 'vp',
  card: {
    title: 'Login To BC Digital ID',
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
        name: 'BC Digital ID',
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
          name: 'Person',
          icon: '/public/businesswoman/icon-businesswoman.svg',
          properties: ['parent_1_full_name', 'locality', 'picture', 'postal_code', 'parent_2_full_name', 'country', 'birthdate_dateint', 'street_address', 'given_names', 'expiry_date_dateint', 'family_name', 'region'],
        },
      ],
      issueCredentials: [],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: `${URL}/card-school.svg`,
          title: 'Login to BC Digital ID',
          description: `Under Development`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: 'Start the Login Process',
          description: `Under Development`,
          overlay: {
            header: 'Scan with your BC Wallet to login',
          },
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'Confirm the information to send',
          description: `Under Development`,
          requestOptions: {
            name: 'BC Digital ID Request',
            comment: 'BC Digital ID would like some of your personal information.',
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
