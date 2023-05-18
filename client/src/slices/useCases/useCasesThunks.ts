import { createAsyncThunk } from '@reduxjs/toolkit'

import * as Api from '../../api/UseCaseApi'

export const fetchAllUseCasesByCharType = createAsyncThunk('useCases/fetchAllByCharId', async (type: string) => {
  const response = await Api.getUseCasesByCharType(type)
  return response.data
})

export const fetchUseCaseBySlug = createAsyncThunk('useCases/fetchBySlug', async (slug: string) => {
  const response = await Api.getUseCaseBySlug(slug)
  return response.data
})
