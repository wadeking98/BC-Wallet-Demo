import balloonDark from '../../../assets/dark/icon-balloon-dark.svg'
import moonDark from '../../../assets/dark/icon-moon-dark.svg'
import notificationDark from '../../../assets/dark/icon-notification-dark.svg'
import personDark from '../../../assets/dark/icon-person-dark.svg'
import walletDark from '../../../assets/dark/icon-wallet-dark.svg'
import balloonLight from '../../../assets/light/icon-balloon-light.svg'
import moonLight from '../../../assets/light/icon-moon-light.svg'
import notificationLight from '../../../assets/light/icon-notification-light.svg'
import personLight from '../../../assets/light/icon-person-light.svg'
import walletLight from '../../../assets/light/icon-wallet-light.svg'

import { Progress } from './OnboardingUtils'

export interface StepperStep {
  name: string
  onboardingStep: number
  iconLight: string
  iconDark: string
}

export const steps: StepperStep[] = [
  { name: 'moon', onboardingStep: Progress.SETUP_START, iconLight: moonLight, iconDark: moonDark },
  { name: 'person', onboardingStep: Progress.PICK_CHARACTER, iconLight: personLight, iconDark: personDark },
  { name: 'wallet', onboardingStep: Progress.CONNECT_LSBC, iconLight: walletLight, iconDark: walletDark },
  {
    name: 'notification',
    onboardingStep: Progress.SETUP_COMPLETED,
    iconLight: notificationLight,
    iconDark: notificationDark,
  },
  { name: 'balloon', onboardingStep: Progress.SETUP_COMPLETED + 1, iconLight: balloonLight, iconDark: balloonDark },
]
