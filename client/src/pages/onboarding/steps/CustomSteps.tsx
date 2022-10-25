import { motion } from 'framer-motion'
import React from 'react'

import { fadeX } from '../../../FramerAnimations'
import { StepInformation } from '../components/StepInformation'

export interface Props {
  content: string
}

export const Test1: React.FC<Props> = ({ content }) => {
  return (
    <motion.div className="h-full" variants={fadeX} initial="hidden" animate="show" exit="exit">
      <StepInformation title={'Test 1'} text={content} />
    </motion.div>
  )
}

export const Test2: React.FC<Props> = ({ content }) => {
  return (
    <motion.div className="h-full" variants={fadeX} initial="hidden" animate="show" exit="exit">
      <StepInformation title={'Test 2'} text={content} />
    </motion.div>
  )
}

export const CustomContent: { [key: string]: JSX.Element } = {
  Test1: <Test1 content={'test'}></Test1>,
  Test2: <Test1 content={'test 2'}></Test1>,
}
