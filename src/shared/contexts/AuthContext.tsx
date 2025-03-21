import { ReactNode, createContext } from 'react'

import { ResponseMe, useMeQuery } from '@/services/auth'
import { Nullable } from '@/shared/types'

type AuthContextType = {
  isAuth: boolean
  isAuthLoading: boolean
  meData: Nullable<ResponseMe>
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  isAuthLoading: false,
  meData: null,
})

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data, isError, isLoading: isAuthLoading } = useMeQuery()
  const isAuth = !isError && !isAuthLoading

  return (
    <AuthContext.Provider value={{ isAuth, isAuthLoading, meData: data ?? null }}>
      {children}
    </AuthContext.Provider>
  )
}
