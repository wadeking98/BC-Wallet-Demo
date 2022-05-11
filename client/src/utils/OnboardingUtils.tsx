import balloonDark from '../assets/dark/icon-balloon-dark.svg'
import moonDark from '../assets/dark/icon-moon-dark.svg'
import notificationDark from '../assets/dark/icon-notification-dark.svg'
import personDark from '../assets/dark/icon-person-dark.svg'
import walletDark from '../assets/dark/icon-wallet-dark.svg'
import onboardingChooseDark from '../assets/dark/onboarding-choose-dark.svg'
import onboardingCompletedDark from '../assets/dark/onboarding-completed-dark.svg'
import onboardingConnectDark from '../assets/dark/onboarding-connect-dark.svg'
import onboardingCredentialDark from '../assets/dark/onboarding-credential-dark.svg'
import onboardingSecureDark from '../assets/dark/onboarding-secure-dark.svg'
import onboardingStartDark from '../assets/dark/onboarding-started-dark.svg'
import onboardingWalletDark from '../assets/dark/onboarding-wallet-dark.svg'
import balloonLight from '../assets/light/icon-balloon-light.svg'
import moonLight from '../assets/light/icon-moon-light.svg'
import notificationLight from '../assets/light/icon-notification-light.svg'
import personLight from '../assets/light/icon-person-light.svg'
import walletLight from '../assets/light/icon-wallet-light.svg'
import onboardingChooseLight from '../assets/light/onboarding-choose-light.svg'
import onboardingCompletedLight from '../assets/light/onboarding-completed-light.svg'
import onboardingConnectLight from '../assets/light/onboarding-connect-light.svg'
import onboardingCredentialLight from '../assets/light/onboarding-credential-light.svg'
import onboardingSecureLight from '../assets/light/onboarding-secure-light.svg'
import onboardingStartLight from '../assets/light/onboarding-started-light.svg'
import onboardingWalletLight from '../assets/light/onboarding-wallet-light.svg'

export enum Progress {
  SETUP_START = 0,
  CHOOSE_WALLET = 1,
  PICK_CHARACTER = 2,
  RECEIVE_IDENTITY = 3,
  CONNECTION_COMPLETE = 4,
  ACCEPT_CREDENTIAL = 5,
  SETUP_COMPLETED = 6,
}

export interface Content {
  iconLight: string
  iconDark: string
  title: string
  text: string
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

export const OnboardingContent = {
  [Progress.SETUP_START]: {
    iconLight: onboardingStartLight,
    iconDark: onboardingStartDark,
    title: 'Let’s get you set up!',
    text: `In the next few minutes, you will experience the power of owning your own data. Using your actual phone, you will work with verifiable credentials: digital, authentic certificates that prove stuff. Don’t worry, we’ll explain it later. Let’s get you set up!`,
  },
  [Progress.CHOOSE_WALLET]: {
    iconLight: onboardingWalletLight,
    iconDark: onboardingWalletDark,
    title: 'You pick one.',
    text: 'First, we’ll set you up with a mobile wallet where you can save your credentials. Think of it as a physical wallet, a safe place where you store your data. Below are some of the mobile wallet applications we recommend. Choose as you like!',
  },
  [Progress.PICK_CHARACTER]: {
    iconLight: onboardingChooseLight,
    iconDark: onboardingChooseDark,
    title: 'Meet Alice',
    text: "Meet Alice. (That's you in this demo!)\n\nAlice is a student at BestBC College.\n\nTo help make student life easier, BestBc College is going to offer Alice a DIgital Student Card to put in her BC Wallet",
  },
  [Progress.RECEIVE_IDENTITY]: {
    iconLight: onboardingConnectLight,
    iconDark: onboardingConnectDark,
    title: `Connect with BestBC College`,
    text: `Image, as Alice, you are logged into the BestBC College website (see below). They want to offer you a Digital Student Card.\n\nUse your BC Wallet to scan the QR code from the website.`,
  },
  [Progress.CONNECTION_COMPLETE]: {
    iconLight: onboardingSecureLight,
    iconDark: onboardingSecureDark,
    title: 'Great, now we are connected.',
    text: 'Congratulations, you’ve just set up your first connection. With this secure channel, we can talk and exchange digital credentials. We’re going to give you some credentials to get you started with the demo. Get ready!',
  },
  [Progress.ACCEPT_CREDENTIAL]: {
    iconLight: onboardingCredentialLight,
    iconDark: onboardingCredentialDark,
    title: 'Accept your student card',
    text: `Your wallet now has a secure and private connection with BestBC College.\nYou should have received an offer in BC Wallet for a Student Card.\nReview what they are sending, and choose 'Accept offer'.`,
  },
  [Progress.SETUP_COMPLETED]: {
    iconLight: onboardingCompletedLight,
    iconDark: onboardingCompletedDark,
    title: 'You’re all set!',
    text: 'Congratulations, you’ve just received your first digital credentials. They are safely stored in your wallet and ready to be used. So, what are you waiting for? Let’s go, ',
  },
}
