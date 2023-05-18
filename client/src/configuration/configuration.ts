import type { Character, Configuration, CustomCharacter } from '../slices/types'

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
    DashboardHeader: () => null,
    Stepper: Stepper,
    OnboardingContainer: OnboardingContainer,
    OnboardingComplete: OnboardingComplete,
    StepperItems: StepperItems,
  },
}

export const getConfiguration = (currentCharacter?: CustomCharacter): Configuration => {
  if (currentCharacter) {
    const config = configurations[currentCharacter.type.toLowerCase()]
    return config ?? defaultConfigurations
  }
  return defaultConfigurations
}
