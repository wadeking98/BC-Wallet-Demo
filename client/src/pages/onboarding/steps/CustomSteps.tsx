import type { Character } from '../../../slices/types'

import { motion } from 'framer-motion'
import React from 'react'

import { fadeX, fadeExit } from '../../../FramerAnimations'
import { useCharacters } from '../../../slices/characters/charactersSelectors'
import { useConnection } from '../../../slices/connection/connectionSelectors'
import { useCredentials } from '../../../slices/credentials/credentialsSelectors'
import { StepInformation } from '../components/StepInformation'

import { AcceptCredential } from './AcceptCredential'
import { SetupConnection } from './SetupConnection'

export const LAWYER2_PREAMBLE: React.FC = () => {
  return (
    <motion.div variants={fadeX} initial="hidden" animate="show" exit="exit">
      <StepInformation
        title={'Joyce is a member of LSBC'}
        text={
          "Before Joyce needed to prove herself in person she did this with the LSBC and BCSC and she's now ready to start proving herlsef online"
        }
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
      src={'x'}
      alt="BCSC App Image"
    />
  )
}

export const LAWYER2_MEMBER_CONNECT: React.FC = () => {
  const { id, state, invitationUrl } = useConnection()
  const { currentCharacter } = useCharacters()
  return (
    <SetupConnection
      connectionId={id}
      invitationUrl={invitationUrl}
      newConnection
      disableSkipConnection
      completeTriggerNextPage
      connectionState={state}
      currentCharacter={currentCharacter as Character}
      title={'Get your LSBC Member Card'}
      text={'Joyce can now be issued her LSBC credential from the memeber portal'}
      backgroundImage={currentCharacter?.backgroundImage}
      onboardingText={currentCharacter?.onboardingText}
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
      title={'Accept your LSBC Member Card'}
      text={'This credential proves that Joyce is a lawyer'}
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
  LAWYER2_MEMBER_CONNECT: { element: <LAWYER2_MEMBER_CONNECT />, isBackDisabled: false },
  LAWYER2_MEMBER_ISSUE: { element: <LAWYER2_MEMBER_ISSUE />, isBackDisabled: true },
}
