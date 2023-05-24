import { Body, Delete, Get, InternalServerError, JsonController, NotFoundError, Param, Post } from 'routing-controllers'
import { Inject, Service } from 'typedi'

import { Credential } from '../content/types'
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

  @Post('/getOrCreateCredDef')
  public async getOrCreateCredDef(@Body() credential: Credential) {
    const schemas = (
      await tractionRequest.get(`/schemas/created`, {
        params: { schema_name: credential.name, schema_version: credential.version },
      })
    ).data
    let schema_id = ''
    if (schemas.schema_ids.length <= 0) {
      const schemaAttrs = credential.attributes.map((attr) => attr.name)
      const resp = (
        await tractionRequest.post(`/schemas`, {
          attributes: schemaAttrs,
          schema_name: credential.name,
          schema_version: credential.version,
        })
      ).data
      schema_id = resp.sent.schema_id
    } else {
      schema_id = schemas.schema_ids[0]
    }

    const credDefs = (await tractionRequest.get(`/credential-definitions/created`, { params: { schema_id } })).data
    let cred_def_id = ''
    if (credDefs.credential_definition_ids.length <= 0) {
      const resp = (
        await tractionRequest.post(`/credential-defenitions`, {
          revocation_registry_size: 25,
          schema_id,
          support_revocation: true,
          tag: credential.name,
        })
      ).data
      cred_def_id = resp.sent.credential_definition_id
    } else {
      cred_def_id = credDefs.credential_definition_ids[0]
    }
    return cred_def_id
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
