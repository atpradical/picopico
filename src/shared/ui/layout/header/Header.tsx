import { useContext } from 'react'

import { AppMetaDataContext, AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { SelectLanguage } from '@/shared/ui/components/select-language'
import {
  Badge,
  BellOutlineIcon,
  Button,
  LogoLight,
  MoreHorizontalIcon,
  Typography,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { useIsClient } from 'usehooks-ts'

import s from './Header.module.scss'

export type HeaderProps = {
  countNotification?: number
}

export const Header = ({ countNotification }: HeaderProps) => {
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const { isMobile } = useContext(AppMetaDataContext)

  const isClient = useIsClient()

  if (!isClient) {
    return null
  }

  return (
    <div className={clsx(s.wrapper, isMobile && s.wrapperMobile)}>
      <Button as={Link} className={s.logoWrapper} href={Paths.Home} tabIndex={-1} variant={'link'}>
        <LogoLight className={s.logo} />
        <Typography as={'h1'} variant={'large'}>
          PicoPico
        </Typography>
      </Button>
      <div className={clsx(s.container, isMobile && s.containerMobile)}>
        {isAuth && (
          <Button className={clsx(s.buttonBell, isMobile && s.buttonBellMobile)} variant={'icon'}>
            <Badge count={countNotification}>
              <BellOutlineIcon className={s.icon} />
            </Badge>
          </Button>
        )}
        <SelectLanguage isMobile={isMobile} />
        {!isAuth && !isMobile && (
          <div className={s.buttonContainer}>
            <Button as={Link} className={s.button} href={Paths.logIn} variant={'nb-outlined'}>
              {t.appHeader.signInButton}
            </Button>
            <Button as={Link} className={s.button} href={Paths.signUp} variant={'primary'}>
              {t.appHeader.signUpButton}
            </Button>
          </div>
        )}
        {isAuth && isMobile && (
          <div className={s.buttonContainer}>
            <Button className={s.button} variant={'icon'}>
              <MoreHorizontalIcon className={s.icon} />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
