import { ComponentPropsWithoutRef, ElementRef, forwardRef, useContext } from 'react'

import { AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import {
  Button,
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
import Link from 'next/link'
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
      <Button
        as={Link}
        className={s.menuItem}
        data-active={router.pathname === Paths.Home}
        href={Paths.Home}
        variant={'icon'}
      >
        {router.pathname === Paths.Home ? (
          <HomeIcon className={s.icon} />
        ) : (
          <HomeOutlineIcon className={s.icon} />
        )}
      </Button>
      <Button className={s.menuItem} fullWidth onClick={() => {}} variant={'icon'}>
        <PlusSquareIcon className={s.icon} />
      </Button>
      <Button
        as={Link}
        className={s.menuItem}
        data-active={router.pathname === Paths.messages}
        href={Paths.messages}
        variant={'icon'}
      >
        {router.pathname === Paths.messages ? (
          <MessageCircleIcon className={s.icon} />
        ) : (
          <MessageCircleOutlineIcon className={s.icon} />
        )}
      </Button>
      <Button
        as={Link}
        className={s.menuItem}
        data-active={router.pathname === Paths.search}
        href={Paths.search}
        variant={'icon'}
      >
        {router.pathname === Paths.search ? (
          <SearchIcon className={s.icon} />
        ) : (
          <SearchOutlineIcon className={s.icon} />
        )}
      </Button>
      <Button
        as={Link}
        className={s.menuItem}
        data-active={router.asPath === `${Paths.profile}/${meData?.userId}`}
        href={`${Paths.profile}/${meData?.userId}`}
        variant={'icon'}
      >
        {router.asPath === `${Paths.profile}/${meData?.userId}` ? (
          <PersonIcon className={s.icon} />
        ) : (
          <PersonOutlineIcon className={s.icon} />
        )}
      </Button>
      <Typography variant={'error'}>Bottom Bar in development</Typography>
    </nav>
  )
})
