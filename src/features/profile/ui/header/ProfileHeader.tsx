import { ComponentPropsWithoutRef, useContext } from 'react'

import { ProfileStats } from '@/features/profile/ui'
import { AuthContext, MyProfileContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { Avatar, Button, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import link from 'next/link'

import s from './ProfileHeader.module.scss'

type ProfileHeaderProps = ComponentPropsWithoutRef<'section'>

export const ProfileHeader = ({ className, ...props }: ProfileHeaderProps) => {
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const { myProfileData } = useContext(MyProfileContext)

  return (
    <section className={clsx(s.container, className)} {...props}>
      <Avatar
        className={s.avatar}
        showFallback
        src={myProfileData.avatars[0]?.url ?? ''}
        userName={myProfileData.userName}
      />
      <div className={s.content}>
        <div className={s.titleBlock}>
          <Typography as={'h1'} variant={'h1'}>
            {myProfileData.userName}
          </Typography>
          {isAuth && (
            <Button as={link} href={Paths.Settings} variant={'secondary'}>
              {t.profilePage.profileSettingsButton}
            </Button>
          )}
        </div>
        <ProfileStats />
        <Typography className={s.aboutMe}>{myProfileData.aboutMe}</Typography>
      </div>
    </section>
  )
}
