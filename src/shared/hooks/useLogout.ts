import { useState } from 'react'

import { useLogoutMutation } from '@/services/auth'
import { Paths } from '@/shared/enums'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { useRouter } from 'next/router'

export const useLogout = () => {
  const router = useRouter()
  const [isLogoutDialog, setLogoutDialog] = useState(false)
  const [logoutQuery, { isLoading }] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutQuery()
      router.push(Paths.LogIn)
    } catch (e) {
      const error = getErrorMessageData(e)

      showErrorToast(error)
    } finally {
      setLogoutDialog(false)
    }
  }

  return {
    isLoading,
    isLogoutDialog,
    logoutHandler,
    setLogoutDialog,
  }
}
