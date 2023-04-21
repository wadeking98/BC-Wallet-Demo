import type { Entity, RequestedCredential, Step } from '../../../slices/types'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { fadeX } from '../../../FramerAnimations'
import { ActionCTA } from '../../../components/ActionCTA'
import { useAppDispatch } from '../../../hooks/hooks'
import { useInterval } from '../../../hooks/useInterval'
import { useConnection } from '../../../slices/connection/connectionSelectors'
import { createProof, deleteProofById, fetchProofById, createDeepProof } from '../../../slices/proof/proofThunks'
import { FailedRequestModal } from '../../onboarding/components/FailedRequestModal'
import { ProofAttributesCard } from '../components/ProofAttributesCard'
import { StepInfo } from '../components/StepInfo'

export interface Props {
  proof?: any
  step: Step
  connectionId: string
  requestedCredentials: RequestedCredential[]
  entity: Entity
}

export const StepProof: React.FC<Props> = ({ proof, step, connectionId, requestedCredentials, entity }) => {
  const dispatch = useAppDispatch()
  const proofReceived =
    (proof?.state as string) === 'presentation_received' ||
    (proof?.state as string) === 'verified' ||
    proof?.state === 'done'

  const [isFailedRequestModalOpen, setIsFailedRequestModalOpen] = useState(false)
  const showFailedRequestModal = () => setIsFailedRequestModalOpen(true)
  const closeFailedRequestModal = () => setIsFailedRequestModalOpen(false)

  const { isDeepLink } = useConnection()

  const createProofRequest = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const proofs: any = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const predicates: any = []

    requestedCredentials?.forEach((item) => {
      if (item.properties) {
        proofs[item.name] = {
          restrictions: [
            {
              schema_name: item.schemaId?.split(':')[2],
            },
          ],
          names: item.properties,
        }
      }
      if (item.predicates) {
        predicates[item.name] = {
          restrictions: [
            {
              schema_name: item.schemaId?.split(':')[2],
            },
          ],
          name: item.predicates?.name,
          p_value: item.predicates?.value,
          p_type: item.predicates?.type,
        }
      }
    })
    if (isDeepLink) {
      dispatch(
        createDeepProof({
          connectionId: connectionId,
          attributes: proofs,
          predicates: predicates,
          requestOptions: step.requestOptions,
        })
      )
    } else {
      dispatch(
        createProof({
          connectionId: connectionId,
          attributes: proofs,
          predicates: predicates,
          requestOptions: step.requestOptions,
        })
      )
    }
  }

  useEffect(() => {
    if (!proof) {
      createProofRequest()
    }
  }, [])

  useInterval(
    () => {
      if (!proofReceived && proof && document.visibilityState === 'visible') {
        dispatch(fetchProofById(proof.id))
      }
    },
    !proofReceived ? 1000 : null
  )

  const sendNewRequest = () => {
    if (!proofReceived && proof) {
      dispatch(deleteProofById(proof?.id))
      createProofRequest()
    }
    closeFailedRequestModal()
  }

  return (
    <motion.div variants={fadeX} initial="hidden" animate="show" exit="exit" className="flex flex-col h-full">
      <StepInfo title={step.title} description={step.description} />
      <div className="flex flex-row m-auto w-full">
        <div className="w-full lg:w-2/3 sxl:w-2/3 m-auto">
          {proof && (
            <ProofAttributesCard
              entity={entity}
              requestedCredentials={requestedCredentials}
              proof={proof}
              proofReceived={proofReceived}
            />
          )}
        </div>
      </div>
      <ActionCTA isCompleted={proofReceived} onFail={showFailedRequestModal} />
      {isFailedRequestModalOpen && (
        <FailedRequestModal
          key="credentialModal"
          action={sendNewRequest}
          close={closeFailedRequestModal}
          proof={true}
        />
      )}
    </motion.div>
  )
}
