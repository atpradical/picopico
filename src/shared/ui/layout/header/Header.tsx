import { useContext } from 'react'

import { AppMetaDataContext, AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { NotificationPopover } from '@/shared/ui/components'
import { SelectLanguage } from '@/shared/ui/components/select-language'
import { HeaderMobileMenubar } from '@/shared/ui/layout'
import { Button, LogoLight, Typography } from '@atpradical/picopico-ui-kit'
import Link from 'next/link'
import { useIsClient } from 'usehooks-ts'

import s from './Header.module.scss'

export type HeaderProps = {}

export const Header = ({}: HeaderProps) => {
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const { isMobile } = useContext(AppMetaDataContext)

  const isClient = useIsClient()

  if (!isClient) {
    return null
  }

  return (
    <div className={s.wrapper}>
      <Button as={Link} className={s.logoWrapper} href={Paths.Home} tabIndex={-1} variant={'link'}>
        <LogoLight className={s.logo} />
        <Typography as={'h1'} variant={'large'}>
          PicoPico
        </Typography>
      </Button>
      <div className={s.container}>
        {isAuth && <NotificationPopover />}
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
        {isMobile && <HeaderMobileMenubar isAuth={isAuth} />}
      </div>
    </div>
  )
}
