import { ReactNode, createContext } from 'react'

import { ResponseGetMyProfile, useGetMyProfileQuery } from '@/services/profile'
import { Nullable } from '@/shared/types'

type MyProfileContextType = {
  myProfileData: Nullable<ResponseGetMyProfile>
}

export const MyProfileContext = createContext<MyProfileContextType>({
  myProfileData: null,
})

type AuthProviderProps = {
  children: ReactNode
}

export const MyProfileProvider = ({ children }: AuthProviderProps) => {
  const { data: myProfileData } = useGetMyProfileQuery()

  return (
    <MyProfileContext.Provider value={{ myProfileData: myProfileData ?? null }}>
      {children}
    </MyProfileContext.Provider>
  )
}
