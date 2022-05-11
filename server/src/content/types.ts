export interface Character {
  id: string
  image: string
  name: string
  type: string
  backstory: string
  starterCredentials: StarterCredential[]
}

export interface UseCase {
  slug: string
  card: UseCaseCard
  stepper: StepperItem[]
  sections: Section[]
}

export interface UseCaseCard {
  title: string
  image?: string
  description: string
}

export interface StarterCredential {
  id: string
  icon: string
  name: string
  attributes: Attribute[]
  credentialDefinitionId?: string
}

export interface Section {
  id: string
  entity: Entity
  colors: Colors
  requestedCredentials?: RequestedCredential[]
  issueCredentials?: IssueCredential[]
  steps: Step[]
}

export interface CredentialView {
  id: string
  icon: string
  name: string
}

export interface RequestedCredential {
  id: string
  name: string
  icon: string
  properties?: string[]
  predicates?: { name: string; value: string | number; type: string }
  credentialDefinitionId?: string
}

export interface CredentialData {
  id: string
  name: string
  icon: string
  credentialDefinition?: string
  attributes: Attribute[]
  connectionId: string
}

export interface IssueCredential {
  id: string
  name: string
  icon: string
  properties?: { name: string }[]
  attributes?: Attribute[]
  credentialDefinitionId?: string
}

export interface Attribute {
  name: string
  value: string | number
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
}

export interface Overlay {
  header?: string
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
