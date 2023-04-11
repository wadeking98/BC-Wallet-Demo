import type { ProofRequestData } from '../slices/types'
import type { AxiosResponse } from 'axios'

import { apiCall } from './BaseUrl'

export const createProofRequest = (data: ProofRequestData): Promise<AxiosResponse> => {
  const proofRequest = {
    requested_attributes: Object.assign({}, data.attributes),
    requested_predicates: Object.assign({}, data.predicates),
    non_revoked: { to: Math.floor(new Date().valueOf() / 1000) },
    version: '1.0.0',
    name: data.requestOptions?.name,
  }

  return apiCall.post(`/demo/proofs/requestProof`, {
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

  return apiCall.post(`/demo/proofs/request-outofband-proof`, {
    proofRequest: proofRequest,
    comment: data.requestOptions?.comment,
  })
}

export const getProofById = (proofId: string): Promise<AxiosResponse> => {
  return apiCall.get(`/demo/proofs/${proofId}`)
}

export const deleteProofById = (proofId: string): Promise<AxiosResponse> => {
  return apiCall.delete(`/demo/proofs/${proofId}`)
}
