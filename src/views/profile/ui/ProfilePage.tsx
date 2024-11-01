import { useContext } from 'react'

import { useGetUserProfileQuery } from '@/services/profile'
import { AuthContext } from '@/shared/contexts'
import { getSidebarLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { ProfileHeader } from '@/views/profile/ui/profile-header'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './ProfilePage.module.scss'

function ProfilePage() {
  const router = useRouter()
  const { isAuth, meData } = useContext(AuthContext)
  const skip = meData?.userId !== Number(router.query.id)
  const { data: profileData } = useGetUserProfileQuery(undefined, { skip })

  if (!profileData) {
    return null
  }

  return (
    <Page>
      <div className={s.container}>
        <ProfileHeader
          aboutMe={profileData?.aboutMe}
          avatars={profileData?.avatars}
          className={s.header}
          isAuth={isAuth}
          userName={profileData?.userName}
        />
        {/*todo: complete this section*/}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'fl' }}>
          <Image
            alt={'dummy'}
            height={230}
            src={'/dummy_1.png'}
            style={{ content: 'contain' }}
            width={240}
          />
          <Image
            alt={'dummy'}
            height={230}
            src={'/dummy_2.png'}
            style={{ content: 'contain' }}
            width={240}
          />
          <Image
            alt={'dummy'}
            height={230}
            src={'/dummy_3.png'}
            style={{ content: 'contain' }}
            width={240}
          />
        </div>
      </div>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
