/*eslint-disable */
import type { Character } from '../../slices/types'
import type { CredentialRecord } from '@aries-framework/core'

import { AnimatePresence, motion } from 'framer-motion'
import { track } from 'insights-js'
import React, { useEffect, useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

import { fadeDelay, fadeExit } from '../../FramerAnimations'
import { Modal } from '../../components/Modal'
import { useAppDispatch } from '../../hooks/hooks'
import { useDarkMode } from '../../hooks/useDarkMode'
import { clearConnection } from '../../slices/connection/connectionSlice'
import { clearCredentials } from '../../slices/credentials/credentialsSlice'
import {
  completeOnboarding,
  nextCustomOnboardingStep,
  setCustomOnboardingStep,
  nextOnboardingStep,
  prevOnboardingStep,
  setOnboardingStep,
  prevCustomOnboardingStep,
} from '../../slices/onboarding/onboardingSlice'
import { fetchAllUseCasesByCharId } from '../../slices/useCases/useCasesThunks'
import { basePath } from '../../utils/BasePath'
import { Progress, OnboardingContent } from '../../utils/OnboardingUtils'

import { CharacterContent } from './components/CharacterContent'
import { OnboardingBottomNav } from './components/OnboardingBottomNav'
import { AcceptCredential } from './steps/AcceptCredential'
import { ChooseWallet } from './steps/ChooseWallet'
import { ConnectionComplete } from './steps/ConnectionComplete'
import { CustomContent } from './steps/CustomSteps'
import { PickCharacter } from './steps/PickCharacter'
import { SetupCompleted } from './steps/SetupCompleted'
import { SetupConnection } from './steps/SetupConnection'
import { SetupStart } from './steps/SetupStart'

export interface Props {
  characters: Character[]
  currentCharacter?: Character
  connectionId?: string
  connectionState?: string
  invitationUrl?: string
  onboardingStep: number
  customOnboardingStep?: number
  credentials: CredentialRecord[]
}

export const OnboardingContainer: React.FC<Props> = ({
  characters,
  currentCharacter,
  onboardingStep,
  customOnboardingStep,
  connectionId,
  connectionState,
  invitationUrl,
  credentials,
}) => {
  const darkMode = useDarkMode()
  const dispatch = useAppDispatch()

  const connectionCompleted = connectionState === 'responded' || connectionState === 'complete'
  const credentialsAccepted = Object.values(credentials).every(
    (x) => x.state === 'credential-issued' || x.state === 'done'
  )
  const isBackDisabled = [Progress.SETUP_START, Progress.ACCEPT_CREDENTIAL].includes(onboardingStep) && customOnboardingStep === undefined
  const isForwardDisabled =
    onboardingStep === Progress.CHOOSE_WALLET ||
    (onboardingStep === Progress.RECEIVE_IDENTITY && !connectionCompleted) ||
    (onboardingStep === Progress.ACCEPT_CREDENTIAL && !credentialsAccepted) ||
    (onboardingStep === Progress.ACCEPT_CREDENTIAL && credentials.length === 0) ||
    (onboardingStep === Progress.PICK_CHARACTER && !currentCharacter)

  const addOnboardingProgress = () => {
    if (onboardingStep === currentCharacter?.customScreens?.startAt) {
      // if character custom content is enabled
      if (customOnboardingStep === undefined || customOnboardingStep < currentCharacter?.customScreens?.screens?.length - 1) {
        // if we are not at the end of the current user's custom content
        dispatch(nextCustomOnboardingStep())
      } else {
        // we are at end of custom content so increment the onboarding screen
        dispatch(nextCustomOnboardingStep())
        dispatch(setOnboardingStep(currentCharacter?.customScreens?.endAt))
      }
    } else if (currentCharacter?.skipWalletPrompt && onboardingStep === Progress.SETUP_START) {
      dispatch(setOnboardingStep(Progress.PICK_CHARACTER))
    } else {
      dispatch(nextOnboardingStep())
    }
    track({
      id: 'onboarding-step-completed',
      parameters: {
        step: onboardingStep.toString(),
      },
    })
  }

  const removeOnboardingProgress = () => {
    // if character custom content is enabled
    if(onboardingStep === currentCharacter?.customScreens?.endAt){
      dispatch(setOnboardingStep(currentCharacter?.customScreens?.startAt))
      dispatch(prevCustomOnboardingStep())
    } else if (onboardingStep === currentCharacter?.customScreens?.startAt) {
      // if character custom content is enabled
      if (customOnboardingStep !== undefined && customOnboardingStep > 0) {
        // if we are not at the beggining of the current user's custom content
        dispatch(prevCustomOnboardingStep())
      }else{
        dispatch(setCustomOnboardingStep(undefined))
      }
    } else if (currentCharacter?.skipWalletPrompt && onboardingStep === Progress.PICK_CHARACTER) {
      dispatch(setOnboardingStep(Progress.SETUP_START))
    } else {
      dispatch(prevOnboardingStep())
    }
  }

  //override title and text content to make them character dependant
  const getCharacterContent = (progress: number) => {
    const characterContent = currentCharacter?.content[progress]
    if (characterContent) {
      return characterContent
    }
    return { title: '', text: '' }
  }
  useEffect(() => {
    if (onboardingStep === Progress.RECEIVE_IDENTITY && connectionCompleted) {
      addOnboardingProgress()
    }
  }, [connectionState])

  const getComponentToRender = (progress: Progress) => {
    const { text, title } = getCharacterContent(progress)
    const components = {
      [Progress.SETUP_START]: <SetupStart key={Progress.SETUP_START} content={OnboardingContent[progress]} />,
      [Progress.CHOOSE_WALLET]: (
        <ChooseWallet
          key={Progress.CHOOSE_WALLET}
          content={OnboardingContent[progress]}
          addOnboardingProgress={addOnboardingProgress}
        />
      ),
      [Progress.PICK_CHARACTER]: (
        <PickCharacter
          key={Progress.PICK_CHARACTER}
          content={OnboardingContent[progress]}
          currentCharacter={currentCharacter}
          characters={characters}
          title={title}
          text={text}
        />
      ),
      [Progress.RECEIVE_IDENTITY]: (
        <SetupConnection
          key={Progress.RECEIVE_IDENTITY}
          content={OnboardingContent[progress]}
          connectionId={connectionId}
          invitationUrl={invitationUrl}
          connectionState={connectionState}
          currentCharacter={currentCharacter as Character}
          title={title}
          text={text}
          backgroundImage={currentCharacter?.backgroundImage}
          onboardingText={currentCharacter?.onboardingText}
        />
      ),
      [Progress.ACCEPT_CREDENTIAL]: currentCharacter && connectionId && (
        <AcceptCredential
          key={Progress.ACCEPT_CREDENTIAL}
          content={OnboardingContent[progress]}
          connectionId={connectionId}
          credentials={credentials}
          currentCharacter={currentCharacter}
          title={title}
          text={text}
        />
      ),
      [Progress.SETUP_COMPLETED]: currentCharacter && (
        <SetupCompleted
          key={Progress.SETUP_COMPLETED}
          content={OnboardingContent[progress]}
          characterName={currentCharacter.name}
          credName={text}
        />
      ),
    }

    let customContentId = undefined
    if (customOnboardingStep != undefined) {
      customContentId = currentCharacter?.customScreens?.screens[customOnboardingStep]
    }
    return customContentId ? CustomContent[customContentId] : components[progress]
  }

  const getImageToRender = (progress: Progress) => {
    const components = {
      [Progress.SETUP_START]: (
        <motion.img
          variants={fadeExit}
          initial="hidden"
          animate="show"
          exit="exit"
          className="p-4"
          key={Progress.SETUP_START}
          src={OnboardingContent[progress].iconLight}
          alt="BC Wallet"
        />
      ),
      [Progress.CHOOSE_WALLET]: (
        <motion.img
          variants={fadeExit}
          initial="hidden"
          animate="show"
          exit="exit"
          className="p-4"
          key={Progress.CHOOSE_WALLET}
          src={darkMode ? OnboardingContent[progress].iconDark : OnboardingContent[progress].iconLight}
          alt="choose wallet"
        />
      ),
      [Progress.PICK_CHARACTER]: <CharacterContent key={Progress.PICK_CHARACTER} character={currentCharacter} />,
      [Progress.RECEIVE_IDENTITY]: (
        <motion.img
          variants={fadeExit}
          initial="hidden"
          animate="show"
          exit="exit"
          className="p-4"
          key={Progress.RECEIVE_IDENTITY}
          src={darkMode ? OnboardingContent[progress].iconDark : OnboardingContent[progress].iconLight}
          alt="recieve identity"
        />
      ),
      [Progress.ACCEPT_CREDENTIAL]: currentCharacter && connectionId && (
        <motion.img
          variants={fadeExit}
          initial="hidden"
          animate="show"
          exit="exit"
          className="p-4"
          key={Progress.ACCEPT_CREDENTIAL}
          src={darkMode ? OnboardingContent[progress].iconDark : OnboardingContent[progress].iconLight}
          alt="accept credential"
        />
      ),
      [Progress.SETUP_COMPLETED]: (
        <motion.img
          variants={fadeExit}
          initial="hidden"
          animate="show"
          exit="exit"
          className="p-4"
          key={Progress.SETUP_COMPLETED}
          src={darkMode ? OnboardingContent[progress].iconDark : OnboardingContent[progress].iconLight}
          alt="setup completed"
        />
      ),
    }

    return components[progress]
  }

  const navigate = useNavigate()
  const onboardingCompleted = () => {
    if (connectionId && currentCharacter) {
      navigate(`${basePath}/dashboard`)
      dispatch(clearCredentials())
      dispatch(clearConnection())
      dispatch(completeOnboarding())
      dispatch(fetchAllUseCasesByCharId(currentCharacter.id))
    } else {
      // something went wrong so reset
      navigate(`${basePath}/`)
      dispatch({ type: 'demo/RESET' })
    }
  }

  const isMobile = useMediaQuery({ query: '(max-width: 976px)' })

  const style = isMobile ? { minHeight: '85vh' } : { minHeight: '620px', height: '75vh', maxHeight: '940px' }

  const [leaveModal, setLeaveModal] = useState(false)
  const LEAVE_MODAL_TITLE = 'Are you sure you want to leave?'
  const LEAVE_MODAL_DESCRIPTION = `You're progress will be lost and you'll be redirected to the homepage.`
  const showLeaveModal = () => setLeaveModal(true)
  const closeLeave = () => setLeaveModal(false)

  const leave = () => {
    navigate(`${basePath}/`)
    dispatch({ type: 'demo/RESET' })
  }

  return (
    <motion.div
      className="flex flex-row h-full justify-between bg-white dark:bg-bcgov-darkgrey rounded-lg p-2 w-full sxl:w-5/6 shadow"
      style={style}
    >
      <div className="flex flex-col grid justify-items-end w-full lg:w-2/3 px-8">
        <div className="w-full">
          <motion.button onClick={showLeaveModal} variants={fadeDelay}>
            <FiLogOut className="inline h-12 cursor-pointer dark:text-white" />
          </motion.button>
        </div>
        <AnimatePresence exitBeforeEnter>{getComponentToRender(onboardingStep)}</AnimatePresence>
        <OnboardingBottomNav
          onboardingStep={onboardingStep}
          addOnboardingStep={addOnboardingProgress}
          removeOnboardingStep={removeOnboardingProgress}
          forwardDisabled={isForwardDisabled}
          backDisabled={isBackDisabled}
          onboardingCompleted={onboardingCompleted}
        />
      </div>
      <div className="bg-bcgov-white dark:bg-bcgov-black hidden lg:flex lg:w-1/3 rounded-r-lg flex-col justify-center h-full select-none">
        <AnimatePresence exitBeforeEnter>{getImageToRender(onboardingStep)}</AnimatePresence>
      </div>
      {leaveModal && (
        <Modal title={LEAVE_MODAL_TITLE} description={LEAVE_MODAL_DESCRIPTION} onOk={leave} onCancel={closeLeave} />
      )}
    </motion.div>
  )
}
