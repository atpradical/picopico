import { useContext, useState } from 'react'

import { createPostActions } from '@/features/posts/api'
import { CreatePostDialog } from '@/features/posts/ui'
import { useLogoutMutation } from '@/services/auth'
import { AppMetaDataContext, AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { ConfirmDialog } from '@/shared/ui/components'
import { SideBar } from '@/shared/ui/layout'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { useRouter } from 'next/router'

import { BottomBar } from './bottom-bar'

type Props = {}
export const Navigation = ({}: Props) => {
  const router = useRouter()
  const { t } = useTranslation()

  const { isAuth, meData } = useContext(AuthContext)
  const { isMobile } = useContext(AppMetaDataContext)

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false)

  const dispatch = useAppDispatch()

  const toggleCreatePostDialogHandler = (open: boolean) => {
    dispatch(createPostActions.togglePostCreationDialog({ isOpen: open }))
  }

  const [logout, { isLoading }] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logout()
      router.push(Paths.logIn)
    } catch (e) {
      const error = getErrorMessageData(e)

      showErrorToast(error)
    } finally {
      setOpenLogoutDialog(false)
    }
  }

  if (!isAuth) {
    return null
  }

  return (
    <>
      {isMobile ? (
        <BottomBar
          isAuth={isAuth}
          onOpenCreatePostDialog={toggleCreatePostDialogHandler}
          userId={String(meData?.userId)}
        />
      ) : (
        <SideBar
          isAuth={isAuth}
          onOpenCreatePostDialog={toggleCreatePostDialogHandler}
          onOpenLogoutDialog={setOpenLogoutDialog}
          userId={String(meData?.userId)}
        />
      )}
      {openLogoutDialog && (
        <ConfirmDialog
          isLoading={isLoading}
          isOpen={openLogoutDialog}
          onConfirm={logoutHandler}
          onOpenChange={setOpenLogoutDialog}
          t={t.logoutDialog}
        />
      )}
      <CreatePostDialog onOpenChange={toggleCreatePostDialogHandler} />
    </>
  )
}
