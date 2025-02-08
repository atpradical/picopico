import { ComponentPropsWithoutRef, ElementRef, forwardRef, useContext, useState } from 'react'

import { createPostActions } from '@/features/posts/api/create-post.reducer'
import { CreatePostDialog } from '@/features/posts/ui'
import { useLogoutMutation } from '@/services/auth'
import { AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { ConfirmDialog } from '@/shared/ui/components'
import { NavItem } from '@/shared/ui/layout'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import {
  BookmarkIcon,
  BookmarkOutlineIcon,
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
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
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
    <nav className={clsx(s.sidebar, className)} ref={ref} {...rest}>
      <div className={s.group}>
        <NavItem
          activeIcon={<HomeIcon className={s.icon} />}
          inactiveIcon={<HomeOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.Home}
          label={t.appSidebar.homeLink}
          linkUrl={Paths.Home}
        />
        <NavItem
          inactiveIcon={<PlusSquareIcon className={s.icon} />}
          label={t.appSidebar.createButton}
          onItemClick={() => toggleCreatePostDialogHandler(true)}
        />
        <NavItem
          activeIcon={<PersonIcon className={s.icon} />}
          inactiveIcon={<PersonOutlineIcon className={s.icon} />}
          isSelected={router.asPath === `${Paths.profile}/${meData?.userId}`}
          label={t.appSidebar.profileLink}
          linkUrl={`${Paths.profile}/${meData?.userId}`}
        />
        <NavItem
          activeIcon={<MessageCircleIcon className={s.icon} />}
          inactiveIcon={<MessageCircleOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.messages}
          label={t.appSidebar.messagesLink}
          linkUrl={Paths.messages}
        />
        <NavItem
          activeIcon={<SearchIcon className={s.icon} />}
          inactiveIcon={<SearchOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.search}
          label={t.appSidebar.searchButton}
          linkUrl={Paths.search}
        />
      </div>
      <div className={s.group}>
        <NavItem
          activeIcon={<TrendingUpIcon className={s.icon} />}
          inactiveIcon={<TrendingUpOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.statistics}
          label={t.appSidebar.statisticsLink}
          linkUrl={Paths.statistics}
        />
        <NavItem
          activeIcon={<BookmarkIcon className={s.icon} />}
          inactiveIcon={<BookmarkOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.favourites}
          label={t.appSidebar.favouritesLink}
          linkUrl={Paths.favourites}
        />
      </div>
      <div className={s.group}>
        <NavItem
          inactiveIcon={<LogOutOutlineIcon className={s.icon} />}
          label={t.appSidebar.logOutButton}
          onItemClick={() => setOpenLogoutDialog(true)}
        />
      </div>
      {openLogoutDialog && (
        <ConfirmDialog
          isOpen={openLogoutDialog}
          onConfirm={logoutHandler}
          onOpenChange={setOpenLogoutDialog}
          t={t.logoutDialog}
        />
      )}
      <CreatePostDialog onOpenChange={toggleCreatePostDialogHandler} />
    </nav>
  )
})

SideBar.displayName = 'SideBar'
