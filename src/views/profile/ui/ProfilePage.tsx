import { ProfileHeader, Publications } from '@/features/profile/ui'
import { useGetUserProfileQuery } from '@/services/profile'
import { getSidebarLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { useRouter } from 'next/router'

import s from './ProfilePage.module.scss'

function ProfilePage() {
  const router = useRouter()

  const { data } = useGetUserProfileQuery({ profileId: router.query.id as string })

  if (!data) {
    return null
  }

  return (
    <Page>
      <div className={s.container}>
        <ProfileHeader className={s.header} profileData={data} />
        <Publications profileData={data} />
      </div>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
