import type { Express } from 'express'

import {
  ConnectionInvitationMessage,
  LogLevel,
  Agent,
  AutoAcceptCredential,
  HttpOutboundTransport,
} from '@aries-framework/core'
import axios from 'axios'
import { json, static as stx } from 'express'
import { connect } from 'ngrok'
import { createExpressServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'

import { createInvitation, getConnectionStateByOobId } from './agentRoutes/ConnectionController'
import { issueCredential } from './agentRoutes/CredentialController'
import { issueProof, getProofStatus } from './agentRoutes/ProofController'
import { CredDefService } from './controllers/CredDefService'
import { TestLogger } from './logger'
import { AgentCleanup } from './utils/AgentCleanup'
import { CANDY_DEV, SOVRIN_MAINNET, SOVRIN_STAGINGNET } from './utils/ledgers'
import { tractionApiKeyUpdaterInit, tractionRequest } from './utils/tractionHelper'

const logger = new TestLogger(process.env.NODE_ENV ? LogLevel.error : LogLevel.trace)

process.on('unhandledRejection', (error) => {
  if (error instanceof Error) {
    logger.fatal(`Unhandled promise rejection: ${error.message}`, { error })
  } else {
    logger.fatal('Unhandled promise rejection due to non-error error', {
      error,
    })
  }
})

const run = async () => {
  await tractionApiKeyUpdaterInit()

  const app: Express = createExpressServer({
    controllers: [__dirname + '/controllers/**/*.ts', __dirname + '/controllers/**/*.js'],
    cors: true,
    routePrefix: '/demo',
  })

  const credDefService = new CredDefService()
  useContainer(Container)
  Container.set(CredDefService, credDefService)

  app.use(json())

  app.use('/public', stx(__dirname + '/public'))

  app.get('/server/last-reset', async (req, res) => {
    res.send(new Date())
  })

  // Redirect QR code scans for installing bc wallet to the apple or google play store
  const androidUrl = 'https://play.google.com/store/apps/details?id=ca.bc.gov.BCWallet'
  const appleUrl = 'https://apps.apple.com/us/app/bc-wallet/id1587380443'
  app.get('/qr', async (req, res) => {
    const appleMatchers = [/iPhone/i, /iPad/i, /iPod/i]
    let url = androidUrl
    const isApple = appleMatchers.some((item) => req.get('User-Agent')?.match(item))
    if (isApple) {
      url = appleUrl
    }
    res.redirect(url)
    return res
  })

  // respond to healthchecks for openshift
  app.get('/', async (req, res) => {
    res.send('ok')
    return res
  })

  // connection handlers
  app.post('/connections/createInvite', async (req, res) => {
    const response = await tractionRequest.post(`/connections/create-invitation`, req.body, {
      params: { auto_accept: true },
    })
    // const inviteData = await createInvitation(agent, req.body?.imageUrl, req.body?.label)
    res.json(response.data)
    return res
  })

  app.get('/connections/getConnectionStatus/:connId', async (req, res) => {
    const response = await tractionRequest.get(`/connections/${req.params.connId}`)
    // const connectionData = await getConnectionStateByOobId(agent, req.params.connId)
    res.json(response.data)
    return res
  })

  app.post('/credentials/offerCredential', async (req, res) => {
    // const credentialData = await issueCredential(agent, connId, credDefId, attributes)
    const response = await tractionRequest.post(`/issue-credential/send`, req.body)
    res.json(response.data)
    return res
  })

  const snakeCaseToRestriction = (key: string) => {
    const map: { [key: string]: string | undefined } = {
      schema_id: 'schemaId',
      schema_name: 'schemaName',
      schema_issuer_did: 'schemaIssuerDid',
      schema_version: 'schemaVersion',
      issuer_did: 'issuerDid',
      cred_def_id: 'credentialDefinitionId',
    }
    return map[key] ?? key
  }

  app.post('/proofs/requestProof', async (req, res) => {
    const proofObject = req.body.proofRequest
    const predicateObject: Record<string, any> = {}
    // make sure predicate value is an integer
    Object.keys(proofObject.requested_predicates).forEach((group) => {
      predicateObject.group = {
        ...proofObject.requested_predicates[group],
        restrictions: proofObject.requested_predicates[group].restrictions.map((restr: Record<string, string>) => {
          const keys = Object.keys(restr)
          if (keys.length > 0) {
            let key = keys[0]
            const val = restr[key]
            key = snakeCaseToRestriction(key)
            const retObject: { [key: string]: string } = {}
            retObject[key] = val
            return retObject
          } else {
            return restr
          }
        }),
      }
    })
    proofObject.requestedPredicates = predicateObject
    const proofRecord = (
      await tractionRequest.post('/present-proof/send-request', {
        connection_id: req.body.connectionId,
        comment: req.body.comment,
        proof_request: req.body.proofRequest,
        auto_verify: true,
      })
    ).data
    res.json(proofRecord)
    return res
  })

  app.get('/proofs/:proofId', async (req, res) => {
    const proofRecord = (await tractionRequest.get(`/present-proof/records/${req.params.proofId}`)).data
    res.json(proofRecord)
    return res
  })

  app.post('/proofs/:proofId/accept-presentation', async (req, res) => {
    const proofAcceptanceRecord = (
      await tractionRequest.post(`/present-proof/records/${req.params.proofId}/verify-presentation`, undefined)
    ).data
    res.json(proofAcceptanceRecord)
    return res
  })

  app.listen(5000)
}

run()
