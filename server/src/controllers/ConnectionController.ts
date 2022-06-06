import { Get, Post, JsonController, NotFoundError, Param, Body } from 'routing-controllers'
import { Service } from 'typedi'

import { agentApiCall } from '../utils/BaseUrl'

@JsonController('/connections')
@Service()
export class ConnectionController {

  @Post('/create-invitation')
  public async createInvitation(@Body() body: any) {
    return (await agentApiCall.post('/connections/create-invitation', body)).data
  }

  @Get('/:connectionId')
  public async getConnectionById(@Param('connectionId') connectionId: string) {
    return (await agentApiCall.get(`/connections/${connectionId}`)).data
  }
}
