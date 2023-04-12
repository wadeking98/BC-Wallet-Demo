import type { Character, CredentialData, Entity } from '../../../slices/types'
import type { Content } from '../../../utils/OnboardingUtils'

import { motion } from 'framer-motion'
import { track } from 'insights-js'
import React, { useEffect } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

import { fade, fadeX } from '../../../FramerAnimations'
import { Button } from '../../../components/Button'
import { Loader } from '../../../components/Loader'
import { QRCode } from '../../../components/QRCode'
import { useAppDispatch } from '../../../hooks/hooks'
import { useInterval } from '../../../hooks/useInterval'
import { clearConnection, setDeepLink } from '../../../slices/connection/connectionSlice'
import { createInvitation, fetchConnectionById } from '../../../slices/connection/connectionThunks'
import { clearCredentials } from '../../../slices/credentials/credentialsSlice'
import { useOnboarding } from '../../../slices/onboarding/onboardingSelectors'
import { completeOnboarding, setOnboardingConnectionId } from '../../../slices/onboarding/onboardingSlice'
import { setConnectionDate } from '../../../slices/preferences/preferencesSlice'
import { fetchAllUseCasesByCharId } from '../../../slices/useCases/useCasesThunks'
import { basePath } from '../../../utils/BasePath'
import { prependApiUrl } from '../../../utils/Url'
import { StepInformation } from '../components/StepInformation'

export interface Props {
  content?: Content
  currentCharacter: Character
  connectionId?: string
  skipIssuance(): void
  nextSlide(): void
  invitationUrl?: string
  connectionState?: string
  newConnection?: boolean
  disableSkipConnection?: boolean
  customIssuer?: Entity
  title: string
  text: string
  backgroundImage?: string
  onboardingText?: string
}

export const SetupConnection: React.FC<Props> = ({
  content,
  currentCharacter,
  connectionId,
  skipIssuance,
  nextSlide,
  title,
  text,
  invitationUrl,
  connectionState,
  newConnection,
  customIssuer,
  disableSkipConnection,
  backgroundImage,
  onboardingText,
}) => {
  const deepLink = `bcwallet://aries_connection_invitation?${invitationUrl?.split('?')[1]}`
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const dispatch = useAppDispatch()
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
  const isCompleted = connectionState === 'response' || connectionState === 'complete' || connectionState === 'active'

  useEffect(() => {
    if (!isCompleted || newConnection) {
      dispatch(createInvitation(customIssuer ?? currentCharacter?.onboardingEntity))
      dispatch(clearCredentials())
    }
  }, [])

  useEffect(() => {
    if (connectionId) {
      dispatch(setOnboardingConnectionId(connectionId))
      const date = new Date()
      dispatch(setConnectionDate(date))
    }
  }, [connectionId])

  useInterval(
    () => {
      if (connectionId && document.visibilityState === 'visible') {
        dispatch(fetchConnectionById(connectionId))
      }
    },
    !isCompleted ? 1000 : null
  )

  const renderQRCode = (overlay?: boolean) => {
    return invitationUrl ? (
      <QRCode invitationUrl={invitationUrl} connectionState={connectionState} overlay={overlay} />
    ) : null
  }

  const handleDeepLink = () => {
    if (connectionId) {
      dispatch(setDeepLink())
      nextSlide()
      setTimeout(() => {
        window.location.href = deepLink
      }, 250)
    }
  }

  const renderCTA = !isCompleted ? (
    <motion.div variants={fade} key="openWallet">
      {currentCharacter.starterCredentials && (
        <>
          <p>
            Scan the QR-code with your <a href={deepLink}>wallet {isMobile && 'or'} </a>
          </p>
          {isMobile && (
            <a onClick={handleDeepLink} className="underline underline-offset-2 mt-2">
              open in wallet
              <FiExternalLink className="inline pb-1" />
            </a>
          )}
        </>
      )}
      {!disableSkipConnection && (
        <div className="my-5">
          <Button text="I Already Have my Credential" onClick={skipIssuance}></Button>
        </div>
      )}
    </motion.div>
  ) : (
    <motion.div variants={fade} key="ctaCompleted">
      <p>Success! You can continue.</p>
    </motion.div>
  )

  return !backgroundImage || isMobile ? (
    <motion.div
      className="flex flex-col h-full  dark:text-white"
      variants={fadeX}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <StepInformation title={title ?? content?.title} text={text ?? content?.text} />
      {currentCharacter.starterCredentials && (
        <div className="max-w-xs flex flex-col self-center items-center bg-white rounded-lg p-4  dark:text-black">
          {renderQRCode(true)}
        </div>
      )}
      <div className="flex flex-col mt-4 text-center text-sm md:text-base font-semibold">{renderCTA}</div>
    </motion.div>
  ) : (
    <motion.div
      className="flex flex-col h-full  dark:text-white"
      variants={fadeX}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <StepInformation title={title ?? content?.title} text={text ?? content?.text} />
      <div
        className="bg-contain position-relative bg-center bg-no-repeat h-full flex justify-center"
        style={{ backgroundImage: `url(${prependApiUrl(backgroundImage as string)})` }}
      >
        <div className="max-w-xs flex flex-col self-center items-center bg-white rounded-lg p-4  dark:text-black">
          {onboardingText && <p className="text-center font-semibold mb-2">{onboardingText}</p>}
          <p className="text-center mb-2">Scan the QR Code below with your digital wallet.</p>
          <div>{renderQRCode(true)}</div>
          <div className="mt-5">
            <Button text="I Already Have my Credential" onClick={skipIssuance}></Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
