import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/student/useCases/school'

const date = new Date()
date.setFullYear(date.getFullYear() + 1)
const nextYear = Number(date.toISOString().replace('-', '').split('T')[0].replace('-', ''))

export const StudyRoom: UseCase = {
  slug: 'study',
  card: {
    title: 'Book a study room',
    // image: `${URL}/card-sport.svg`,
    description: '',
  },

  stepper: [
    {
      id: uuid(),
      name: `Start booking the room`,
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
        name: 'BestBC College',
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
          name: 'Student Card',
          icon: '/public/student/icon-student.svg',
          properties: ['student_first_name'],
        },
      ],
      issueCredentials: [],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: `${URL}/card-school.svg`,
          title: 'Book a study room',
          description: `Alice has lots of work to do, and needs a study room for some peace and quiet. In this example, we'll present some info from our Student Card, but just what's needed to book the room.`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: 'Start booking the room',
          description: `Imagine you're on the room booking page for BestBC College, abd you've chosen a data and time. Now they just need to confirm a few details. Scan the QR code to continue.`,
          image: `${URL}/best-bc-college-no-overlay.png`,
          overlay: {
            header: 'Scan with your BC Wallet to login',
          },
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'Confirm the information to send',
          description: `BC Wallet will now ask you to confirm what to send for the booking. Notice how they only need your first name so they can display it on the booking screen. By providing anything from your student card, they automatically know you're a current student as well.`,
          requestOptions: {
            name: 'BestBC College Request',
            comment: 'BestBC College would like some of your personal information.',
          },
        },
        {
          id: uuid(),
          type: StepType.STEP_END,
          title: `You're done!`,
          description: `The room is booked. Just by proving your first name, Best BC College could trust your are a current student, and could let others know there's a booking without revealing too much about you.`,
          image: `${URL}/student-accepted.svg`,
        },
      ],
    },
  ],
}
