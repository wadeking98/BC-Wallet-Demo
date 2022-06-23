import type { ConnectionState } from '../../../slices/connection/connectionSlice'
import type { Entity, Step } from '../../../slices/types'

import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'

import { fade, fadeX } from '../../../FramerAnimations'
import { Modal } from '../../../components/Modal'
import { QRCode } from '../../../components/QRCode'
import { useAppDispatch } from '../../../hooks/hooks'
import { useInterval } from '../../../hooks/useInterval'
import { createInvitation, fetchConnectionById } from '../../../slices/connection/connectionThunks'
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
  const isCompleted = state === 'responded' || state === 'complete'

  useEffect(() => {
    if (!isCompleted) dispatch(createInvitation(entity))
  }, [])

  useInterval(
    () => {
      if (id && document.visibilityState === 'visible') dispatch(fetchConnectionById(id))
    },
    !isCompleted ? 1000 : null
  )

  const renderQRCode = (overlay?: boolean) => {
    return invitationUrl ? <QRCode invitationUrl={invitationUrl} connectionState={state} overlay={overlay} /> : null
  }

  const deepLink = `didcomm://aries_connection_invitation?${invitationUrl?.split('?')[1]}`
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const renderCTA = !isCompleted ? (
    <motion.div variants={fade} key="openWallet">
      <p>
        Scan the QR-code with your digital wallet {isMobile && 'or '}
        {isMobile && (
          <a href={deepLink} className="underline underline-offset-2 mt-2">
            open in your wallet
            <FiExternalLink className="inline pb-1" />
          </a>
        )}{' '}
        to prove you're a student.
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
