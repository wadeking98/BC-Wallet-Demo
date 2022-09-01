import type { ProofRequestData } from '../types'

import { createAsyncThunk } from '@reduxjs/toolkit'

import * as Api from '../../api/ProofApi'

export const createProof = createAsyncThunk('proof/createProof', async (data: ProofRequestData) => {
  const response = await Api.createProofRequest(data)
  return response.data
})

export const createDeepProof = createAsyncThunk('proof/createProof', async (data: ProofRequestData) => {
  const response = await Api.createDeepProofRequest(data)
  return response.data
})

export const createProofOOB = createAsyncThunk('proof/createProofOOB', async (data: ProofRequestData) => {
  const response = await Api.createOOBProofRequest(data)
  return response.data
})

export const fetchProofById = createAsyncThunk('proof/fetchById', async (id: string) => {
  const response = await Api.getProofById(id)
  return response.data
})

export const deleteProofById = createAsyncThunk('proof/deleteById', async (id: string) => {
  await Api.deleteProofById(id)
  return id
})

export const acceptProofById = createAsyncThunk('proof/acceptById', async (id: string) => {
  const response = await Api.acceptProofById(id)
  return response.data
})

export const acceptDeepProofById = createAsyncThunk('proof/acceptById', async (id: string) => {
  const response = await Api.getProofById(id)
  return response.data
})
