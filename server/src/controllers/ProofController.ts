import { Body, Delete, Get, JsonController, Param, Post } from 'routing-controllers'
import { Service } from 'typedi'

import { tractionRequest } from '../utils/tractionHelper'

@JsonController('/proofs')
@Service()
export class ProofController {

    @Get('/:proofId')
    public async getAllCredentialsByConnectionId(@Param('proofId') proofId: string) {
        let proofRecord = ""
        try{
            proofRecord = (await tractionRequest.get(`/present-proof/records/${proofId}`)).data
        }catch{
            // pass
        }
        return proofRecord
    }

    @Post('/requestProof')
    public async requestProof(@Body() params: any) {
        const proofRecord = (
            await tractionRequest.post('/present-proof/send-request', {
                connection_id: params.connectionId,
                comment: params.comment,
                proof_request: params.proofRequest,
                auto_verify: true,
            })
        ).data
        return proofRecord
    }

    ///present-proof/records/{pres_ex_id}
    @Delete('/:proofId')
    public async deleteProofById(@Param('proofId') proofId: string) {
        const proofRecord = (await tractionRequest.delete(`/present-proof/records/${proofId}`)).data
        return proofRecord
    }

    @Post('/proofs/:proofId/accept-presentation')
    public async acceptProof(@Body() params: any, @Param('proofId') proofId: string) {
        const proofAcceptanceRecord = (
            await tractionRequest.post(`/present-proof/records/${proofId}/verify-presentation`, undefined)
        ).data
        return proofAcceptanceRecord
    }

}
