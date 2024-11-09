import { ComponentPropsWithoutRef, ElementRef, forwardRef, useContext, useState } from 'react'

import { createPostActions } from '@/features/posts/api/create-post.reducer'
import { CreatePostDialog } from '@/features/posts/ui'
import { useLogoutMutation } from '@/services/auth'
import { AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { ActionConfirmDialog } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import {
  BookmarkIcon,
  BookmarkOutlineIcon,
  Button,
  HomeIcon,
  HomeOutlineIcon,
  LogOutOutlineIcon,
  MessageCircleIcon,
  MessageCircleOutlineIcon,
  PersonIcon,
  PersonOutlineIcon,
  PlusSquareIcon,
  SearchIcon,
  SearchOutlineIcon,
  TrendingUpIcon,
  TrendingUpOutlineIcon,
  Typography,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SideBar.module.scss'

type SideBarProps = ComponentPropsWithoutRef<'nav'>
type SideBarRef = ElementRef<'nav'>

export const SideBar = forwardRef<SideBarRef, SideBarProps>(({ className, ...rest }, ref) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { isAuth, meData } = useContext(AuthContext)

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false)

  const dispatch = useAppDispatch()

  const toggleCreatePostDialogHandler = (open: boolean) => {
    dispatch(createPostActions.togglePostCreationDialog({ isOpen: open }))
  }

  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
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
    <nav className={clsx(s.sidebar, className)} ref={ref} {...rest}>
      <div className={s.group}>
        <Typography
          as={Link}
          className={s.title}
          data-active={router.pathname === Paths.Home}
          href={Paths.Home}
          variant={'medium_14'}
        >
          {router.pathname === Paths.Home ? (
            <HomeIcon className={s.icon} />
          ) : (
            <HomeOutlineIcon className={s.icon} />
          )}
          {t.appSidebar.homeLink}
        </Typography>
        <Button
          className={s.title}
          fullWidth
          onClick={() => toggleCreatePostDialogHandler(true)}
          variant={'icon'}
        >
          <PlusSquareIcon className={s.icon} />
          {t.appSidebar.createButton}
        </Button>
        <Typography
          as={Link}
          className={s.title}
          data-active={router.asPath === `${Paths.profile}/${meData?.userId}`}
          href={`${Paths.profile}/${meData?.userId}`}
          variant={'medium_14'}
        >
          {router.asPath === `${Paths.profile}/${meData?.userId}` ? (
            <PersonIcon className={s.icon} />
          ) : (
            <PersonOutlineIcon className={s.icon} />
          )}
          {t.appSidebar.profileLink}
        </Typography>
        <Typography
          as={Link}
          className={s.title}
          data-active={router.pathname === Paths.messages}
          href={Paths.messages}
          variant={'medium_14'}
        >
          {router.pathname === Paths.messages ? (
            <MessageCircleIcon className={s.icon} />
          ) : (
            <MessageCircleOutlineIcon className={s.icon} />
          )}
          {t.appSidebar.messagesLink}
        </Typography>
        <Typography
          as={Link}
          className={s.title}
          data-active={router.pathname === Paths.search}
          href={Paths.search}
          variant={'medium_14'}
        >
          {router.pathname === Paths.search ? (
            <SearchIcon className={s.icon} />
          ) : (
            <SearchOutlineIcon className={s.icon} />
          )}
          {t.appSidebar.searchButton}
        </Typography>
      </div>
      <div className={s.group}>
        <Typography
          as={Link}
          className={s.title}
          data-active={router.pathname === Paths.statistics}
          href={Paths.statistics}
          variant={'medium_14'}
        >
          {router.pathname === Paths.statistics ? (
            <TrendingUpIcon className={s.icon} />
          ) : (
            <TrendingUpOutlineIcon className={s.icon} />
          )}
          {t.appSidebar.statisticsLink}
        </Typography>
        <Typography
          as={Link}
          className={s.title}
          data-active={router.pathname === Paths.favourites}
          href={Paths.favourites}
          variant={'medium_14'}
        >
          {router.pathname === Paths.favourites ? (
            <BookmarkIcon className={s.icon} />
          ) : (
            <BookmarkOutlineIcon className={s.icon} />
          )}
          {t.appSidebar.favouritesLink}
        </Typography>
      </div>
      <div className={s.group}>
        <Typography as={'button'} className={s.title} onClick={() => setOpenLogoutDialog(true)}>
          <LogOutOutlineIcon className={s.icon} />
          {t.appSidebar.logOutButton}
        </Typography>
      </div>
      {openLogoutDialog && (
        <ActionConfirmDialog
          accessibilityDescription={t.logoutDialog.accessibilityDescription}
          accessibilityTitle={t.logoutDialog.accessibilityTitle}
          confirmButtonText={t.logoutDialog.confirmButton}
          isOpen={openLogoutDialog}
          message={`${t.logoutDialog.visibleBodyText} ${meData?.email}`}
          onConfirm={logoutHandler}
          onOpenChange={setOpenLogoutDialog}
          rejectButtonText={t.logoutDialog.rejectButton}
          title={t.logoutDialog.visibleTitle}
        />
      )}
      <CreatePostDialog onOpenChange={toggleCreatePostDialogHandler} />
    </nav>
  )
})

SideBar.displayName = 'SideBar'
