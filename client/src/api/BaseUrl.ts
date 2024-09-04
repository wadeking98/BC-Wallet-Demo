import axios from 'axios'

export const baseUrl = (process.env.REACT_APP_HOST_BACKEND ?? '') + '/digital-trust/showcase'
export const baseWsUrl = (process.env.REACT_APP_HOST_BACKEND_WS ?? '') + '/digital-trust/showcase'

export const apiCall = axios.create({ baseURL: baseUrl })
