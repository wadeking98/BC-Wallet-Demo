import type { Character } from '../../../slices/types'
import type { Content } from '../../../utils/OnboardingUtils'

import { motion } from 'framer-motion'
import React from 'react'

import { fadeX } from '../../../FramerAnimations'
import { useDarkMode } from '../../../hooks/useDarkMode'
import { StepInformation } from '../components/StepInformation'

export interface Props {
  content: Content
  currentCharacter?: Character
  characters: Character[]
  title: string
  text: string
}

export const PickCharacter: React.FC<Props> = ({ content, currentCharacter, characters, title, text }) => {
  const darkMode = useDarkMode()

  return (
    <motion.div variants={fadeX} initial="hidden" animate="show" exit="exit">
      <StepInformation title={title ?? content.title} text={text ?? content.text} />
    </motion.div>
  )
}
