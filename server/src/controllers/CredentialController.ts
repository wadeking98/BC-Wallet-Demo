import { Body, Delete, Get, InternalServerError, JsonController, NotFoundError, Param, Post } from 'routing-controllers'
import { Inject, Service } from 'typedi'

import { tractionRequest } from '../utils/tractionHelper'

import { CredDefService } from './CredDefService'

@JsonController('/credentials')
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
      if (error) {
        throw new NotFoundError(`credentials for connectionId "${connectionId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  @Post('/offerCredential')
  public async offerCredential(@Body() params: any) {
    const response = await tractionRequest.post(`/issue-credential/send`, params)
    return response.data
  }

  @Delete('/:cred_ex_id')
  public async deleteCredentialByExchangeId(@Param('cred_ex_id') cred_ex_id: string) {
    try {
      return this.service.deleteCredentialByExchangeId(cred_ex_id)
    } catch (error) {
      if (error) {
        throw new NotFoundError(`credentials for connectionId "${cred_ex_id}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }
}
