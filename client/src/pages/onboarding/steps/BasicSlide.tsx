import type { TextWithImage } from '../../../slices/types'
import type { Content } from '../../../utils/OnboardingUtils'

import { motion } from 'framer-motion'
import React from 'react'

import { fadeX } from '../../../FramerAnimations'
import { StepInformation } from '../components/StepInformation'

export interface Props {
  content: Content
  textWithImage?: TextWithImage[]
}

export const BasicSlide: React.FC<Props> = ({ content, textWithImage }) => {
  return (
    <motion.div className="h-full" variants={fadeX} initial="hidden" animate="show" exit="exit">
      <StepInformation title={content.title} text={content.text} textWithImage={textWithImage} />
    </motion.div>
  )
}
