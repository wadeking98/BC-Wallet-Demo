import axios from 'axios'
import { Inject, Service } from 'typedi'

import { tractionRequest } from '../utils/tractionHelper'

@Service()
export class CredDefService {
  @Inject()
  private credentialDefinitions: any[] = []

  public constructor() {
    this.init()
  }

  public getCredentialDefinitionIdByTag(tag: string) {
    const def = this.credentialDefinitions.find((x) => x.tag === tag)

    if (!def) {
      throw new Error(`CredentialDefinition not found for ${tag}`)
    }

    return def.id
  }

  public async getAll() {
    if (this.credentialDefinitions.length === 0) {
      await this.init()
    }
    return this.credentialDefinitions
  }

  public async getAllCredentialsByConnectionId(connectionId: string) {
    const credentialsResp = await tractionRequest.get(`/issue-credential/records`, {
      params: { connection_id: connectionId },
    })
    const credRecords = credentialsResp.data?.results as any[]

    return credRecords
  }

  private async init() {
    const cd1 = await this.createCredentialDefinition(`${process.env.TRACTION_DID}:2:student_card:1.0`)
    // "attributes": [
    //   "Name", "Street", "City", "Date of birth", "Nationality"
    // ]

    const cd2 = await this.createCredentialDefinition(`${process.env.TRACTION_DID}:2:Member Card:1.5.1`)
    //"attrNames": [
    //   "Security code", "Card number", "Issuer", "Holder", "Valid until"
    // ],

    const cd3 = await this.createCredentialDefinition(`${process.env.TRACTION_DID}:2:Person:1.0`)

    // const cd3 = await this.createCredentialDefinition({
    //   schemaId: 'q7ATwTYbQDgiigVijUAej:2:Airplane Ticket:1.0',
    //   supportRevocation: false,
    //   tag: 'Airplane Ticket',
    // })
    // "attrNames": [
    //   "Airline", "Class", "Seat", "Passenger"
    // ],

    // const cd4 = await this.createCredentialDefinition({
    //   schemaId: 'q7ATwTYbQDgiigVijUAej:2:Conference Pass:1.0.0',
    //   supportRevocation: false,
    //   tag: 'Conference Pass',
    // })
    // "attrNames": [
    //   "Name", "Nationality"
    // ],

    // const cd5 = await this.createCredentialDefinition({
    //   schemaId: 'q7ATwTYbQDgiigVijUAej:2:Hotel Keycard:1.0.0',
    //   supportRevocation: false,
    //   tag: 'Hotel Keycard',
    // })
    // "attrNames": [
    //   "name", "room"
    // ],

    // const cd6 = await this.createCredentialDefinition({
    //   schemaId: 'q7ATwTYbQDgiigVijUAej:2:University Card:1.0.2',
    //   supportRevocation: false,
    //   tag: 'University Card',
    // })
    // "attrNames": [
    //   "Date of birth", "StudentID", "Valid until", "University", "Faculty", "Name"
    // ],

    // const cd7 = await this.createCredentialDefinition({
    //   schemaId: "q7ATwTYbQDgiigVijUAej:2:Master's Degree:1.0.0",
    //   supportRevocation: false,
    //   tag: `Master's Degree`,
    // })
    // "attrNames": [
    //   "Graduate", "Date", "Field", "Institute"
    // ],

    // const cd8 = await this.createCredentialDefinition({
    //   schemaId: 'q7ATwTYbQDgiigVijUAej:2:Proof of Employment:1.0.0',
    //   supportRevocation: false,
    //   tag: `Proof of Employment`,
    // })
    // "attrNames": [
    //   "Date", "Organization", "Title", "Name"
    // ]

    // const cd9 = await this.createCredentialDefinition({
    //   schemaId: 'q7ATwTYbQDgiigVijUAej:2:Rent Agreement:1.0.1',
    //   supportRevocation: false,
    //   tag: `Rent Agreement`,
    // })
    // "attributes": [
    //   "Landlord", "Name", "Rent", "Start date", "End date"
    // ]

    // const cd10 = await this.createCredentialDefinition({
    //   schemaId: 'q7ATwTYbQDgiigVijUAej:2:Laptop Invoice:1.0.1',
    //   supportRevocation: false,
    //   tag: `Laptop Invoice`,
    // })
    // "attrNames": [
    //  "Street", "Store", "Name", "City", "Product", "Price", "Date"
    // ]

    // const cd11 = await this.createCredentialDefinition({
    //   schemaId: 'q7ATwTYbQDgiigVijUAej:2:Crypto Wallet:1.0.2',
    //   supportRevocation: false,
    //   tag: `Crypto Wallet`,
    // })
    // "attrNames": [
    //  "Address", "Balance"
    // ]

    // const cd12 = await this.createCredentialDefinition({
    //   schemaId: 'q7ATwTYbQDgiigVijUAej:2:Gym Membership:1.0',
    //   supportRevocation: false,
    //   tag: `Gym Membership`,
    // })
    // "attrNames": [
    //  "Name", "Valid until", "Date of birth"
    // ],

    // this.credentialDefinitions = [cd1, cd2, cd3, cd4, cd5, cd6, cd7, cd8, cd9, cd10, cd11, cd12]
    this.credentialDefinitions = [cd1, cd2, cd3]
  }

  private async createCredentialDefinition(schemaId: string) {
    const credDefIds = (
      await tractionRequest.get(`/credential-definitions/created`, { params: { schema_id: schemaId } })
    ).data?.credential_definition_ids as string[] | undefined
    if (!credDefIds || credDefIds.length <= 0) {
      return
    }
    const credDefId = credDefIds[credDefIds.length - 1]
    const credDef = (await tractionRequest.get(`/credential-definitions/${encodeURIComponent(credDefId)}`)).data
      ?.credential_definition
    return credDef
  }
}
