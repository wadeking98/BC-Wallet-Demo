import { Agent } from "@aries-framework/core"

export const issueProof = async (agent:Agent, connId:string, proof:any) => {
    const proofRecord = await  agent.proofs.requestProof(connId, proof)
    return proofRecord
}

export const getProofStatus = async (agent:Agent, proofId:string) =>{
    const proofRecord = await agent.proofs.findById("a3d7e7a6-24c3-40e9-bb15-b1f1996f6b4a")
    if(proofRecord === null){
        return ""
    }
    return proofRecord
}