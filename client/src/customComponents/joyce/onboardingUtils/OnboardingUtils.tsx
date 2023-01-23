import type { Character } from '../../../slices/types'
import type { Dispatch } from 'react'

import { track } from 'insights-js'

import balloonDark from '../../../assets/dark/icon-balloon-dark.svg'
import moonDark from '../../../assets/dark/icon-moon-dark.svg'
import notificationDark from '../../../assets/dark/icon-notification-dark.svg'
import personDark from '../../../assets/dark/icon-person-dark.svg'
import walletDark from '../../../assets/dark/icon-wallet-dark.svg'
import onboardingChooseDark from '../../../assets/dark/onboarding-choose-dark.svg'
import onboardingConnectDark from '../../../assets/dark/onboarding-connect-dark.svg'
import onboardingWalletDark from '../../../assets/dark/onboarding-wallet-dark.svg'
import bcWalletIcon from '../../../assets/light/getStarted.svg'
import balloonLight from '../../../assets/light/icon-balloon-light.svg'
import moonLight from '../../../assets/light/icon-moon-light.svg'
import notificationLight from '../../../assets/light/icon-notification-light.svg'
import personLight from '../../../assets/light/icon-person-light.svg'
import walletLight from '../../../assets/light/icon-wallet-light.svg'
import onboardingChooseLight from '../../../assets/light/onboarding-choose-light.svg'
import onboardingCompletedLight from '../../../assets/light/onboarding-completed-light.svg'
import onboardingConnectLight from '../../../assets/light/onboarding-connect-light.svg'
import onboardingCredentialLight from '../../../assets/light/onboarding-credential-light.svg'
import onboardingWalletLight from '../../../assets/light/onboarding-wallet-light.svg'
import { nextOnboardingStep, prevOnboardingStep, setOnboardingStep } from '../../../slices/onboarding/onboardingSlice'

export enum Progress {
  PICK_CHARACTER = 0,
  SETUP_START,
  CHOOSE_WALLET,
  GOING_DIGITAL,
  ACCESS_COURT_MATERIALS,
  CONNECT_LSBC,
  ACCEPT_LSBC,
  CONNECT_PERSON,
  ACCEPT_PERSON,
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
  { name: 'person', onboardingStep: Progress.PICK_CHARACTER, iconLight: personLight, iconDark: personDark },
  { name: 'moon', onboardingStep: Progress.SETUP_START, iconLight: moonLight, iconDark: moonDark },
  { name: 'wallet', onboardingStep: Progress.CONNECT_LSBC, iconLight: walletLight, iconDark: walletDark },
  {
    name: 'notification',
    onboardingStep: Progress.SETUP_COMPLETED,
    iconLight: notificationLight,
    iconDark: notificationDark,
  },
  { name: 'balloon', onboardingStep: Progress.SETUP_COMPLETED + 1, iconLight: balloonLight, iconDark: balloonDark },
]

export const addOnboardingProgress = (
  dispatch: Dispatch<any>,
  onboardingStep: number,
  currentCharacter?: Character,
  step?: number
) => {
  const inc = step ?? 1
  if (currentCharacter?.skipWalletPrompt && onboardingStep === Progress.SETUP_START) {
    dispatch(setOnboardingStep(Progress.GOING_DIGITAL))
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
  if (currentCharacter?.skipWalletPrompt && onboardingStep === Progress.GOING_DIGITAL) {
    dispatch(setOnboardingStep(Progress.SETUP_START))
  } else {
    dispatch(prevOnboardingStep())
  }
}

export const OnboardingContent = {
  [Progress.PICK_CHARACTER]: {
    iconLight: onboardingChooseLight,
    iconDark: onboardingChooseDark,
    title: `Who do you want to be today?`,
    text: 'It’s time to pick your character. Every character has its own set of use cases, which explore the power of digital credentials. Don’t worry, you can change your character later.',
  },
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
  [Progress.GOING_DIGITAL]: {
    iconLight: onboardingChooseLight,
    iconDark: onboardingChooseDark,
    title: 'Going Digital',
    text: `Over time, The Government of B.C. and the Law Society of British Columbia has been making things more convenient by offering a choice of accessing services online and in-person. 

    Joyce has accumulated all physical credentials and has gone digital. She has been verified as a practising lawyer in B.C. and verified herself with the BC Services Card app.
    `,
  },
  [Progress.ACCESS_COURT_MATERIALS]: {
    iconLight: onboardingChooseLight,
    iconDark: onboardingChooseDark,
    title: 'Accessing court materials',
    text: `Joyce has been going to the courthouse in person to access voice recordings and other confidential materials. Court Services Branch has let her know that she now has the choice of accessing court materials online.

    She just needs to prove she's a practising lawyer from B.C. and have a government issued ID with a matching name. She can get a digital lawyer member card from the Law Society of British Columbia and her Person credential from her BC Services Card app.`,
  },
  [Progress.CONNECT_LSBC]: {
    iconLight: onboardingConnectLight,
    iconDark: onboardingConnectDark,
    title: `Get your lawyer credential`,
    text: `Joyce is now ready to be issued her Law Society of British Columbia Member Card. She has logged into her member portal and is ready to accept a digital version of that card. Open the BC Wallet app on your phone, hit the scan button and accept.`,
  },
  [Progress.ACCEPT_LSBC]: {
    iconLight: onboardingCredentialLight,
    iconDark: onboardingCredentialLight,
    title: `Accept your lawyer credential`,
    text: `Check your phone. You’ve received a credential offer from the Law Society of British Columbia in your BC Wallet. You can use this credential to prove you’re a lawyer online.`,
  },
  [Progress.CONNECT_PERSON]: {
    iconLight: onboardingConnectLight,
    iconDark: onboardingConnectDark,
    title: 'Get Person credential',
    text: 'Joyce gets her Person credential from the BC Services Card app. She starts the process within BC Wallet. For this demo you will scan this QR code to receive the credential offer.',
  },
  [Progress.ACCEPT_PERSON]: {
    iconLight: onboardingCredentialLight,
    iconDark: onboardingCredentialLight,
    title: 'Accept your Person credential',
    text: 'Check your phone. You’ve received a credential offer from Service BC in your BC Wallet. You can use this credential to prove who you are online.',
  },
  [Progress.SETUP_COMPLETED]: {
    iconLight: onboardingCompletedLight,
    iconDark: onboardingCompletedLight,
    title: `You're all set!`,
    text: `Congratulations, you’ve just received your first digital credentials. They are safely stored in your wallet and ready to be used. So, what are you waiting for? Let’s go!`,
  },
}
