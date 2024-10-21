export type ResponseGetSessions = {
  current: SessionData
  others: SessionData[]
}
export type SessionData = {
  browserName: string
  browserVersion: string
  deviceId: number
  deviceName: string
  deviceType: string
  ip: string
  lastActive: string
  osName: string
  osVersion: string
}

export type TerminateSessionArgs = {
  deviceId: number
}
