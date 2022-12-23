import type { StepperStep } from '../../onboardingUtils/OnboardingSteps'

import React from 'react'

import { useDarkMode } from '../../../../hooks/useDarkMode'
import { Progress } from '../../onboardingUtils/OnboardingUtils'

export interface Props {
  item: StepperStep
  onboardingStep?: number
  onboardingDone?: boolean
  demoDone?: boolean
  last?: boolean
}

export const StepperItem: React.FC<Props> = ({ item, onboardingDone, onboardingStep, demoDone, last }) => {
  const darkMode = useDarkMode()

  const currentStepIsEqual = item.onboardingStep === onboardingStep
  const currentStepIsNotEqual = item.onboardingStep !== onboardingStep
  const currentStepIsHigher =
    (onboardingDone && (!last || demoDone)) || (onboardingStep !== undefined && onboardingStep > item.onboardingStep)
  const currentStepIsLower = !currentStepIsHigher

  return (
    <>
      <div className="flex text-grey dark:text-white relative">
        <div
          className={`rounded-full transition duration-1000 ease-in-out py-3 h-12 w-12 border-2 ${
            currentStepIsEqual
              ? 'bg-white dark:bg-bcgov-black border-2 border-bcgov-blue dark:border-bcgov-gold '
              : `${currentStepIsLower && currentStepIsNotEqual ? 'grayscale' : ''}`
          } ${
            currentStepIsHigher && currentStepIsNotEqual
              ? ' border-2 border-bcgov-blue dark:border-bcgov-gold bg-white dark:bg-bcgov-black text-white'
              : ''
          } `}
        >
          <img alt={item.name} src={darkMode ? item.iconDark : item.iconLight} className="m-auto h-5" />
        </div>
      </div>
      {item.onboardingStep !== Progress.SETUP_COMPLETED + 1 && (
        <div
          className={`flex-auto  transition duration-300 ease-in-out  ${
            currentStepIsHigher && currentStepIsNotEqual
              ? ' border-t-4 border-bcgov-blue dark:border-bcgov-gold bg-bcgov-blue dark:bg-bcgov-gold'
              : ' border-t-2 border-grey bg-grey'
          }`}
        />
      )}
    </>
  )
}
