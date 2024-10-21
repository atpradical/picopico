import { ReactNode, createContext } from 'react'

import { ResponseMe, useMeQuery } from '@/shared/api'
import { Nullable } from '@/shared/types'

type AuthContextType = {
  isAuth: boolean
  meData: Nullable<ResponseMe>
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  meData: null,
})

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data, isError, isLoading } = useMeQuery()
  const isAuth = !isError && !isLoading

  return (
    <AuthContext.Provider value={{ isAuth, meData: data ?? null }}>{children}</AuthContext.Provider>
  )
}
