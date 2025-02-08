import { ComponentPropsWithoutRef, ElementRef, forwardRef, useContext } from 'react'

import { AuthContext } from '@/shared/contexts'
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
  Typography,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './BottomBar.module.scss'

type BottomBarProps = ComponentPropsWithoutRef<'nav'>
type BottomBarRef = ElementRef<'nav'>

export const BottomBar = forwardRef<BottomBarRef, BottomBarProps>(({ className, ...rest }, ref) => {
  const router = useRouter()
  const { isAuth, meData } = useContext(AuthContext)

  if (!isAuth) {
    return null
  }

  return (
    <nav className={clsx(s.bottomBar, className)} ref={ref} {...rest}>
      <NavItem
        activeIcon={<HomeIcon className={s.icon} />}
        inactiveIcon={<HomeOutlineIcon className={s.icon} />}
        isSelected={router.pathname === Paths.Home}
        linkUrl={Paths.Home}
      />
      <NavItem inactiveIcon={<PlusSquareIcon className={s.icon} />} onItemClick={() => {}} />
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
        isSelected={router.asPath === `${Paths.profile}/${meData?.userId}`}
        linkUrl={`${Paths.profile}/${meData?.userId}`}
      />
      <Typography variant={'error'}>Bottom Bar in development</Typography>
    </nav>
  )
})
