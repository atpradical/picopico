import { useContext, useState } from 'react'

import {
  NOTIFICATION_INITIAL_CURSOR,
  NOTIFICATION_MAX_PAGE_SIZE,
} from '@/features/notifications/config'
import { NotificationPopover } from '@/features/notifications/ui'
import { useGetNotificationsQuery } from '@/services/notofications'
import { AppMetaDataContext, AuthContext } from '@/shared/contexts'
import { Paths, SortDirection } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { SelectLanguage } from '@/shared/ui/components/select-language'
import { HeaderMobileMenubar } from '@/shared/ui/layout'
import { Button, LogoLight, Typography } from '@atpradical/picopico-ui-kit'
import Link from 'next/link'
import { useIsClient } from 'usehooks-ts'

import s from './Header.module.scss'

export type HeaderProps = {}

export const Header = ({}: HeaderProps) => {
  const isClient = useIsClient()
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const { isMobile } = useContext(AppMetaDataContext)

  const [cursor, setCursor] = useState(NOTIFICATION_INITIAL_CURSOR)

  const { data } = useGetNotificationsQuery(
    {
      cursor,
      pageSize: NOTIFICATION_MAX_PAGE_SIZE,
      sortDirection: SortDirection.DESC,
    },
    { skip: !isAuth }
  )

  const updateCursorHandler = (cursor: number) => {
    setCursor(cursor)
  }

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
          <NotificationPopover
            notReadCount={data?.notReadCount}
            notifications={data?.items}
            onScroll={updateCursorHandler}
          />
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
        {isMobile && <HeaderMobileMenubar isAuth={isAuth} />}
      </div>
    </div>
  )
}
