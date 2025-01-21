import { ComponentPropsWithoutRef, useContext } from 'react'

import { ProfileStats } from '@/features/profile/ui'
import { ResponseGetUserProfile } from '@/services/profile'
import { AuthContext, MyProfileContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { Avatar, Button, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import link from 'next/link'
import { useRouter } from 'next/router'

import s from './ProfileHeader.module.scss'

type ProfileHeaderProps = {
  profileData?: ResponseGetUserProfile
} & ComponentPropsWithoutRef<'section'>

export const ProfileHeader = ({ className, profileData, ...props }: ProfileHeaderProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { isAuth } = useContext(AuthContext)
  const { myProfileData } = useContext(MyProfileContext)

  const showSettingsButton = isAuth && myProfileData?.id === Number(router.query.id)

  if (!profileData) {
    return null
  }

  return (
    <section className={clsx(s.container, className)} {...props}>
      <Avatar
        className={s.avatar}
        showFallback
        src={profileData.avatars[0]?.url ?? ''}
        userName={profileData.userName}
      />
      <div className={s.content}>
        <div className={s.titleBlock}>
          <Typography as={'h1'} variant={'h1'}>
            {profileData.userName}
          </Typography>
          {showSettingsButton ? (
            <Button as={link} href={Paths.Settings} variant={'secondary'}>
              {t.profilePage.profileSettingsButton}
            </Button>
          ) : (
            <div className={s.actions}>
              <Button>{t.profilePage.profileFollowButton}</Button>
              <Button variant={'secondary'}>{t.profilePage.profileSendMessageButton}</Button>
            </div>
          )}
        </div>
        <ProfileStats metaData={profileData.userMetadata} />
        <Typography className={s.aboutMe}>{profileData.aboutMe}</Typography>
      </div>
    </section>
  )
}
