import axios from 'axios'

export const baseUrl = process.env.REACT_APP_HOST_BACKEND

export const apiCall = axios.create({ baseURL: baseUrl })
