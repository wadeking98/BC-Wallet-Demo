import type { Agent, CredentialPreviewAttributeOptions } from '@aries-framework/core'

export const issueCredential = async (agent:Agent, connId: string, credDefId:string, attributes:CredentialPreviewAttributeOptions[]) => {
    const credRecord = await agent.credentials.offerCredential({
        protocolVersion:"v1",
        connectionId: connId,
        credentialFormats:{
            indy:{
                credentialDefinitionId: credDefId,
                attributes
            }
        }
    })

    return credRecord
}