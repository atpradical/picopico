import { useContext } from 'react'

import { AppMetaDataContext, AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { SelectLanguage } from '@/shared/ui/components/select-language'
import { MenuPopover } from '@/shared/ui/layout/navigation/menu-popover'
import { Badge, BellOutlineIcon, Button, LogoLight, Typography } from '@atpradical/picopico-ui-kit'
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
    <div className={s.wrapper}>
      <Button as={Link} className={s.logoWrapper} href={Paths.Home} tabIndex={-1} variant={'link'}>
        <LogoLight className={s.logo} />
        <Typography as={'h1'} variant={'large'}>
          PicoPico
        </Typography>
      </Button>
      <div className={s.container}>
        {isAuth && (
          <Button className={s.buttonBell} variant={'icon'}>
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
        {isMobile && <MenuPopover isAuth={isAuth} />}
      </div>
    </div>
  )
}
