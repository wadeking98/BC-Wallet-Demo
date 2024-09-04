import 'reflect-metadata'
import type { Express } from 'express'
import type WebSocket from 'ws'

import { json, static as stx } from 'express'
import { createExpressServer } from 'routing-controllers'
import { WebSocketServer } from 'ws'

import { tractionApiKeyUpdaterInit, tractionRequest, tractionGarbageCollection } from './utils/tractionHelper'

process.on('unhandledRejection', (error) => {
  if (error instanceof Error) {
    console.error(`Unhandled promise rejection: ${error.message}`, { error })
  } else {
    console.error('Unhandled promise rejection due to non-error error', {
      error,
    })
  }
})

const run = async () => {
  await tractionApiKeyUpdaterInit()
  await tractionGarbageCollection()

  // setup websockets
  // Websocket server for the demo
  const wss = new WebSocketServer({ port: 5001 })
  interface CustomWebSocket extends WebSocket {
    isAlive: boolean
    connectionId?: string
  }
  wss.on('connection', function connection(c) {
    const ws = c as CustomWebSocket
    ws.isAlive = true
    ws.on('pong', () => (ws.isAlive = true))
    ws.on('message', (message) => {
      const data = JSON.parse(message.toString())
      ws.connectionId = data.connectionId
    })
  })

  const interval = setInterval(function ping() {
    wss.clients.forEach(function each(c) {
      const ws = c as CustomWebSocket
      if (ws.isAlive === false) return ws.terminate()

      ws.isAlive = false
      ws.ping()
    })
  }, 5000)

  wss.on('close', function close() {
    clearInterval(interval)
  })

  const app: Express = createExpressServer({
    controllers: [__dirname + '/controllers/**/*.ts'],
    cors: true,
    routePrefix: '/digital-trust/showcase/demo',
  })

  app.set('wss', wss)

  app.use(json())

  app.use('/digital-trust/showcase/public', stx(__dirname + '/public'))

  app.get('/digital-trust/showcase/server/last-reset', async (req, res) => {
    res.send(new Date())
  })

  // Redirect QR code scans for installing bc wallet to the apple or google play store
  const androidUrl = 'https://play.google.com/store/apps/details?id=ca.bc.gov.BCWallet'
  const appleUrl = 'https://apps.apple.com/us/app/bc-wallet/id1587380443'
  app.get('/digital-trust/showcase/qr', async (req, res) => {
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

  // respond to ditp health checks
  app.get('/digital-trust/showcase/server/ready', async (req, res) => {
    res.json({ ready: true })
    return res
  })

  // respond to ready checks to the traction agent
  app.get('/digital-trust/showcase/agent/ready', async (req, res) => {
    const response = await tractionRequest.get(`/status/ready`)
    res.send(response.data)
    return response
  })

  app.listen(5000)
}

run()
