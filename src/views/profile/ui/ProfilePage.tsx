import { useTranslation } from '@/shared/hooks'
import { getSidebarLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { ProfileHeader } from '@/views/profile/ui/profile-header'
import Image from 'next/image'

import s from './ProfilePage.module.scss'

function ProfilePage() {
  const { t } = useTranslation()

  return (
    <Page>
      <div className={s.container}>
        <ProfileHeader className={s.header} />
        {/*todo: complete this section*/}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
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
