import { useContext } from 'react'

import { AuthContext } from '@/shared/contexts'
import { useRouter } from 'next/router'

export const useIsAuthUserOnProfilePage = (): boolean => {
  const router = useRouter()
  const { id } = router.query
  const { isAuth, meData } = useContext(AuthContext)
  const isMyProfilePage = id == meData?.userId

  return isAuth && isMyProfilePage
}
