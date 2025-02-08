import { useContext } from 'react'

import { createPostActions } from '@/features/posts/api'
import { CreatePostDialog } from '@/features/posts/ui'
import { AppMetaDataContext, AuthContext } from '@/shared/contexts'
import { useAppDispatch, useLogout, useTranslation } from '@/shared/hooks'
import { ConfirmDialog } from '@/shared/ui/components'
import { SideBar } from '@/shared/ui/layout'

import { BottomBar } from './bottom-bar'

type Props = {}
export const Navigation = ({}: Props) => {
  const { t } = useTranslation()

  const { isAuth, meData } = useContext(AuthContext)
  const { isMobile } = useContext(AppMetaDataContext)

  const dispatch = useAppDispatch()

  const toggleCreatePostDialogHandler = (open: boolean) => {
    dispatch(createPostActions.togglePostCreationDialog({ isOpen: open }))
  }

  const { isLoading, isLogoutDialog, logoutHandler, setLogoutDialog } = useLogout()

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
          onOpenLogoutDialog={setLogoutDialog}
          userId={String(meData?.userId)}
        />
      )}
      {isLogoutDialog && (
        <ConfirmDialog
          isLoading={isLoading}
          isOpen={isLogoutDialog}
          onConfirm={logoutHandler}
          onOpenChange={setLogoutDialog}
          t={t.logoutDialog}
        />
      )}
      <CreatePostDialog onOpenChange={toggleCreatePostDialogHandler} />
    </>
  )
}
