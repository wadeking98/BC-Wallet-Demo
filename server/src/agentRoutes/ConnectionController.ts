import type { Agent } from '@aries-framework/core'

import { HandshakeProtocol } from '@aries-framework/core'

export const createInvitation = async (agent: Agent, imageUrl?: string, label?: string) => {
  const invite = await agent.oob.createInvitation({
    label,
    imageUrl,
    handshake: true,
    handshakeProtocols: [HandshakeProtocol.Connections],
    multiUseInvitation: true,
    autoAcceptConnection: true,
  })
  return { invitationUrl: invite.outOfBandInvitation.toUrl({ domain: agent.config.endpoints[0] }), id: invite.id }
}

export const getConnectionStateByOobId = async (agent: Agent, connId: string) => {
  const connection = await agent.connections.findAllByOutOfBandId(connId)
  return { state: connection[0]?.state ?? '', id: connection[0]?.id }
}
