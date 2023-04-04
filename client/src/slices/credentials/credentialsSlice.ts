import type { RevocationRecord } from '../types'
import type { CredentialRecord } from '@aries-framework/core'
import type { SerializedError } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

import {
  fetchCredentialsByConId,
  fetchCredentialById,
  issueCredential,
  deleteCredentialById,
} from './credentialsThunks'

interface CredentialState {
  credentials: CredentialRecord[]
  issuedCredentials: CredentialRecord[]
  revokableCredentials: RevocationRecord[]
  isLoading: boolean
  isIssueCredentialLoading: boolean
  error: SerializedError | undefined
}

const initialState: CredentialState = {
  credentials: [],
  issuedCredentials: [],
  revokableCredentials: [],
  isLoading: true,
  isIssueCredentialLoading: true,
  error: undefined,
}

const credentialSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    clearCredentials: (state) => {
      state.credentials.map(
        (x) =>
          ((x.state as string) === 'credential_issued' ||
            (x.state as string) === 'credential_acked' ||
            x.state === 'done') &&
          state.issuedCredentials.push(x)
      )
      state.credentials = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCredentialsByConId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCredentialsByConId.fulfilled, (state, action) => {
        state.isLoading = false
        let revocationObjects: RevocationRecord[] = []
        if (action.payload.length) {
          revocationObjects = action.payload
            .filter(
              (item: any) =>
                item.revoc_reg_id !== undefined &&
                !state.revokableCredentials.map((rev) => rev.revocationRegId).includes(item.revoc_reg_id)
            )
            .map((item: any) => {
              return {
                revocationRegId: item.revoc_reg_id,
                connectionId: item.connection_id,
                credRevocationId: item.revocation_id,
              }
            })
        }
        state.revokableCredentials.push(...revocationObjects)
        state.credentials = action.payload
      })
      .addCase(issueCredential.rejected, (state, action) => {
        state.isIssueCredentialLoading = false
        state.error = action.error
      })
      .addCase(issueCredential.pending, (state) => {
        state.isIssueCredentialLoading = true
      })
      .addCase(issueCredential.fulfilled, (state, action) => {
        state.isIssueCredentialLoading = false
        state.credentials.push(action.payload)
      })
      .addCase(fetchCredentialById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCredentialById.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.credentials.findIndex((cred) => cred.id == action.payload.id)

        if (index == -1) {
          state.credentials.push(action.payload)
          return state
        }

        state.credentials[index] = action.payload
        return state
      })
      .addCase(deleteCredentialById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCredentialById.fulfilled, (state, action) => {
        state.isLoading = false
        state.credentials.filter((cred) => cred.id !== action.payload)
        return state
      })
      .addCase('clearUseCase', (state) => {
        state.credentials.map(
          (x) =>
            ((x.state as string) === 'credential_issued' ||
              (x.state as string) === 'credential_acked' ||
              x.state === 'done') &&
            state.issuedCredentials.push(x)
        )
        state.credentials = []
        state.isLoading = false
      })
  },
})

export const { clearCredentials } = credentialSlice.actions

export default credentialSlice.reducer
