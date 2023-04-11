import axios from 'axios'
import { Body, JsonController, Post } from 'routing-controllers'
import { Service } from 'typedi'

export const apiCall = axios.create({ baseURL: 'http://localhost:5000' })

@JsonController('/deeplink')
@Service()
export class DeeplinkController {

  @Post('/offerCredential')
  public async offerCredential(@Body() params: any) {
    const state = await this.waitUntilConnected(params.connectionId)
    if (state === 'complete' || state === 'response' || state === 'active') {
      const resp = await apiCall.post('/demo/credentials/offerCredential', params)
      return resp.data
    }
  }

  @Post('/requestProof')
  public async requestProof(@Body() params: any) {
    const state = await this.waitUntilConnected(params.connectionId)
    if (state === 'complete' || state === 'response' || state === 'active') {
      const resp = await apiCall.post('/demo/proofs/requestProof', params)
      return resp.data
    }
  }

  private async waitUntilConnected(connectionId: string): Promise<string> {
    let state = ''
    for (let i = 0; i < 10 && state !== 'complete' && state !== 'response'; i++) {
      await new Promise((r) => setTimeout(r, 1000))
      if (state !== 'complete' && state !== 'response') {
        apiCall.get(`/demo/connections/${connectionId}`).then((resp) => {
          state = resp.data?.state
        })
      }
    }
    return state
  }
}
