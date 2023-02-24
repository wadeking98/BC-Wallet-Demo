import { Character, UseCase, StepType } from 'server/src/content/types'


import { v4 as uuid } from 'uuid'

enum StudentProgress {
  PICK_CHARACTER = 0,
  SETUP_START,
  CHOOSE_WALLET,
  RECEIVE_IDENTITY,
  ACCEPT_CREDENTIAL,
  SETUP_COMPLETED,
}


export const Student: Character = {
  id: '1',
  image: '/public/student/student.svg',
  name: 'Alice',
  type: 'Student',
  backgroundImage: '/public/student/onboarding-overlay.png',
  onboardingText: 'Add your Student ID to your digital wallet',
  backstory:
    "Meet Alice (that's you in this demo!). Alice is a student at BestBC College. To help make student life easier, BestBC College is going to offer Alice a digital Student Card to put in her BC Wallet.",
  content: {
    [StudentProgress.PICK_CHARACTER]: {
      title: 'Meet Alice',
      text: "Meet Alice (that's you in this demo!). Alice is a student at BestBC College. To help make student life easier, BestBC College is going to offer Alice a digital Student Card to put in her BC Wallet.",
    },
    [StudentProgress.RECEIVE_IDENTITY]: {
      title: 'Connect with BestBC College',
      text: 'Imagine, as Alice, you are logged into the BestBC College website (see below). They want to offer you a Digital Student Card. Use your BC Wallet to scan the QR code from the website.',
    },
    [StudentProgress.ACCEPT_CREDENTIAL]: {
      title: 'Accept your student card',
      text: "Your wallet now has a secure and private connection with BestBC College. You should have received an offer in BC Wallet for a Student Card.\nReview what they are sending, and choose 'Accept offer'.",
    },
    [StudentProgress.SETUP_COMPLETED]: {
      title: '',
      text: 'Student Card',
    },
  },
  starterCredentials: {
    [StudentProgress.ACCEPT_CREDENTIAL]: {
      id: uuid(),
      name: 'student_card',
      icon: '/public/student/icon-student.svg',
      attributes: [
        { name: 'student_first_name', value: 'Alice' },
        { name: 'student_last_name', value: 'Smith' },
        {
          name: 'expiry_date',
          value() {
            const expiry = new Date()
            expiry.setFullYear(expiry.getFullYear() + 4)
            return expiry.toISOString().split('T')[0].replace(/-/g, '')
          },
        },
      ],
    },
  },
  onboardingEntity: {
    name: 'BestBC College',
    icon: '#',
  },
}

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
          name: 'student_card',
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

const URLschool = '/public/student/useCases/school'


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
        icon: `${URLschool}/logo-university.png`,
        imageUrl: 'https://i.imgur.com/CbkUgpH.png',
      },
      colors: {
        primary: '#92E3A9',
        secondary: '#C9EDD3',
      },
      requestedCredentials: [
        {
          id: uuid(),
          name: 'student_card',
          icon: '/public/student/icon-student.svg',
          properties: ['student_first_name'],
        },
      ],
      issueCredentials: [],
      steps: [
        {
          id: uuid(),
          type: StepType.START,
          image: `${URLschool}/card-school.svg`,
          title: 'Book a study room',
          description: `Alice has lots of work to do, and needs a study room for some peace and quiet. In this example, we'll present some info from our Student Card, but just what's needed to book the room.`,
        },
        {
          id: uuid(),
          type: StepType.CONNECTION,
          title: 'Start booking the room',
          description: `Imagine you're on the room booking page for BestBC College, abd you've chosen a data and time. Now they just need to confirm a few details. Scan the QR code to continue.`,
          image: `${URLschool}/best-bc-college-no-overlay.png`,
          overlay: {
            header: 'Scan with your BC Wallet to login',
          },
        },
        {
          id: uuid(),
          type: StepType.PROOF,
          title: 'Confirm the information to send',
          description: `BC Wallet will now ask you to confirm what to send for the booking. Notice how they only need your first name so they can display it on the booking screen. By providing anything from your student card, they automatically know your student card hasn't been revoked.`,
          requestOptions: {
            name: 'BestBC College Request',
            comment: 'BestBC College would like some of your personal information.',
          },
        },
        {
          id: uuid(),
          type: StepType.STEP_END,
          title: `You're done!`,
          description: `The room is booked. Just by proving your first name, Best BC College could trust you are a current student, and could let others know there's a booking without revealing too much about you.`,
          image: `${URLschool}/student-accepted.svg`,
        },
      ],
    },
  ],
}
