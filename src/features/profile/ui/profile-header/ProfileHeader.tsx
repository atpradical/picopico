import { ComponentPropsWithoutRef, useContext } from 'react'

import { ProfileStats } from '@/features/profile/ui'
import { ActionButtons } from '@/features/profile/ui/profile-header/action-button'
import { useGetPublicUserProfileQuery } from '@/services/profile'
import { AppMetaDataContext } from '@/shared/contexts'
import { Avatar, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useIsClient } from 'usehooks-ts'

import s from './ProfileHeader.module.scss'

type ProfileHeaderProps = ComponentPropsWithoutRef<'section'>

export const ProfileHeader = ({ className, ...props }: ProfileHeaderProps) => {
  const router = useRouter()
  const isClient = useIsClient()
  const { isMobile } = useContext(AppMetaDataContext)

  const { data: profileData } = useGetPublicUserProfileQuery({
    profileId: router.query.id as string,
  })

  if (!profileData) {
    return null
  }

  return (
    <section className={clsx(s.gripContainer, className)} {...props}>
      <div className={clsx(s.gridItem1)}>
        <Avatar
          showFallback
          size={isClient && isMobile ? 'm' : 'l'}
          src={profileData.avatars[0]?.url ?? ''}
          userName={profileData.userName}
        />
      </div>
      <Typography as={'h1'} className={s.gridItem2} variant={'h1'}>
        {profileData.userName}
      </Typography>
      <ActionButtons className={s.gridItem3} profileData={profileData} />
      <ProfileStats className={s.gridItem4} metaData={profileData.userMetadata} />
      <Typography className={s.gridItem5}>{profileData.aboutMe}</Typography>
    </section>
  )
}
