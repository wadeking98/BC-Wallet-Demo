import type { Character } from '../../../slices/types'

import { motion } from 'framer-motion'
import React from 'react'

import { fadeX, fadeExit } from '../../../FramerAnimations'
import { useAppDispatch } from '../../../hooks/hooks'
import { useCharacters } from '../../../slices/characters/charactersSelectors'
import { useConnection } from '../../../slices/connection/connectionSelectors'
import { useCredentials } from '../../../slices/credentials/credentialsSelectors'
import { useOnboarding } from '../../../slices/onboarding/onboardingSelectors'
import { addOnboardingProgress } from '../../../utils/OnboardingUtils'
import { prependApiUrl } from '../../../utils/Url'
import { StepInformation } from '../components/StepInformation'

import { AcceptCredential } from './AcceptCredential'
import { SetupConnection } from './SetupConnection'

export const LAWYER2_PREAMBLE: React.FC = () => {
  return (
    <motion.div variants={fadeX} initial="hidden" animate="show" exit="exit">
      <StepInformation
        title={'Going digital'}
        text={`Over time, The Government of B.C. and the Law Society of British Columbia has been making things more convenient by offering a choice of accessing services online and in-person. 

          Joyce has accumulated all physical credentials and has gone digital. She has been verified as a practising lawyer in B.C. and verified herself with the BC Services Card app.
          `}
      />
    </motion.div>
  )
}

export const LAWYER2_PREAMBLE_IMAGE: React.FC = () => {
  return (
    <motion.img
      variants={fadeExit}
      initial="hidden"
      animate="show"
      exit="exit"
      className="p-4"
      src={prependApiUrl('/public/lawyer2/onboarding/goingDigital.svg')}
      alt="Going digital"
    />
  )
}

export const LAWYER2_LSBC_PREAMBLE: React.FC = () => {
  return (
    <motion.div variants={fadeX} initial="hidden" animate="show" exit="exit">
      <StepInformation
        title={'Accessing court materials'}
        text={`Joyce has been going to the courthouse in person to access voice recordings and other confidential materials. Court Services Branch has let her know that she now has the choice of accessing court materials online.

          She just needs to prove she's a practising lawyer from B.C. and have a government issued ID with a matching name. She can get a digital lawyer member card from the Law Society of British Columbia and her Person credential from her BC Services Card app.`}
      />
    </motion.div>
  )
}

export const LAWYER2_LSBC_PREAMBLE_IMAGE: React.FC = () => {
  return (
    <motion.img
      variants={fadeExit}
      initial="hidden"
      animate="show"
      exit="exit"
      className="p-4"
      src={prependApiUrl('/public/lawyer2/onboarding/loginLSBC.svg')}
      alt="LSBC Portal Image"
    />
  )
}

export const LAWYER2_MEMBER_CONNECT: React.FC = () => {
  const dispatch = useAppDispatch()
  const { onboardingStep, customOnboardingStep } = useOnboarding()
  const { id, state, invitationUrl } = useConnection()
  const { currentCharacter } = useCharacters()
  const skipIssuance = () => {
    addOnboardingProgress(dispatch, onboardingStep, customOnboardingStep, currentCharacter, 2)
  }
  const nextSlide = () => {
    addOnboardingProgress(dispatch, onboardingStep, customOnboardingStep, currentCharacter)
  }
  return (
    <SetupConnection
      connectionId={id}
      invitationUrl={invitationUrl}
      skipIssuance={skipIssuance}
      nextSlide={nextSlide}
      newConnection
      customIssuer={{ name: 'Law Society of BC (Demo)', icon: '#' }}
      connectionState={state}
      currentCharacter={currentCharacter as Character}
      title={'Get your lawyer credential'}
      text={
        'Joyce is now ready to be issued her Law Society of British Columbia Member Card. She has logged into her member portal and is ready to accept a digital version of that card. Open the BC Wallet app on your phone, hit the scan button and accept.'
      }
      backgroundImage={'/public/lawyer2/onboarding/LSBCPortalOverlay.png'}
      onboardingText={currentCharacter?.onboardingText}
    />
  )
}

export const LAWYER2_MEMBER_IMAGE: React.FC = () => {
  return (
    <motion.img
      variants={fadeExit}
      initial="hidden"
      animate="show"
      exit="exit"
      className="p-4"
      src={prependApiUrl('/public/lawyer2/onboarding/lawyerCredPhone.svg')}
      alt="Member card image"
    />
  )
}

export const LAWYER2_MEMBER_ISSUE: React.FC = () => {
  const { id } = useConnection()
  const { currentCharacter } = useCharacters()
  const { credentials } = useCredentials()
  return id && currentCharacter ? (
    <AcceptCredential
      connectionId={id}
      useAltCreds={true}
      credentials={credentials}
      currentCharacter={currentCharacter}
      title={'Accept your lawyer credential'}
      text={
        'Check your phone. You’ve received a credential offer from the Law Society of British Columbia in your BC Wallet. You can use this credential to prove you’re a lawyer online.'
      }
    />
  ) : null
}

interface CustomContentContainer {
  element: JSX.Element
  image?: JSX.Element
  isBackDisabled: boolean
}

export const CustomContent: { [key: string]: CustomContentContainer } = {
  LAWYER2_PREAMBLE: { element: <LAWYER2_PREAMBLE />, image: <LAWYER2_PREAMBLE_IMAGE />, isBackDisabled: false },
  LAWYER2_LSBC_PREAMBLE: {
    element: <LAWYER2_LSBC_PREAMBLE />,
    image: <LAWYER2_LSBC_PREAMBLE_IMAGE />,
    isBackDisabled: false,
  },
  LAWYER2_MEMBER_CONNECT: {
    element: <LAWYER2_MEMBER_CONNECT />,
    image: <LAWYER2_MEMBER_IMAGE />,
    isBackDisabled: false,
  },
  LAWYER2_MEMBER_ISSUE: { element: <LAWYER2_MEMBER_ISSUE />, image: <LAWYER2_MEMBER_IMAGE />, isBackDisabled: true },
}
