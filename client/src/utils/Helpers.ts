export const isConnected = (state: string) => {
  return state === 'complete' || state === 'response' || state === 'active'
}

export const isCredIssued = (state: string) => {
  return state === 'credential_issued' || state === 'done' || state === 'credential_acked'
}
