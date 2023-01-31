import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

import { Progress } from '../../utils/progress'

export const Student: Character = {
  id: '1',
  image: '/public/student/student.svg',
  name: 'Alice',
  type: 'Student',
  backgroundImage: '/public/student/onboarding-overlay.png',
  onboardingText: 'Add your Student ID to your digital wallet',
  backstory:
    "Alice now has her Student card in her BC Wallet and can use it to access services and benefits online.",
  content: {
    [Progress.PICK_CHARACTER]: {
      title: 'Meet Alice',
      text: "Meet Alice (that's you in this demo!). Alice is a student at BestBC College. To help make student life easier, BestBC College is going to offer Alice a digital Student card to put in her BC Wallet.",
    },
    [Progress.RECEIVE_IDENTITY]: {
      title: 'Connect with BestBC College',
      text: 'Imagine, as Alice, you are logged into the BestBC College website (see below). They want to offer you a Digital Student card. Use your BC Wallet to scan the QR code from the website.',
    },
    [Progress.ACCEPT_CREDENTIAL]: {
      title: 'Accept your student card',
      text: "Your wallet now has a secure and private connection with BestBC College. You should have received an offer in BC Wallet for a Student card.\nReview what they are sending, and choose 'Accept offer'.",
    },
    [Progress.SETUP_COMPLETED]: {
      title: '',
      text: 'Student card',
    },
  },
  starterCredentials: {
    [Progress.ACCEPT_CREDENTIAL]: {
      id: uuid(),
      name: 'Student card',
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
