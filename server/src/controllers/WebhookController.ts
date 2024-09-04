import type { CustomWebSocket } from '../content/types'

import { Body, JsonController, Post, Get, Param, Req } from 'routing-controllers'
import { Service } from 'typedi'
import { WebSocketServer, WebSocket } from 'ws'

@JsonController('/whook/topic')
@Service()
export class WebhookController {
  @Post('/*')
  public async handlePostWhook(@Body() params: any, @Req() req: any) {
    const wss = req.app.get('wss')
    const api_key = req.headers['x-api-key']
    if (api_key !== process.env.WEBHOOK_SECRET) {
      return { message: 'Unauthorized', status: 401 }
    }
    const connectionId = params.connection_id
    const path = req.path.endsWith('/') ? req.path.slice(0, -1) : req.path
    const endpointSplit = path.split('/')
    const endpoint = endpointSplit[endpointSplit.length - 1]
    params.endpoint = endpoint

    for (const client of wss.clients) {
      const ws = client as CustomWebSocket
      if (ws.readyState === WebSocket.OPEN && ws.connectionId === connectionId) {
        ws.send(JSON.stringify(params))
      }
    }
    return { message: 'Webhook received' }
  }
}
