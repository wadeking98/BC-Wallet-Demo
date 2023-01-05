import type { ProofAttribute, ProofPredicateInfo } from '@aries-framework/core'

export interface Configuration {
  DashboardHeader: React.FC<any>
  Stepper: React.FC<any>
  OnboardingContainer: React.FC<any>
  OnboardingComplete: (onboardingStep: number) => boolean
  StepperItems: any[]
}

export interface Connection {
  id: string
  state: string
  invitationUrl: string
}

export interface ProofRequestData {
  connectionId: string
  attributes?: ProofAttribute[]
  predicates?: ProofPredicateInfo[]
  requestOptions?: RequestOptions
}

export interface TextWithImage {
  text?: string
  image?: string
}

export interface CharacterContent {
  title: string
  text: string
  textWithImage?: TextWithImage[]
  image?: string
  isBackDisabled?: boolean
}

export interface Character {
  id: string
  image: string
  name: string
  type: string
  backstory: string
  skipWalletPrompt?: boolean
  content: { [key: number]: CharacterContent }
  backgroundImage?: string
  onboardingText?: string
  disableSkipConnection?: boolean
  starterCredentials: Record<number, CredentialData>
  onboardingEntity?: Entity
}

export interface UseCase {
  slug: string
  card: UseCaseCard
  stepper: StepperItem[]
  sections: Section[]
}

export interface UseCaseCard {
  title: string
  image: string
  description: string
}

export interface Section {
  id: string
  entity: Entity
  colors: Colors
  requestedCredentials?: RequestedCredential[]
  issueCredentials?: CredentialData[]
  steps: Step[]
}

export interface RequestedCredential {
  id: string
  name: string
  icon: string
  properties?: string[]
  predicates?: { name: string; value?: string | number | (() => string | number); type: string }
  credentialDefinitionId?: string
}

export interface CredentialData {
  id: string
  icon: string
  name: string
  credentialDefinitionId: string
  properties?: { name: string }[]
  attributes?: Attribute[]
}

export interface Attribute {
  name: string
  value: string
}

export interface StepperItem {
  id: string
  name: string
  description: string
  steps: number
  section: number
}

export interface Step {
  id: string
  type: StepType
  title: string
  description?: string
  image?: string
  buttonText?: string
  requestOptions?: RequestOptions
  useProof?: boolean
  endStepper?: EndStepperItem[]
  overlay?: Overlay
  overlayImage?: boolean
}

export interface Overlay {
  header?: string
  subheader?: string
  footer?: string
}

export interface EndStepperItem {
  id: string
  title: string
  description: string
  image: string
}

export interface Entity {
  name: string
  icon: string
  imageUrl?: string
}

export interface Colors {
  primary: string
  secondary: string
}

export enum StepType {
  START,
  INFO,
  CONNECTION,
  PROOF,
  PROOF_OOB,
  CREDENTIAL,
  STEP_END,
  END,
}

export interface RequestOptions {
  name?: string
  comment?: string
}

export interface CharWithUseCases {
  characterId: string
  useCases: UseCase[]
}

export interface Wallet {
  id: number
  name: string
  organization: string
  recommended: boolean
  icon: string
  url: string
  apple: string
  android: string
  ledgerImage?: string
}
