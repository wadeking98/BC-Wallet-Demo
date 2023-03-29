import type { AxiosRequestConfig } from 'axios'

import axios from 'axios'

export let agentKey = ''

export const tractionApiKeyUpdaterInit = async () => {
  // get traction api key
  const tractionBaseUrl = process.env.TRACTION_URL ?? ''
  const tennantId = process.env.TENNANT_ID ?? ''
  const walletSecret = process.env.WALLET_SECRET ?? ''
  agentKey =
    (await axios.post(`${tractionBaseUrl}/multitenancy/wallet/${tennantId}/token`, { wallet_key: walletSecret })).data
      ?.token ?? agentKey
  // refresh agent key every hour
  setInterval(async () => {
    agentKey =
      (await axios.post(`${tractionBaseUrl}/multitenancy/wallet/${tennantId}/token`, { wallet_key: walletSecret })).data
        ?.token ?? agentKey
  }, 3600000)
}

export const tractionRequest = {
  get: (url: string, config?: AxiosRequestConfig<any>) => {
    return axios.get(`${process.env.TRACTION_URL}${url}`, {
      ...config,
      headers: { ...config?.headers, Authorization: `Bearer ${agentKey}` },
    })
  },
  post: (url: string, data: any, config?: AxiosRequestConfig<any>) => {
    return axios.post(`${process.env.TRACTION_URL}${url}`, data, {
      ...config,
      headers: { ...config?.headers, Authorization: `Bearer ${agentKey}` },
    })
  },
}
