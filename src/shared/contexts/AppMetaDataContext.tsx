import { ReactNode, createContext } from 'react'

import { MAX_SCREEN_WIDTH_MOBILE, MAX_SCREEN_WIDTH_TABLET } from '@/shared/constants'
import { useWindowSize } from 'usehooks-ts'

type AppMetaDataType = {
  height: number
  isMobile: boolean
  isTablet: boolean
  width: number
}

export const AppMetaDataContext = createContext<AppMetaDataType>({
  height: 0,
  isMobile: false,
  isTablet: false,
  width: 0,
})

type AppMetaDataProviderProps = {
  children: ReactNode
}

export const AppMetaDataProvider = ({ children }: AppMetaDataProviderProps) => {
  const { height, width } = useWindowSize()
  const isMobile = width < MAX_SCREEN_WIDTH_MOBILE
  const isTablet = width >= MAX_SCREEN_WIDTH_MOBILE && width < MAX_SCREEN_WIDTH_TABLET

  return (
    <AppMetaDataContext.Provider value={{ height, isMobile, isTablet, width }}>
      {children}
    </AppMetaDataContext.Provider>
  )
}
