import type { StepperStep } from '../../../utils/OnboardingSteps'

import React from 'react'

import { useDarkMode } from '../../../hooks/useDarkMode'
import { Progress } from '../../../utils/OnboardingUtils'

export interface Props {
  item: StepperStep
  onboardingStep: number
}

export const StepperItem: React.FC<Props> = ({ item, onboardingStep }) => {
  const darkMode = useDarkMode()

  const currentStepIsEqual = item.onboardingStep === onboardingStep
  const currentStepIsNotEqual = item.onboardingStep !== onboardingStep
  const currentStepIsHigher = onboardingStep > item.onboardingStep
  const currentStepIsLower = onboardingStep < item.onboardingStep

  return (
    <>
      <div className="flex text-grey dark:text-white relative">
        <div
          className={`rounded-full transition duration-1000 ease-in-out py-3 h-12 w-12 border-2 ${
            currentStepIsEqual
              ? 'bg-white dark:bg-bcgov-black border-2 border-bcgov-coral dark:border-bcgov-gold '
              : `${currentStepIsLower && currentStepIsNotEqual ? 'grayscale' : ''}`
          } ${
            currentStepIsHigher && currentStepIsNotEqual
              ? ' border-2 border-bcgov-coral dark:border-bcgov-gold bg-white dark:bg-bcgov-black text-white'
              : ''
          } `}
        >
          <img alt={item.name} src={darkMode ? item.iconDark : item.iconLight} className="m-auto h-5" />
        </div>
      </div>
      {item.onboardingStep !== Progress.SETUP_COMPLETED && (
        <div
          className={`flex-auto  transition duration-300 ease-in-out  ${
            currentStepIsHigher && currentStepIsNotEqual
              ? ' border-t-4 border-bcgov-coral dark:border-bcgov-gold bg-bcgov-coral dark:bg-bcgov-gold'
              : ' border-t-2 border-grey bg-grey'
          }`}
        />
      )}
    </>
  )
}
