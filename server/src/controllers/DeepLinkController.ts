import axios from 'axios'
import { Body, Get, JsonController, Post } from 'routing-controllers'
import { Inject, Service } from 'typedi'

import { CredDefService } from './CredDefService'

export const apiCall = axios.create({ baseURL: 'http://localhost:5000' })

@JsonController('/deeplink')
@Service()
export class DeeplinkController {
  @Inject()
  private service: CredDefService

  public constructor(service: CredDefService) {
    this.service = service
  }

  @Post('/offer-credential')
  public async offerCredential(@Body() params: any) {
    const state = await this.waitUntilConnected(params.connectionId)
    if (state === 'complete' || state === 'responded' || state === 'completed') {
      const resp = await apiCall.post('/credentials/offerCredential', params)
      return resp.data
    }
  }

  @Post('/request-proof')
  public async requestProof(@Body() params: any) {
    const state = await this.waitUntilConnected(params.connectionId)
    if (state === 'complete' || state === 'responded' || state === 'completed') {
      const resp = await apiCall.post('/proofs/request-proof', params)
      return resp.data
    }
  }

  private async waitUntilConnected(connectionId: string): Promise<string> {
    let state = ''
    for (let i = 0; i < 10 && state !== 'complete' && state !== 'responded'; i++) {
      await new Promise((r) => setTimeout(r, 1000))
      if (state !== 'complete' && state !== 'responded') {
        apiCall.get(`/connections/${connectionId}`).then((resp) => {
          state = resp.data?.state
        })
      }
    }
    return state
  }
}
