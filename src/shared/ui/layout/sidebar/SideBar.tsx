import { ComponentPropsWithoutRef, ElementRef, forwardRef, useContext, useState } from 'react'

import { useLogoutMutation } from '@/shared/api'
import { AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { ActionConfirmDialog } from '@/shared/ui/components'
import { CreateNewPostDialog } from '@/shared/ui/components/create-new-post-dialog'
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
  const { meData } = useContext(AuthContext)
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false)
  const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false)

  const email = meData?.email

  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      router.push(Paths.logIn)
    } catch (e) {
      const error = getErrorMessageData(e)

      showErrorToast(error)
    }
  }

  return (
    <nav className={clsx(s.sidebar, className)} ref={ref} {...rest}>
      <div className={s.group}>
        <Typography
          as={Link}
          className={s.title}
          data-active={router.pathname === Paths.home}
          href={Paths.home}
          variant={'medium_14'}
        >
          {router.pathname === Paths.home ? (
            <HomeIcon className={s.icon} />
          ) : (
            <HomeOutlineIcon className={s.icon} />
          )}
          {t.appSidebar.homeLink}
        </Typography>
        <Button
          className={s.title}
          fullWidth
          onClick={() => setOpenCreatePostDialog(true)}
          variant={'icon'}
        >
          <PlusSquareIcon className={s.icon} />
          {t.appSidebar.createButton}
        </Button>
        <Typography
          as={Link}
          className={s.title}
          data-active={router.pathname === Paths.profile}
          href={Paths.profile}
          variant={'medium_14'}
        >
          {router.pathname === Paths.profile ? (
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
          message={`${t.logoutDialog.visibleBodyText} ${email}`}
          onConfirm={logoutHandler}
          onOpenChange={setOpenLogoutDialog}
          rejectButtonText={t.logoutDialog.rejectButton}
          title={t.logoutDialog.visibleTitle}
        />
      )}
      <CreateNewPostDialog onOpenChange={setOpenCreatePostDialog} open={openCreatePostDialog} />
    </nav>
  )
})

SideBar.displayName = 'SideBar'
