import type { RequestedCredential, RevocationRecord, UseCaseCard } from '../../../slices/types'

import { motion } from 'framer-motion'
import React from 'react'

import { rowFadeX } from '../../../FramerAnimations'

import { StartButton } from './StartButton'

export interface Props {
  revocationRecord: RevocationRecord
  callback: () => void
  isCompleted: boolean
  isLoading?: boolean
}

export const RevocationItem: React.FC<Props> = ({ revocationRecord, callback, isCompleted, isLoading }) => {
  return (
    <motion.div variants={rowFadeX} key={revocationRecord.revocationRegId}>
      <div
        className={`flex flex-col bg-bcgov-white dark:bg-bcgov-black rounded-lg my-2 p-4 lg:p-4 lg:px-8 mt-2 h-auto shadow-sm`}
      >
        <h1 className="flex-none font-bold text-lg mb-2 h-6">{revocationRecord.revocationRegId.split(':')[6]}</h1>
        <div className="flex h-32 mt-2">
          <div className="h-full w-1/2 mr-2 m-auto xl:w-1/5" />
          <div className="w-2/3 xl:w-1/3 flex flex-col">
            <div className="flex flex-1 items-end justify-end">
              <StartButton
                onClick={callback}
                text={'REVOKE'}
                disabled={false}
                isCompleted={isCompleted}
                loading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
