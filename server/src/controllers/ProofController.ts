import { Get, Post, Delete, JsonController, NotFoundError, Param, Body } from 'routing-controllers'
import { Service } from 'typedi'

import { agentApiCall } from '../utils/BaseUrl'

@JsonController('/proofs')
@Service()
export class ConnectionController {

  @Post('/request-proof')
  public async createProofRequest(@Body() body: any) {
    return (await agentApiCall.post('/proofs/request-proof', body)).data
  }

  @Post('/request-outofband-proof')
  public async createOOBProofRequest(@Body() body: any) {
    return (await agentApiCall.post('/proofs/request-outofband-proof', body)).data
  }

  @Get('/:proofId')
  public async getProofById(@Param('proofId') proofId: string) {
    return (await agentApiCall.get(`/proofs/${proofId}`)).data
  }

  @Delete('/:proofId')
  public async deleteProofById(@Param('proofId') proofId: string) {
    return (await agentApiCall.delete(`/proofs/${proofId}`)).data
  }

  @Post('/:proofId/accept-presentation')
  public async acceptProofById(@Param('proofId') proofId: string) {
    return (await agentApiCall.post(`/proofs/${proofId}/accept-presentation`)).data
  }
}

