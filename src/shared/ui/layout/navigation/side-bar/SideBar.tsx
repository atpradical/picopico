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
import Link from 'next/link'
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
            as={Link}
            fullWidth
            href={Paths.Home}
            inactiveIcon={<HomeOutlineIcon className={s.icon} />}
            isSelected={router.pathname === Paths.Home}
            label={t.appSidebar.homeLink}
            variant={'icon'}
          />
          <NavItem
            fullWidth
            inactiveIcon={<PlusSquareIcon className={s.icon} />}
            label={t.appSidebar.createButton}
            onClick={() => onOpenCreatePostDialog(true)}
            variant={'icon'}
          />
          <NavItem
            activeIcon={<PersonIcon className={s.icon} />}
            as={Link}
            fullWidth
            href={`${Paths.profile}/${userId}`}
            inactiveIcon={<PersonOutlineIcon className={s.icon} />}
            isSelected={router.asPath === `${Paths.profile}/${userId}`}
            label={t.appSidebar.profileLink}
            variant={'icon'}
          />
          <NavItem
            activeIcon={<MessageCircleIcon className={s.icon} />}
            as={Link}
            fullWidth
            href={Paths.messages}
            inactiveIcon={<MessageCircleOutlineIcon className={s.icon} />}
            isSelected={router.pathname === Paths.messages}
            label={t.appSidebar.messagesLink}
            variant={'icon'}
          />
          <NavItem
            activeIcon={<SearchIcon className={s.icon} />}
            as={Link}
            fullWidth
            href={Paths.search}
            inactiveIcon={<SearchOutlineIcon className={s.icon} />}
            isSelected={router.pathname === Paths.search}
            label={t.appSidebar.searchButton}
            variant={'icon'}
          />
        </div>
        <div className={s.group}>
          <NavItem
            activeIcon={<TrendingUpIcon className={s.icon} />}
            as={Link}
            fullWidth
            href={Paths.statistics}
            inactiveIcon={<TrendingUpOutlineIcon className={s.icon} />}
            isSelected={router.pathname === Paths.statistics}
            label={t.appSidebar.statisticsLink}
            variant={'icon'}
          />
          <NavItem
            activeIcon={<BookmarkIcon className={s.icon} />}
            as={Link}
            fullWidth
            href={Paths.favourites}
            inactiveIcon={<BookmarkOutlineIcon className={s.icon} />}
            isSelected={router.pathname === Paths.favourites}
            label={t.appSidebar.favouritesLink}
            variant={'icon'}
          />
        </div>
        <div className={s.group}>
          <NavItem
            fullWidth
            inactiveIcon={<LogOutOutlineIcon className={s.icon} />}
            label={t.appSidebar.logOutButton}
            onClick={() => onOpenLogoutDialog(true)}
            variant={'icon'}
          />
        </div>
      </nav>
    )
  }
)

SideBar.displayName = 'SideBar'
