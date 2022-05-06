import type { UseCase } from '../../types'

import { v4 as uuid } from 'uuid'

import { StepType } from '../../types'

const URL = '/public/student/useCases/store'

export const OnlineStore: UseCase = {
  slug: 'store',
  card: {
    title: '',
    image: `${URL}/card-school.svg`,
    description: `Get a student discount in and online store`,
  },

  stepper: [
    {
      id: uuid(),
      name: `Connect with the university`,
      description: `Setup a secure connection with the university.`,
      steps: 1,
      section: 1,
    },
    {
      id: uuid(),
      name: 'Submit your application',
      description: 'Use the connection to submit your application.',
      steps: 4,
      section: 1,
    },
    {
      id: uuid(),
      name: 'Receive your student pass',
      description: 'Accept your new Student pass that is issued by the University.',
      steps: 7,
      section: 1,
    },
  ],

  sections: [
    {
      id: uuid(),
      entity: {
        name: 'University of Law',
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
          name: 'Student ID Card',
          icon: '/public/student/icon-student.svg',
          properties: ['student_first_name', 'student_last_name', 'expiry_date'],
        },
      ],
      issueCredentials: [
        {
          id: uuid(),
          name: 'BC Pilot',
          attributes: [
            { name: 'name', value: 'Jan van Dalen' },
            { name: 'emailAddress', value: 'test@mail.com' },
            { name: 'iss_dateint', value: '2025' },
            { name: 'program', value: 'LSBC' },
          ],
          icon: `${URL}/icon-university-card.png`,
        },
      ],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: `${URL}/card-school.svg`,
          title: 'Getting a student discount',
          description: `Alice (that's you in this demo!) can get a student discount on her online purchase.\n\nIn this example, you will just tell CoolClothes.co you're a student`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: 'Scan the QR-code to connect with the university.',
          description: `You're ready to submit your application  on their website. Scan the QR-Code to set up a secure connection with the university. The university connection will appear in your wallet!`,
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: 'You now have a secure connection.',
          description: `Using this connection, you are going to share some personal information that is needed to complete the application.`,
          image: `${URL}/student-fill-out.svg`,
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'The university wants some information.',
          description: `Grab your wallet, you've received a request for some information! To finish the application process, share the information by accepting the request. `,
          requestOptions: {
            name: 'University of Law Request',
            comment: 'The university would like some of your personal information.',
          },
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: `You've submitted your application.`,
          description: `Your application  is being processed by the University. This shouldn't take too long, because all the data you've shared can be verified in seconds`,
          image: `${URL}/student-secure.svg`,
        },
        {
          id: uuid(),
          type: StepType.INFO,
          title: 'You got in!',
          description: `Congrats! The university accepted your application. Before you go tell your mom, the university will first issue you a student pass. `,
          image: `${URL}/student-accepted.svg`,
        },
        {
          id: uuid(),
          type: StepType.CREDENTIAL,
          title: `The university issues you your student pass.`,
          description: `Open your wallet, and accept your new student pass. You can use this pass to access the university's facilities and obtain some great student discounts.`,
          requestOptions: {
            name: 'Student pass',
            comment: 'Here is your student pass.',
          },
          //useProof: true,
        },
        {
          id: uuid(),
          type: StepType.END,
          title: 'Congratulations, you did it!',
          description: 'Great job on finishing this use case. These are the steps you took.',
          endStepper: [
            {
              id: uuid(),
              title: `You connected with the university`,
              description: 'This secure channel can be used for all of your communication with the university.',
              image: `${URL}/student-on-laptop.svg`,
            },
            {
              id: uuid(),
              title: 'You safely presented your data',
              description: `Without showing all of your data, you successfully applied by accepting the university's request.`,
              image: `${URL}/student-secure.svg`,
            },
            {
              id: uuid(),
              title: 'You got in!',
              description: `Your application was accepted and the university issued you your Student pass. This pass is now safely stored in your digital wallet.`,
              image: `${URL}/student-accepted.svg`,
            },
          ],
        },
      ],
    },
  ],
}
