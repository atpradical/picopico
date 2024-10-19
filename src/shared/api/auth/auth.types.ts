export type CreateUserArgs = {
  TOS?: boolean
  baseUrl?: string
  email: string
  password: string
  userName: string
}

export type ConfirmEmailArgs = {
  confirmationCode: string
}
export type ResendRegistrationArgs = {
  email: string
}

export type LoginData = {
  email: string
  password: string
}
export type ResponseLogin = {
  accessToken: string
}

export type ResponseMe = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}
