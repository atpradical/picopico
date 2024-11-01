import { ReactNode, createContext, useEffect, useState } from 'react'

import { ResponseMe, useMeQuery } from '@/shared/api'
import { Paths } from '@/shared/enums'
import { Nullable } from '@/shared/types'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const [isRedirected, setIsRedirected] = useState(false)
  const { data, isError, isLoading } = useMeQuery()
  const isAuth = !isError && !isLoading

  // if authorization success then redirect User to profile page after first login
  useEffect(() => {
    if (isAuth && data && !isRedirected) {
      setIsRedirected(true)
      router.push(`${Paths.profile}/${data.userId}`)
    }
  }, [isAuth, data, isRedirected, router])

  return (
    <AuthContext.Provider value={{ isAuth, meData: data ?? null }}>{children}</AuthContext.Provider>
  )
}
