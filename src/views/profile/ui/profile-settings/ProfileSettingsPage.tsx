import { useTranslation } from '@/shared/hooks'
import { getSidebarLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@atpradical/picopico-ui-kit'

import s from './ProfileSettingsPage.module.scss'

function ProfileSettingsPage() {
  const { t } = useTranslation()

  return (
    <Page mt={'36px'}>
      <div className={s.container}>
        <TabsRoot defaultValue={'information'}>
          <TabsList>
            <TabsTrigger value={'information'}>General information</TabsTrigger>
            <TabsTrigger value={'devices'}>Devices</TabsTrigger>
            <TabsTrigger value={'account'}>Account Management</TabsTrigger>
            <TabsTrigger value={'payments'}>My payments</TabsTrigger>
          </TabsList>
          <TabsContent value={'information'}>General information</TabsContent>
          <TabsContent value={'devices'}>Devices</TabsContent>
          <TabsContent value={'account'}>Account Management</TabsContent>
          <TabsContent value={'payments'}>My payments</TabsContent>
        </TabsRoot>
      </div>
    </Page>
  )
}

ProfileSettingsPage.getLayout = getSidebarLayout
export default ProfileSettingsPage
