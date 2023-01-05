import type { Character } from '../slices/types'
import type { Dispatch } from 'react'

import { track } from 'insights-js'

import balloonDark from '../assets/dark/icon-balloon-dark.svg'
import moonDark from '../assets/dark/icon-moon-dark.svg'
import notificationDark from '../assets/dark/icon-notification-dark.svg'
import personDark from '../assets/dark/icon-person-dark.svg'
import walletDark from '../assets/dark/icon-wallet-dark.svg'
import onboardingChooseDark from '../assets/dark/onboarding-choose-dark.svg'
import onboardingConnectDark from '../assets/dark/onboarding-connect-dark.svg'
import onboardingStartDark from '../assets/dark/onboarding-started-dark.svg'
import onboardingWalletDark from '../assets/dark/onboarding-wallet-dark.svg'
import bcWalletIcon from '../assets/light/getStarted.svg'
import balloonLight from '../assets/light/icon-balloon-light.svg'
import moonLight from '../assets/light/icon-moon-light.svg'
import notificationLight from '../assets/light/icon-notification-light.svg'
import personLight from '../assets/light/icon-person-light.svg'
import walletLight from '../assets/light/icon-wallet-light.svg'
import onboardingChooseLight from '../assets/light/onboarding-choose-light.svg'
import onboardingCompletedLight from '../assets/light/onboarding-completed-light.svg'
import onboardingConnectLight from '../assets/light/onboarding-connect-light.svg'
import onboardingCredentialLight from '../assets/light/onboarding-credential-light.svg'
import onboardingStartLight from '../assets/light/onboarding-started-light.svg'
import onboardingWalletLight from '../assets/light/onboarding-wallet-light.svg'
import { nextOnboardingStep, prevOnboardingStep, setOnboardingStep } from '../slices/onboarding/onboardingSlice'

export enum Progress {
  SETUP_START = 0,
  CHOOSE_WALLET,
  PICK_CHARACTER,
  RECEIVE_IDENTITY,
  ACCEPT_CREDENTIAL,
  SETUP_COMPLETED,
}

export interface Content {
  iconLight: string
  iconDark: string
  title: string
  text: string
}

export const OnboardingComplete = (onboardingStep: number): boolean => {
  return onboardingStep === Progress.SETUP_COMPLETED
}

export const StepperItems = [
  { name: 'moon', onboardingStep: Progress.SETUP_START, iconLight: moonLight, iconDark: moonDark },
  { name: 'wallet', onboardingStep: Progress.CHOOSE_WALLET, iconLight: walletLight, iconDark: walletDark },
  { name: 'person', onboardingStep: Progress.PICK_CHARACTER, iconLight: personLight, iconDark: personDark },
  {
    name: 'notification',
    onboardingStep: Progress.ACCEPT_CREDENTIAL,
    iconLight: notificationLight,
    iconDark: notificationDark,
  },
  { name: 'balloon', onboardingStep: Progress.SETUP_COMPLETED, iconLight: balloonLight, iconDark: balloonDark },
]

export const addOnboardingProgress = (
  dispatch: Dispatch<any>,
  onboardingStep: number,
  currentCharacter?: Character,
  step?: number
) => {
  const inc = step ?? 1
  if (currentCharacter?.skipWalletPrompt && onboardingStep === Progress.SETUP_START) {
    dispatch(setOnboardingStep(Progress.PICK_CHARACTER))
  } else {
    dispatch(nextOnboardingStep(inc))
  }
  track({
    id: 'onboarding-step-completed',
    parameters: {
      step: onboardingStep.toString(),
    },
  })
}

export const removeOnboardingProgress = (
  dispatch: Dispatch<any>,
  onboardingStep: number,
  currentCharacter?: Character
) => {
  if (currentCharacter?.skipWalletPrompt && onboardingStep === Progress.PICK_CHARACTER) {
    dispatch(setOnboardingStep(Progress.SETUP_START))
  } else {
    dispatch(prevOnboardingStep())
  }
}

export const OnboardingContent = {
  [Progress.SETUP_START]: {
    iconLight: bcWalletIcon,
    iconDark: bcWalletIcon,
    title: `Let's get started!`,
    text: `BC Wallet is a new app for storing and using credentials on your smartphone. Credentials are things like IDs, licenses and diplomas. \nUsing your BC Wallet is fast and simple. In the future it can be used online and in person.
    You approve every use, and share only what is needed. \nIn this demo, you will use two credentials to prove who you are and access court materials online instead of in-person.`,
  },
  [Progress.CHOOSE_WALLET]: {
    iconLight: onboardingWalletLight,
    iconDark: onboardingWalletDark,
    title: `Install BC Wallet`,
    text: `First, install the BC Wallet app onto your smartphone. Select the button below for instructions and the next step.`,
  },
  [Progress.PICK_CHARACTER]: {
    iconLight: onboardingChooseLight,
    iconDark: onboardingChooseDark,
    title: `Who do you want to be today?`,
    text: 'It’s time to pick your character. Every character has its own set of use cases, which explore the power of digital credentials. Don’t worry, you can change your character later.',
  },
  [Progress.RECEIVE_IDENTITY]: {
    iconLight: onboardingConnectLight,
    iconDark: onboardingConnectDark,
    title: `Connect with BestBC College`,
    text: `Imagine, as Alice, you are logged into the BestBC College website. They now want to offer you a Digital Student Card. Use your BC Wallet to scan the QR code from the website.`,
  },
  [Progress.ACCEPT_CREDENTIAL]: {
    iconLight: onboardingCredentialLight,
    iconDark: onboardingCredentialLight,
    title: `Accept your student card`,
    text: `Your wallet now has a secure and private connection with BestBC College. You should have received an offer in BC Wallet for a Student Card.\nReview what they are sending, and choose 'Accept offer'.`,
  },
  [Progress.SETUP_COMPLETED]: {
    iconLight: onboardingCompletedLight,
    iconDark: onboardingCompletedLight,
    title: `You're all set!`,
    text: `Congratulations, you’ve just received your first digital credentials. They are safely stored in your wallet and ready to be used. So, what are you waiting for? Let’s go!`,
  },
}
