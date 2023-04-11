import type { CredentialData } from '../slices/types'
import type { AxiosResponse } from 'axios'

import { apiCall } from './BaseUrl'

export const issueCredential = async (connectionId: string, data: CredentialData): Promise<AxiosResponse> => {
  return apiCall.post(`/demo/credentials/offerCredential`, {
    connection_id: connectionId,
    cred_def_id: data.credentialDefinitionId,
    credential_proposal: {
      '@type': 'issue-credential/1.0/credential-preview',
      attributes: data.attributes,
    },
  })
}

export const issueDeepCredential = async (connectionId: string, data: CredentialData): Promise<AxiosResponse> => {
  return apiCall.post(`/demo/deeplink/offerCredential`, {
    connectionId: connectionId,
    credentialDefinitionId: data.credentialDefinitionId,
    preview: {
      '@type': 'https://didcomm.org/issue-credential/1.0/credential-preview',
      attributes: data.attributes,
    },
  })
}

export const getDemoCredentialsByConnectionId = async (connectionId: string) => {
  return apiCall.get(`/demo/credentials/${connectionId}`)
}

export const getCredentialById = (credentialId: string): Promise<AxiosResponse> => {
  return apiCall.get(`/demo/credentials/${credentialId}`)
}

export const deleteCredentialById = (credentialId: string): Promise<AxiosResponse> => {
  return apiCall.delete(`/demo/credentials/${credentialId}`)
}
