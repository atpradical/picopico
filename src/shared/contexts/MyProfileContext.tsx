import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { ResponseGetUserProfile, useGetUserProfileQuery } from '@/services/profile'

import { AuthContext } from './AuthContext'

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
  const { meData } = useContext(AuthContext)
  const [skip, setSkip] = useState(true)
  const { data: myProfileData } = useGetUserProfileQuery(undefined, { skip })

  // if me success get my profile data
  useEffect(() => {
    if (meData && meData?.userId) {
      setSkip(false)
    }
  }, [meData])

  return (
    <MyProfileContext.Provider value={{ myProfileData: myProfileData ?? initialData }}>
      {children}
    </MyProfileContext.Provider>
  )
}
