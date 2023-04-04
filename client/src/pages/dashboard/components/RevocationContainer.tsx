import type { RevocationRecord } from '../../../slices/types'

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
  const [completedRevocations, setCompletedRevocations] = useState<string[]>([])
  const [loadingRevocations, setLoadingRevocations] = useState<string[]>([])

  const renderUseCases = revocationRecord.map((item) => {
    return (
      <RevocationItem
        key={item.revocationRegId}
        revocationRecord={item}
        callback={() => {
          const revocations = completedRevocations.filter((rev) => rev !== item.revocationRegId)
          setCompletedRevocations(revocations)

          const loadingList = loadingRevocations
          loadingList.push(item.revocationRegId)
          setLoadingRevocations(loadingList)

          revokeCredential(item).then((result) => {
            if (result.status === 200) {
              revocations.push(item.revocationRegId)
              setCompletedRevocations(revocations)
            }
            setLoadingRevocations(loadingRevocations.filter((rev) => rev !== item.revocationRegId))
          })
        }}
        isCompleted={completedRevocations.includes(item.revocationRegId)}
        isLoading={loadingRevocations.includes(item.revocationRegId)}
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
