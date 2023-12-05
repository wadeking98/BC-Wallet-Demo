import { Body, Get, JsonController, Param, Post } from 'routing-controllers'
import { Service } from 'typedi'

import { tractionRequest } from '../utils/tractionHelper'

@JsonController('/connections')
@Service()
export class ConnectionController {
  @Get('/getConnectionStatus/:connId')
  public async getConnectionStatus(@Param('connId') connectionId: string) {
    const response = await tractionRequest.get(`/connections/${connectionId}`)
    return response.data
  }

  @Get('/invitationId/:id')
  public async getConnectionByInvitation(@Param('id') invitationId: string) {
    const response = await tractionRequest.get(`/connections?invitation_msg_id=${invitationId}`)
    return response.data.results[0]
  }

  @Post('/createInvite')
  public async createConnectionInvite(@Body() params: any) {
    const data = {
      ...params,
      accept: ['didcomm/aip1', 'didcomm/aip2;env=rfc19'],
      goal: 'Showcase connection',
      protocol_version: '1.0',
      handshake_protocols: ['https://didcomm.org/connections/1.0'],

      metadata: {},
    }
    const response = await tractionRequest.post(`/out-of-band/create-invitation?auto_accept=true`, data)
    return response.data
  }
}
