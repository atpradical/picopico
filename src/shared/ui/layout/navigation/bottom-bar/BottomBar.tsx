import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Paths } from '@/shared/enums'
import { NavItem } from '@/shared/ui/layout'
import {
  HomeIcon,
  HomeOutlineIcon,
  MessageCircleIcon,
  MessageCircleOutlineIcon,
  PersonIcon,
  PersonOutlineIcon,
  PlusSquareIcon,
  SearchIcon,
  SearchOutlineIcon,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './BottomBar.module.scss'

type BottomBarProps = {
  isAuth: boolean
  onOpenCreatePostDialog: (open: boolean) => void
  userId: string
} & ComponentPropsWithoutRef<'nav'>

type BottomBarRef = ElementRef<'nav'>

export const BottomBar = forwardRef<BottomBarRef, BottomBarProps>(
  ({ className, isAuth, onOpenCreatePostDialog, userId, ...rest }, ref) => {
    const router = useRouter()

    return (
      <nav className={clsx(s.bottomBar, className)} ref={ref} {...rest}>
        <NavItem
          activeIcon={<HomeIcon className={s.icon} />}
          inactiveIcon={<HomeOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.Home}
          linkUrl={Paths.Home}
        />
        <NavItem
          inactiveIcon={<PlusSquareIcon className={s.icon} />}
          onItemClick={() => onOpenCreatePostDialog(true)}
        />
        <NavItem
          activeIcon={<MessageCircleIcon className={s.icon} />}
          inactiveIcon={<MessageCircleOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.messages}
          linkUrl={Paths.messages}
        />
        <NavItem
          activeIcon={<SearchIcon className={s.icon} />}
          inactiveIcon={<SearchOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.search}
          linkUrl={Paths.search}
        />
        <NavItem
          activeIcon={<PersonIcon className={s.icon} />}
          inactiveIcon={<PersonOutlineIcon className={s.icon} />}
          isSelected={router.asPath === `${Paths.profile}/${userId}`}
          linkUrl={`${Paths.profile}/${userId}`}
        />
      </nav>
    )
  }
)

BottomBar.displayName = 'BottomBar'
