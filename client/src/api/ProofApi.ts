import type { ProofRequestData } from '../slices/types'
import type { AxiosResponse } from 'axios'

import { apiCall } from './BaseUrl'

export const createProofRequest = (data: ProofRequestData): Promise<AxiosResponse> => {
  const proofRequest = {
    requested_attributes: Object.assign({}, data.attributes),
    requested_predicates: Object.assign({}, data.predicates),
    version: '1.0.0',
    name: data.requestOptions?.name,
  }

  return apiCall.post(`/proofs/request-proof`, {
    connectionId: data.connectionId,
    proofRequest: proofRequest,
    comment: data.requestOptions?.comment,
  })
}

export const createDeepProofRequest = (data: ProofRequestData): Promise<AxiosResponse> => {
  const proofRequest = {
    requested_attributes: Object.assign({}, data.attributes),
    requested_predicates: Object.assign({}, data.predicates),
    version: '1.0.0',
    name: data.requestOptions?.name ?? 'Proof Request',
  }

  return apiCall.post(`/demo/deeplink/request-proof`, {
    connectionId: data.connectionId,
    proofRequest: proofRequest,
    comment: data.requestOptions?.comment ?? '',
    autoAcceptProof: 'always',
  })
}

export const createOOBProofRequest = (data: ProofRequestData): Promise<AxiosResponse> => {
  const proofRequest = {
    requested_attributes: Object.assign({}, data.attributes),
    requested_predicates: Object.assign({}, data.predicates),
    version: '1.0.0',
    name: data.requestOptions?.name,
  }

  return apiCall.post(`/proofs/request-outofband-proof`, {
    proofRequest: proofRequest,
    comment: data.requestOptions?.comment,
  })
}

export const getProofById = (proofId: string): Promise<AxiosResponse> => {
  return apiCall.get(`/proofs/${proofId}`)
}

export const deleteProofById = (proofId: string): Promise<AxiosResponse> => {
  return apiCall.delete(`/proofs/${proofId}`)
}

export const acceptProofById = (proofId: string): Promise<AxiosResponse> => {
  return apiCall.post(`/proofs/${proofId}/accept-presentation`)
}
