import { Agent, AttributeFilter, PredicateType, ProofPredicateInfo } from "@aries-framework/core"

const snakeCaseToRestriction = (key: string)=>{
    const map: {[key:string]: string|undefined} = {
        schema_id: "schemaId",
        schema_name: "schemaName",
        schema_issuer_did: "schemaIssuerDid",
        schema_version: "schemaVersion",
        issuer_did: "issuerDid",
        cred_def_id: "credentialDefinitionId"
    }
    return map[key] ?? key
}

export const issueProof = async (agent: Agent, connId: string, comment: string, proof: any) => {
    const stringToPType: { [key: string]: PredicateType } = {
        ">=": PredicateType.GreaterThanOrEqualTo,
        "<=": PredicateType.LessThanOrEqualTo,
        "<": PredicateType.LessThan,
        ">": PredicateType.GreaterThan
    }
    let predicateObject: Record<string, ProofPredicateInfo> = {}
    // make sure predicate value is an integer
    Object.keys(proof.requested_predicates).forEach(group => {
        predicateObject.group = { 
            predicateValue: proof.requested_predicates[group].p_value, 
            predicateType: stringToPType[proof.requested_predicates[group].p_type as string], 
            name: proof.requested_predicates[group].name, 
            restrictions:proof.requested_predicates[group].restrictions.map((restr: Record<string, string>)=>{
                const keys = Object.keys(restr)
                if (keys.length > 0){
                    let key = keys[0]
                    const val = restr[key]
                    key = snakeCaseToRestriction(key)
                    let retObject: {[key:string]:string} = {}
                    retObject[key] = val
                    return retObject
                }else{
                    return restr
                }
        }) }
        proof.requested_predicates[group].p_value = parseInt(proof.requested_predicates[group].p_value)
        proof.requested_predicates[group].p_type = stringToPType[proof.requested_predicates[group].p_type as string]
    })
    const proofRecord = await agent.proofs.requestProof(connId, {
        requestedAttributes: proof.requested_attributes,
        requestedPredicates: predicateObject
    }, { comment })
    return proofRecord
}

export const getProofStatus = async (agent: Agent, proofId: string) => {
    const proofRecord = await agent.proofs.findById(proofId)
    //{"requested_attributes":{},"requested_predicates":{"student_card":{"restrictions":[{"schema_name":"student_card"}],"name":"expiry_date","p_value":20230323,"p_type":">="}},"version":"1.0.0","name":"Cool Clothes Online Request"}
    if (proofRecord === null) {
        return ""
    }
    return proofRecord
}