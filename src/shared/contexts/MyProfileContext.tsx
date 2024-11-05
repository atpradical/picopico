import { ReactNode, createContext } from 'react'

import { ResponseGetUserProfile, useGetUserProfileQuery } from '@/services/profile'

type MyProfileContextType = {
  myProfileData: ResponseGetUserProfile
}

const initialData: ResponseGetUserProfile = {
  aboutMe: null,
  avatars: [],
  city: null,
  country: null,
  createdAt: '',
  dateOfBirth: null,
  firstName: null,
  id: 0,
  lastName: null,
  region: null,
  userName: '',
}

export const MyProfileContext = createContext<MyProfileContextType>({
  myProfileData: initialData,
})

type AuthProviderProps = {
  children: ReactNode
}

export const MyProfileProvider = ({ children }: AuthProviderProps) => {
  const { data: myProfileData } = useGetUserProfileQuery()

  return (
    <MyProfileContext.Provider value={{ myProfileData: myProfileData ?? initialData }}>
      {children}
    </MyProfileContext.Provider>
  )
}
