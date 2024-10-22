import { useLazyGetSessionsQuery } from '@/shared/api/devices'
import { useTranslation } from '@/shared/hooks'
import { getSidebarLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { DevicesTab } from '@/views/profile/ui/profile-settings/devices/DevicesTab'
import { ProfileDataTab } from '@/views/profile/ui/profile-settings/profile-data-tab'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@atpradical/picopico-ui-kit'

import s from './ProfileSettingsPage.module.scss'

const TAB_PROFILE_DATA = 'profile_data'
const TAB_DEVICES = 'devices'
const TAB_ACCOUNT = 'account'
const TAB_PAYMENTS = 'payments'

function ProfileSettingsPage() {
  const { t } = useTranslation()
  const { tabNames } = t.profileSettings

  const [getSessions, { data: sessionsData }] = useLazyGetSessionsQuery()

  const onTabChangeHandler = async (value: string) => {
    switch (value) {
      case TAB_PROFILE_DATA:
        break
      case TAB_DEVICES:
        try {
          await getSessions().unwrap()
        } catch (e) {
          const errors = getErrorMessageData(e)

          showErrorToast(errors)
        }
        break
      case TAB_ACCOUNT:
        break
      case TAB_PAYMENTS:
        break
    }
  }

  return (
    <Page mt={'36px'}>
      <div className={s.container}>
        <TabsRoot defaultValue={TAB_PROFILE_DATA} onValueChange={onTabChangeHandler}>
          <TabsList className={s.tabList}>
            <TabsTrigger value={TAB_PROFILE_DATA}>{tabNames.generalInformation}</TabsTrigger>
            <TabsTrigger value={TAB_DEVICES}>{tabNames.devices}</TabsTrigger>
            <TabsTrigger value={TAB_ACCOUNT}>{tabNames.accountManagement}</TabsTrigger>
            <TabsTrigger value={TAB_PAYMENTS}>{tabNames.payments}</TabsTrigger>
          </TabsList>
          <ProfileDataTab data={sessionsData} value={TAB_PROFILE_DATA} />
          {/*<TabsContent value={'information'}>Mock data General information</TabsContent>*/}
          {sessionsData && <DevicesTab data={sessionsData} value={TAB_DEVICES} />}
          <TabsContent value={TAB_ACCOUNT}>Mock data Account Management</TabsContent>
          <TabsContent value={TAB_PAYMENTS}>Mock dataMy payments</TabsContent>
        </TabsRoot>
      </div>
    </Page>
  )
}

ProfileSettingsPage.getLayout = getSidebarLayout
export default ProfileSettingsPage
