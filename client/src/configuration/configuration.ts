import type { Character, Configuration } from '../slices/types'

import { OnboardingContainer as OnboardingContainerJoyce } from '../customComponents/joyce/onboarding/OnboardingContainer'
import { Stepper as StepperJoyce } from '../customComponents/joyce/onboarding/components/Stepper'
import { StepperItems as StepperItemsJoyce } from '../customComponents/joyce/onboardingUtils/OnboardingUtils'
import { OnboardingContainer } from '../pages/onboarding/OnboardingContainer'
import { Stepper } from '../pages/onboarding/components/Stepper'
import {
  OnboardingComplete,
  OnboardingComplete as OnboardingCompleteJoyce,
  StepperItems,
} from '../utils/OnboardingUtils'

const defaultConfigurations: Configuration = {
  DashboardHeader: () => null,
  Stepper: Stepper,
  OnboardingContainer: OnboardingContainer,
  OnboardingComplete: OnboardingComplete,
  StepperItems: StepperItems,
}
const configurations: Record<string, Configuration> = {
  lawyer: {
    ...defaultConfigurations,
    DashboardHeader: StepperJoyce,
    Stepper: StepperJoyce,
    OnboardingContainer: OnboardingContainerJoyce,
    OnboardingComplete: OnboardingCompleteJoyce,
    StepperItems: StepperItemsJoyce,
  },
}

export const getConfiguration = (currentCharacter?: Character): Configuration => {
  if (currentCharacter) {
    const config = configurations[currentCharacter.type.toLowerCase()]
    return config ?? defaultConfigurations
  }
  return defaultConfigurations
}
