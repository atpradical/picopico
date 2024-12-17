import { ReactNode, createContext } from 'react'

import { ResponseGetUserProfile, useGetUserProfileQuery } from '@/services/profile'
import { Nullable } from '@/shared/types'

type MyProfileContextType = {
  myProfileData: Nullable<ResponseGetUserProfile>
}

export const MyProfileContext = createContext<MyProfileContextType>({
  myProfileData: null,
})

type AuthProviderProps = {
  children: ReactNode
}

export const MyProfileProvider = ({ children }: AuthProviderProps) => {
  const { data: myProfileData } = useGetUserProfileQuery()

  return (
    <MyProfileContext.Provider value={{ myProfileData: myProfileData ?? null }}>
      {children}
    </MyProfileContext.Provider>
  )
}
