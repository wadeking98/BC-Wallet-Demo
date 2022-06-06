import { RecordNotFoundError } from '@aries-framework/core'
import { Get, Post, Delete, InternalServerError, JsonController, NotFoundError, Param, Body } from 'routing-controllers'
import { Inject, Service } from 'typedi'

import { CredDefService } from './CredDefService'
import { agentApiCall } from '../utils/BaseUrl'

@JsonController('/demo/credentials')
@Service()
export class CredentialController {
  @Inject()
  private service: CredDefService

  public constructor(service: CredDefService) {
    this.service = service
  }

  @Get('/:connectionId')
  public async getAllCredentialsByConnectionId(@Param('connectionId') connectionId: string) {
    try {
      return this.service.getAllCredentialsByConnectionId(connectionId)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`credentials for connectionId "${connectionId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }
}

@JsonController('/credentials')
@Service()
export class CredentialAgentController {

  @Post('/offer-credential')
  public async offerCredential(@Body() body: any) {
    return (await agentApiCall.post('/credentials/offer-credential', body)).data
  }

  @Get('/:credentialId')
  public async getCredentialById(@Param('credentialId') credentialId: string) {
    return (await agentApiCall.get(`/credentials/${credentialId}`)).data
  }

  @Delete('/:credentialId')
  public async deleteCredentialById(@Param('credentialId') credentialId: string) {
    return (await agentApiCall.delete(`/credentials/${credentialId}`)).data
  }
}
