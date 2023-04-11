import type { ConnectionState } from '../../../slices/connection/connectionSlice'
import type { Entity, RequestedCredential, Step } from '../../../slices/types'

import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'

import { fade, fadeX } from '../../../FramerAnimations'
import { apiCall } from '../../../api/BaseUrl'
import { Modal } from '../../../components/Modal'
import { QRCode } from '../../../components/QRCode'
import { useAppDispatch } from '../../../hooks/hooks'
import { useInterval } from '../../../hooks/useInterval'
import { setDeepLink } from '../../../slices/connection/connectionSlice'
import { createInvitation, fetchConnectionById } from '../../../slices/connection/connectionThunks'
import { createDeepProof } from '../../../slices/proof/proofThunks'
import { nextStep } from '../../../slices/useCases/useCasesSlice'
import { prependApiUrl } from '../../../utils/Url'
import { StepInfo } from '../components/StepInfo'

export interface Props {
  step: Step
  connection: ConnectionState
  entity: Entity
}

export const StepConnection: React.FC<Props> = ({ step, connection, entity }) => {
  const dispatch = useAppDispatch()
  const { id, state, invitationUrl } = connection
  const isCompleted = state === 'response' || state === 'complete' || state === 'active'
  const deepLink = `bcwallet://aries_connection_invitation?${invitationUrl?.split('?')[1]}`
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  useEffect(() => {
    if (!isCompleted) dispatch(createInvitation(entity))
  }, [])

  useInterval(
    () => {
      if (id && document.visibilityState === 'visible') dispatch(fetchConnectionById(id))
    },
    !isCompleted ? 1000 : null
  )

  const handleDeepLink = () => {
    if (connection.id) {
      dispatch(setDeepLink())
      dispatch(nextStep())
      setTimeout(() => {
        window.location.href = deepLink
      }, 500)
    }
  }

  const renderQRCode = (overlay?: boolean) => {
    return invitationUrl ? <QRCode invitationUrl={invitationUrl} connectionState={state} overlay={overlay} /> : null
  }

  const renderCTA = !isCompleted ? (
    <motion.div variants={fade} key="openWallet">
      <p>
        Scan the QR-code with your digital wallet {isMobile && 'or '}
        {isMobile && (
          <a onClick={handleDeepLink} className="underline underline-offset-2 mt-2">
            open in your wallet
            <FiExternalLink className="inline pb-1" />
          </a>
        )}{' '}
        to prove things about yourself
      </p>
    </motion.div>
  ) : (
    <motion.div variants={fade} key="ctaCompleted">
      <p>Success! You can continue.</p>
    </motion.div>
  )

  return (
    <motion.div variants={fadeX} initial="hidden" animate="show" exit="exit" className="flex flex-col h-full">
      <StepInfo title={step.title} description={step.description} />
      {step.image && !isMobile ? (
        <div
          className="bg-contain bg-center bg-no-repeat h-full flex justify-end"
          title={step.title}
          style={{ backgroundImage: `url(${prependApiUrl(step.image)})` }}
        >
          <div className="max-w-xs flex flex-col self-center items-center bg-white rounded-lg p-4 mr-8 shadow-lg dark:text-black">
            {step?.overlay?.header && <p className="w-3/4 text-center font-semibold mb-2">{step.overlay.header}</p>}
            {renderQRCode(true)}
            {step?.overlay?.footer && <p className="w-3/4 text-center mt-2">{step.overlay.footer}</p>}
          </div>
        </div>
      ) : (
        <>
          {renderQRCode()}
          <div className="flex flex-col my-4 text-center font-semibold">{renderCTA}</div>
        </>
      )}
    </motion.div>
  )
}
