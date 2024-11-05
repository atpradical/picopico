import { ProfileHeader, Publications } from '@/features/profile/ui'
import { getSidebarLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'

import s from './ProfilePage.module.scss'

function ProfilePage() {
  return (
    <Page>
      <div className={s.container}>
        <ProfileHeader className={s.header} />
        <Publications />
      </div>
    </Page>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
