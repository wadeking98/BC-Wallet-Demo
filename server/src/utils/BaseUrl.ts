import axios from 'axios'

const baseUrl = process.env.AGENT_ADMIN_ENDPOINT

export const agentApiCall = axios.create({ baseURL: baseUrl })
