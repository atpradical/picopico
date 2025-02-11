import { ComponentPropsWithoutRef, useContext } from 'react'

import { ProfileStats } from '@/features/profile/ui'
import {
  useFollowMutation,
  useGetUserProfileByUserNameWithFollowInfoQuery,
  useUnfollowMutation,
} from '@/services/followers'
import { useGetPublicUserProfileQuery } from '@/services/profile'
import { AuthContext } from '@/shared/contexts'
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
  const { isAuth, meData } = useContext(AuthContext)
  const showSettingsButton = isAuth && meData?.userId === Number(router.query.id as string)

  const { data: profileData } = useGetPublicUserProfileQuery({
    profileId: router.query.id as string,
  })

  const { data: userProfileWithFollowInfo } = useGetUserProfileByUserNameWithFollowInfoQuery({
    userName: profileData?.userName ?? '',
  })

  const [follow, { isLoading: followIsLoading }] = useFollowMutation()
  const [unfollow, { isLoading: unfollowIsLoading }] = useUnfollowMutation()

  const followHandler = async () => {
    if (profileData?.id) {
      follow({ selectedUserId: profileData.id })
    }
  }

  const unfollowHandler = async () => {
    if (profileData?.id) {
      unfollow({ userId: profileData.id })
    }
  }

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
              {userProfileWithFollowInfo?.isFollowing ? (
                <Button
                  isLoading={unfollowIsLoading}
                  onClick={unfollowHandler}
                  variant={'outlined'}
                >
                  {t.profilePage.profileUnfollowButton}
                </Button>
              ) : (
                <Button isLoading={followIsLoading} onClick={followHandler}>
                  {t.profilePage.profileFollowButton}
                </Button>
              )}
              <Button disabled variant={'secondary'}>
                {t.profilePage.profileSendMessageButton}
              </Button>
            </div>
          )}
        </div>
        <ProfileStats metaData={profileData.userMetadata} />
        <Typography className={s.aboutMe}>{profileData.aboutMe}</Typography>
      </div>
    </section>
  )
}
