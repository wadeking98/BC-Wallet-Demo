import type { CredentialData, RequestedCredential, RevocationRecord, UseCase } from '../../../slices/types'
import type { CredentialRecord } from '@aries-framework/core'
import type { CredReqMetadata } from 'indy-sdk'

// import { CredentialRecord, JsonTransformer } from '@aries-framework/core'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

import { dashboardTitle, rowContainer } from '../../../FramerAnimations'
import { revokeCredential } from '../../../api/RevocationApi'

import { RevocationItem } from './RevocationItem'

export interface Props {
  revocationRecord: RevocationRecord[]
}

export const RevocationContainer: React.FC<Props> = ({ revocationRecord }) => {
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const renderUseCases = revocationRecord.map((item) => {
    return (
      <RevocationItem
        key={item.revocationRegId}
        revocationRecord={item}
        callback={() => {
          setIsLoading(true)
          setIsCompleted(false)
          revokeCredential(item).then((result) => {
            if (result.status === 200) {
              setIsCompleted(true)
            }
            setIsLoading(false)
          })
        }}
        isCompleted={isCompleted}
        isLoading={isLoading}
      />
    )
  })

  return (
    <div className="flex flex-col mx-4 lg:mx-4 my-2 p-4 md:p-6 lg:p-8 bg-white dark:bg-bcgov-darkgrey dark:text-white rounded-lg shadow-sm">
      <motion.h1 variants={dashboardTitle} className="text-3xl md:text-4xl font-bold mb-2">
        Revoking your credentials
      </motion.h1>
      <motion.div variants={rowContainer} className="flex flex-col w-auto overflow-x-hidden md:overflow-x-visible">
        {renderUseCases}
      </motion.div>
    </div>
  )
}
