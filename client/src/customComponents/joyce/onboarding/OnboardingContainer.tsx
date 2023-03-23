import type { Character } from '../../../slices/types'
import type { CredentialRecord } from '@aries-framework/core'

import { AnimatePresence, motion } from 'framer-motion'
import { Item } from 'framer-motion/types/components/Reorder/Item'
import { track } from 'insights-js'
import React, { useEffect, useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

import { fadeDelay, fadeExit } from '../../../FramerAnimations'
import { Modal } from '../../../components/Modal'
import { useAppDispatch } from '../../../hooks/hooks'
import { useDarkMode } from '../../../hooks/useDarkMode'
import { CharacterContent } from '../../../pages/onboarding/components/CharacterContent'
import { AcceptCredential } from '../../../pages/onboarding/steps/AcceptCredential'
import { BasicSlide } from '../../../pages/onboarding/steps/BasicSlide'
import { ChooseWallet } from '../../../pages/onboarding/steps/ChooseWallet'
import { PickCharacter } from '../../../pages/onboarding/steps/PickCharacter'
import { SetupCompleted } from '../../../pages/onboarding/steps/SetupCompleted'
import { SetupConnection } from '../../../pages/onboarding/steps/SetupConnection'
import { SetupStart } from '../../../pages/onboarding/steps/SetupStart'
import { clearConnection } from '../../../slices/connection/connectionSlice'
import { clearCredentials } from '../../../slices/credentials/credentialsSlice'
import { completeOnboarding } from '../../../slices/onboarding/onboardingSlice'
import { fetchAllUseCasesByCharId } from '../../../slices/useCases/useCasesThunks'
import { basePath } from '../../../utils/BasePath'
import { prependApiUrl } from '../../../utils/Url'
import {
  Progress,
  OnboardingContent,
  addOnboardingProgress,
  removeOnboardingProgress,
} from '../onboardingUtils/OnboardingUtils'

import { OnboardingBottomNav } from './components/OnboardingBottomNav'

export interface Props {
  characters: Character[]
  currentCharacter?: Character
  inviteId?: string
  connectionId?: string
  connectionState?: string
  invitationUrl?: string
  onboardingStep: number
  credentials: CredentialRecord[]
}

export const OnboardingContainer: React.FC<Props> = ({
  characters,
  currentCharacter,
  onboardingStep,
  inviteId,
  connectionId,
  connectionState,
  invitationUrl,
  credentials,
}) => {
  const darkMode = useDarkMode()
  const dispatch = useAppDispatch()

  const connectionCompleted =
    connectionState === 'responded' || connectionState === 'complete' || connectionState === 'completed'
  const credentialsAccepted = Object.values(credentials).every(
    (x) => x.state === 'credential-issued' || x.state === 'done'
  )

  const isBackDisabled =
    [Progress.PICK_CHARACTER, Progress.ACCEPT_LSBC, Progress.ACCEPT_PERSON].includes(onboardingStep) ||
    !!currentCharacter?.content?.[onboardingStep]?.isBackDisabled
  const isForwardDisabled =
    ((onboardingStep === Progress.CONNECT_PERSON || onboardingStep === Progress.CONNECT_LSBC) &&
      !connectionCompleted) ||
    ((onboardingStep === Progress.ACCEPT_LSBC || onboardingStep === Progress.ACCEPT_PERSON) && !credentialsAccepted) ||
    ((onboardingStep === Progress.ACCEPT_LSBC || onboardingStep === Progress.ACCEPT_PERSON) &&
      credentials.length === 0) ||
    (onboardingStep === Progress.PICK_CHARACTER && !currentCharacter)

  const jumpOnboardingPage = () => {
    addOnboardingProgress(dispatch, onboardingStep, currentCharacter, 2)
  }

  const nextOnboardingPage = () => {
    addOnboardingProgress(dispatch, onboardingStep, currentCharacter)
  }

  const prevOnboardingPage = () => {
    removeOnboardingProgress(dispatch, onboardingStep, currentCharacter)
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
    if (
      (onboardingStep === Progress.CONNECT_LSBC || onboardingStep === Progress.CONNECT_PERSON) &&
      connectionCompleted
    ) {
      // if we are on a connection screen either custom or regular onboarding
      nextOnboardingPage()
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
          addOnboardingProgress={nextOnboardingPage}
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
          textWithImage={currentCharacter?.content?.[progress]?.textWithImage?.map((contentItem) => {
            return { ...contentItem, image: contentItem?.image ? prependApiUrl(contentItem.image) : '' }
          })}
        />
      ),
      [Progress.GOING_DIGITAL]: (
        <BasicSlide
          content={OnboardingContent[progress]}
          textWithImage={currentCharacter?.content?.[progress]?.textWithImage?.map((contentItem) => {
            return { ...contentItem, image: contentItem?.image ? prependApiUrl(contentItem.image) : '' }
          })}
        />
      ),
      [Progress.ACCESS_COURT_MATERIALS]: (
        <BasicSlide
          content={OnboardingContent[progress]}
          textWithImage={currentCharacter?.content?.[progress]?.textWithImage?.map((contentItem) => {
            return { ...contentItem, image: contentItem?.image ? prependApiUrl(contentItem.image) : '' }
          })}
        />
      ),
      [Progress.CONNECT_LSBC]: (
        <SetupConnection
          key={Progress.CONNECT_LSBC}
          content={OnboardingContent[progress]}
          inviteId={inviteId}
          skipIssuance={jumpOnboardingPage}
          nextSlide={nextOnboardingPage}
          invitationUrl={invitationUrl}
          newConnection
          disableSkipConnection={currentCharacter?.disableSkipConnection}
          connectionState={connectionState}
          currentCharacter={currentCharacter as Character}
          title={title}
          text={text}
          backgroundImage={'/public/lawyer2/onboarding/LSBCPortalOverlay.png'}
          onboardingText={currentCharacter?.onboardingText}
        />
      ),
      [Progress.ACCEPT_LSBC]: currentCharacter && connectionId && (
        <AcceptCredential
          key={Progress.ACCEPT_LSBC}
          content={OnboardingContent[progress]}
          connectionId={connectionId}
          credentials={credentials}
          credSelection={[Progress.ACCEPT_LSBC]}
          currentCharacter={currentCharacter}
          title={title}
          text={text}
        />
      ),
      [Progress.CONNECT_PERSON]: (
        <SetupConnection
          key={Progress.CONNECT_PERSON}
          content={OnboardingContent[progress]}
          inviteId={inviteId}
          skipIssuance={jumpOnboardingPage}
          nextSlide={nextOnboardingPage}
          invitationUrl={invitationUrl}
          newConnection
          disableSkipConnection={currentCharacter?.disableSkipConnection}
          connectionState={connectionState}
          currentCharacter={currentCharacter as Character}
          customIssuer={currentCharacter?.additionalEntity}
          title={title}
          text={text}
          onboardingText={currentCharacter?.onboardingText}
        />
      ),
      [Progress.ACCEPT_PERSON]: currentCharacter && connectionId && (
        <AcceptCredential
          key={Progress.ACCEPT_PERSON}
          content={OnboardingContent[progress]}
          connectionId={connectionId}
          credentials={credentials}
          credSelection={[Progress.ACCEPT_PERSON]}
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

    return components[progress]
  }

  const getImageToRender = (progress: Progress) => {
    const image = currentCharacter?.content?.[progress]?.image
      ? prependApiUrl(currentCharacter.content[progress].image as string)
      : OnboardingContent[progress].iconLight
    const components = {
      [Progress.SETUP_START]: (
        <motion.img
          variants={fadeExit}
          initial="hidden"
          animate="show"
          exit="exit"
          className="p-4"
          key={Progress.SETUP_START}
          src={image}
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
      [Progress.GOING_DIGITAL]: (
        <motion.img
          variants={fadeExit}
          initial="hidden"
          animate="show"
          exit="exit"
          className="p-4"
          src={image}
          alt="Going digital"
        />
      ),
      [Progress.ACCESS_COURT_MATERIALS]: (
        <motion.img
          variants={fadeExit}
          initial="hidden"
          animate="show"
          exit="exit"
          className="p-4"
          src={image}
          alt="LSBC Portal Image"
        />
      ),
      [Progress.CONNECT_LSBC]: (
        <motion.img
          variants={fadeExit}
          initial="hidden"
          animate="show"
          exit="exit"
          className="p-4"
          key={Progress.CONNECT_LSBC}
          src={image}
          alt="recieve identity"
        />
      ),
      [Progress.ACCEPT_LSBC]: currentCharacter && connectionId && (
        <motion.img
          variants={fadeExit}
          initial="hidden"
          animate="show"
          exit="exit"
          className="p-4"
          key={Progress.ACCEPT_LSBC}
          src={image}
          alt="accept credential"
        />
      ),
      [Progress.CONNECT_PERSON]: (
        <motion.img
          variants={fadeExit}
          initial="hidden"
          animate="show"
          exit="exit"
          className="p-4"
          key={Progress.CONNECT_PERSON}
          src={image}
          alt="recieve identity"
        />
      ),
      [Progress.ACCEPT_PERSON]: currentCharacter && connectionId && (
        <motion.img
          variants={fadeExit}
          initial="hidden"
          animate="show"
          exit="exit"
          className="p-4"
          key={Progress.ACCEPT_PERSON}
          src={image}
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
          src={image}
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

  const style = isMobile ? { minHeight: '85vh' } : { minHeight: '680px', height: '75vh', maxHeight: '940px' }

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
          addOnboardingStep={nextOnboardingPage}
          removeOnboardingStep={prevOnboardingPage}
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
