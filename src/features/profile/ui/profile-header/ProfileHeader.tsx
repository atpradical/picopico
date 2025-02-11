import { ComponentPropsWithoutRef } from 'react'

import { ProfileStats } from '@/features/profile/ui'
import { ActionButtons } from '@/features/profile/ui/profile-header/action-button'
import { useGetPublicUserProfileQuery } from '@/services/profile'
import { Avatar, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './ProfileHeader.module.scss'

type ProfileHeaderProps = ComponentPropsWithoutRef<'section'>

export const ProfileHeader = ({ className, ...props }: ProfileHeaderProps) => {
  const router = useRouter()

  const { data: profileData } = useGetPublicUserProfileQuery({
    profileId: router.query.id as string,
  })

  if (!profileData) {
    return null
  }

  return (
    <section className={clsx(s.profileHeaderContainer, className)} {...props}>
      <Avatar
        className={s.profileHeaderAvatar}
        showFallback
        size={'l'}
        src={profileData.avatars[0]?.url ?? ''}
        userName={profileData.userName}
      />
      <div className={s.profileHeaderContent}>
        <div className={s.profileHeaderTitleWrapper}>
          <Typography as={'h1'} variant={'h1'}>
            {profileData.userName}
          </Typography>
          <ActionButtons profileData={profileData} />
        </div>
        <ProfileStats metaData={profileData.userMetadata} />
        <Typography className={s.profileHeaderDescription}>{profileData.aboutMe}</Typography>
      </div>
    </section>
  )
}
