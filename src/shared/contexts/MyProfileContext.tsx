import { ReactNode, createContext } from 'react'

import {
  GetActiveSubscriptionInfoResponse,
  useGetActiveSubscriptionInfoQuery,
} from '@/services/payments'
import { ResponseGetMyProfile, useGetMyProfileQuery } from '@/services/profile'
import { Nullable } from '@/shared/types'

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
  const { data: myProfileData } = useGetMyProfileQuery()
  const { data: activeSubscriptionInfo } = useGetActiveSubscriptionInfoQuery()
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
