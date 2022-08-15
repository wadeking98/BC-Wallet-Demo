import type { Content } from '../../../utils/OnboardingUtils'

import { motion } from 'framer-motion'
import React from 'react'

import { fadeX } from '../../../FramerAnimations'

export interface Props {
  content: Content
  characterName: string
  credName: string
}

export const SetupCompleted: React.FC<Props> = ({ content, characterName, credName }) => {
  const lastIndex = content.title.lastIndexOf(' ')
  const lastWord = (
    <p className="inline text-bcgov-blue dark:text-bcgov-gold">{content.title.substring(lastIndex + 1)}</p>
  )
  const newTitle = content.title.substring(0, lastIndex)

  return (
    <motion.div className="h-full" variants={fadeX} initial="hidden" animate="show" exit="exit">
      <div className="flex flex-col leading-loose">
        <div className="flex-1 my-4">
          <h2 className="text-3xl md:text-4xl font-semibold dark:text-white">
            {newTitle}&nbsp;
            {lastWord}
          </h2>
        </div>
        <div className="pt-4 flex-1 mb-6">
          <div className="dark:text-white">
            <p>Your (pretend) {credName} is in your BC Wallet!</p>
            <div className="bg-bcgov-white dark:bg-bcgov-black py-4 px-8">
              <ul className="list-disc">
                <li>You control when you use the {credName}.</li>
                <li>You can share part of the {credName}'s information, or even just that you're a member.</li>
                <li>No one else is told when you use it.</li>
                <li>The information from your {credName} is always shared securely.</li>
                <li>Anyone who receives the information can trust it's legitimate.</li>
              </ul>
            </div>

            <p>We're done with this step. Next, we'll explore ways you can use your {credName}.</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
