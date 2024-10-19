import { useContext } from 'react'

import { AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { SelectLanguage } from '@/shared/ui/components/select-language'
import { Badge, BellOutlineIcon, Button, LogoLight, Typography } from '@atpradical/picopico-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Header.module.scss'

export type HeaderProps = {
  countNotification?: number
  // isAuth: boolean
}

export const Header = ({ countNotification }: HeaderProps) => {
  const router = useRouter()
  const { isAuth } = useContext(AuthContext)

  console.log('isAuth is', isAuth)

  return (
    <div className={s.wrapper}>
      <Button as={Link} className={s.logoWrapper} href={Paths.home} tabIndex={-1} variant={'link'}>
        <LogoLight className={s.logo} />
        <Typography as={'h1'} variant={'large'}>
          PicoPico
        </Typography>
      </Button>
      <div className={s.container}>
        {isAuth && (
          <Button className={s.buttonBell} variant={'icon'}>
            <Badge count={countNotification}>
              <BellOutlineIcon />
            </Badge>
          </Button>
        )}
        <SelectLanguage />
        {!isAuth && (
          <div className={s.buttonContainer}>
            <Button as={Link} className={s.button} href={Paths.logIn} variant={'nb-outlined'}>
              Log in
            </Button>
            <Button as={Link} className={s.button} href={Paths.signUp} variant={'primary'}>
              Sign up
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
