import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { NavItem } from '@/shared/ui/layout'
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

type SideBarProps = {
  isAuth: boolean
  onOpenCreatePostDialog: (open: boolean) => void
  onOpenLogoutDialog: (open: boolean) => void
  userId: string
} & ComponentPropsWithoutRef<'nav'>

type SideBarRef = ElementRef<'nav'>

export const SideBar = forwardRef<SideBarRef, SideBarProps>(
  ({ className, isAuth, onOpenCreatePostDialog, onOpenLogoutDialog, userId, ...rest }, ref) => {
    const router = useRouter()
    const { t } = useTranslation()

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
            onItemClick={() => onOpenCreatePostDialog(true)}
          />
          <NavItem
            activeIcon={<PersonIcon className={s.icon} />}
            inactiveIcon={<PersonOutlineIcon className={s.icon} />}
            isSelected={router.asPath === `${Paths.profile}/${userId}`}
            label={t.appSidebar.profileLink}
            linkUrl={`${Paths.profile}/${userId}`}
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
            onItemClick={() => onOpenLogoutDialog(true)}
          />
        </div>
      </nav>
    )
  }
)

SideBar.displayName = 'SideBar'
