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
import Link from 'next/link'
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
          as={Link}
          href={Paths.Feed}
          inactiveIcon={<HomeOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.Feed}
          variant={'icon'}
        />
        <NavItem
          inactiveIcon={<PlusSquareIcon className={s.icon} />}
          onClick={() => onOpenCreatePostDialog(true)}
          variant={'icon'}
        />
        <NavItem
          activeIcon={<MessageCircleIcon className={s.icon} />}
          as={Link}
          href={Paths.Messages}
          inactiveIcon={<MessageCircleOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.Messages}
          variant={'icon'}
        />
        <NavItem
          activeIcon={<SearchIcon className={s.icon} />}
          as={Link}
          href={Paths.Search}
          inactiveIcon={<SearchOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.Search}
          variant={'icon'}
        />
        <NavItem
          activeIcon={<PersonIcon className={s.icon} />}
          as={Link}
          href={`${Paths.Profile}/${userId}`}
          inactiveIcon={<PersonOutlineIcon className={s.icon} />}
          isSelected={router.asPath === `${Paths.Profile}/${userId}`}
          variant={'icon'}
        />
      </nav>
    )
  }
)

BottomBar.displayName = 'BottomBar'
