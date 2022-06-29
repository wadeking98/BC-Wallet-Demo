import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

export const Student: Character = {
  id: '1',
  image: '/public/student/student.svg',
  name: 'Alice',
  type: 'Student',
  backgroundImage: '/public/student/onboarding-overlay.png',
  onboardingText: 'Add your Student ID to your digital wallet',
  backstory:
    "Meet Alice (that's you in this demo!). Alice is a student at BestBC College. To help make student life easier, BestBC College is going to offer Alice a digital Student Card to put in her BC Wallet.",
  starterCredentials: [
    {
      id: uuid(),
      name: 'Student Card',
      icon: '/public/student/icon-student.svg',
      attributes: [
        { name: 'student_first_name', value: 'Alice' },
        { name: 'student_last_name', value: 'Smith' },
        {
          name: 'expiry_date',
          value: (function () {
            const expiry = new Date()
            expiry.setFullYear(expiry.getFullYear() + 4)
            return expiry.toISOString().split('T')[0].replace(/-/g, '')
          })(),
        },
      ],
    },
  ],
}
