import { useContext } from 'react'

import {
  useFollowMutation,
  useGetUserProfileByUserNameWithFollowInfoQuery,
  useUnfollowMutation,
} from '@/services/followers'
import { ResponseGetUserProfile } from '@/services/profile'
import { AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@atpradical/picopico-ui-kit'
import link from 'next/link'
import { useRouter } from 'next/router'

import s from './ActionButtons.module.scss'

type Props = {
  profileData?: ResponseGetUserProfile
}
export const ActionButtons = ({ profileData }: Props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { isAuth, meData } = useContext(AuthContext)
  const isUserPage = isAuth && meData?.userId === Number(router.query.id as string)

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

  return (
    <div className={s.actionButtonsContainer}>
      {isUserPage ? (
        <Button as={link} className={s.button} href={Paths.Settings} variant={'secondary'}>
          {t.profilePage.profileSettingsButton}
        </Button>
      ) : (
        <div className={s.followMessageContainer}>
          {userProfileWithFollowInfo?.isFollowing ? (
            <Button
              className={s.button}
              isLoading={unfollowIsLoading}
              onClick={unfollowHandler}
              variant={'outlined'}
            >
              {t.profilePage.profileUnfollowButton}
            </Button>
          ) : (
            <Button className={s.button} isLoading={followIsLoading} onClick={followHandler}>
              {t.profilePage.profileFollowButton}
            </Button>
          )}
          <Button className={s.button} disabled variant={'secondary'}>
            {t.profilePage.profileSendMessageButton}
          </Button>
        </div>
      )}
    </div>
  )
}
