import { ReactNode, createContext, useContext } from 'react'

import {
  GetActiveSubscriptionInfoResponse,
  useGetActiveSubscriptionInfoQuery,
} from '@/services/payments'
import { ResponseGetMyProfile, useGetMyProfileQuery } from '@/services/profile'
import { Nullable } from '@/shared/types'

import { AuthContext } from './AuthContext'

type MyProfileContextType = {
  activeSubscriptionInfo: Nullable<GetActiveSubscriptionInfoResponse>
  isBusinessAccount: boolean
  myProfileData: Nullable<ResponseGetMyProfile>
}

export const MyProfileContext = createContext<MyProfileContextType>({
  activeSubscriptionInfo: null,
  isBusinessAccount: false,
  myProfileData: null,
})

type AuthProviderProps = {
  children: ReactNode
}

export const MyProfileProvider = ({ children }: AuthProviderProps) => {
  const { isAuth } = useContext(AuthContext)
  const { data: myProfileData } = useGetMyProfileQuery(undefined, { skip: !isAuth })

  const { data: activeSubscriptionInfo } = useGetActiveSubscriptionInfoQuery(undefined, {
    skip: !isAuth,
  })

  const isBusinessAccount = !!activeSubscriptionInfo?.data.length

  return (
    <MyProfileContext.Provider
      value={{
        activeSubscriptionInfo: activeSubscriptionInfo ?? null,
        isBusinessAccount,
        myProfileData: myProfileData ?? null,
      }}
    >
      {children}
    </MyProfileContext.Provider>
  )
}
