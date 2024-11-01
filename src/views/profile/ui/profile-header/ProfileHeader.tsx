import { ComponentPropsWithoutRef } from 'react'

import { ProfileStats } from '@/features/profile/ui'
import { AvatarsData } from '@/services/profile'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { Avatar, Button, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import link from 'next/link'

import s from './ProfileHeader.module.scss'

type ProfileHeaderProps = {
  aboutMe: Nullable<string>
  avatars: Nullable<AvatarsData[]>
  isAuth: Nullable<boolean>
  userName: Nullable<string>
} & ComponentPropsWithoutRef<'section'>

export const ProfileHeader = ({
  aboutMe,
  avatars,
  className,
  isAuth,
  userName,
  ...props
}: ProfileHeaderProps) => {
  const { t } = useTranslation()

  return (
    <section className={clsx(s.container, className)} {...props}>
      <Avatar
        className={s.avatar}
        showFallback
        src={avatars ? avatars[0]?.url : 'picopico'}
        userName={userName ?? ''}
      />
      <div className={s.content}>
        <div className={s.titleBlock}>
          <Typography as={'h1'} variant={'h1'}>
            {userName}
          </Typography>
          {isAuth && (
            <Button as={link} href={Paths.Settings} variant={'secondary'}>
              {t.profilePage.profileSettingsButton}
            </Button>
          )}
        </div>
        <ProfileStats />
        <Typography className={s.aboutMe}>{aboutMe}</Typography>
      </div>
    </section>
  )
}
