import { ComponentPropsWithoutRef, useContext } from 'react'

import { ProfileStats } from '@/features/profile/ui'
import { AuthContext, MyProfileContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { Avatar, Button, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import link from 'next/link'
import { useRouter } from 'next/router'

import s from './ProfileHeader.module.scss'

type ProfileHeaderProps = ComponentPropsWithoutRef<'section'>

export const ProfileHeader = ({ className, ...props }: ProfileHeaderProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { isAuth } = useContext(AuthContext)
  const { myProfileData } = useContext(MyProfileContext)

  if (!myProfileData) {
    return null
  }

  const showSettingsButton = isAuth && myProfileData.id === Number(router.query.id)

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
          {showSettingsButton && (
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
