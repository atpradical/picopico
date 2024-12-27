import { useContext } from 'react'

import { DevicesTab } from '@/features/devices/ui'
import { ProfileDataTab } from '@/features/profile/ui/settings'
import { useLazyGetSessionsQuery } from '@/services/devices'
import { MyProfileContext } from '@/shared/contexts'
import { useTranslation } from '@/shared/hooks'
import { Page, getSidebarLayout } from '@/shared/ui/layout'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@atpradical/picopico-ui-kit'

import s from './SettingsPage.module.scss'

const TAB_PROFILE_DATA = 'profile_data'
const TAB_DEVICES = 'devices'
const TAB_ACCOUNT = 'account'
const TAB_PAYMENTS = 'payments'

function SettingsPage() {
  const { t } = useTranslation()
  const { tabNames } = t.profileSettings
  const { myProfileData } = useContext(MyProfileContext)
  const [getSessions, { data: sessionsData }] = useLazyGetSessionsQuery()

  const onTabChangeHandler = async (value: string) => {
    switch (value) {
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
    <Page pt={'36px'}>
      <div className={s.container}>
        <TabsRoot defaultValue={TAB_PROFILE_DATA} onValueChange={onTabChangeHandler}>
          <TabsList className={s.tabList}>
            <TabsTrigger value={TAB_PROFILE_DATA}>{tabNames.generalInformation}</TabsTrigger>
            <TabsTrigger value={TAB_DEVICES}>{tabNames.devices}</TabsTrigger>
            <TabsTrigger value={TAB_ACCOUNT}>{tabNames.accountManagement}</TabsTrigger>
            <TabsTrigger value={TAB_PAYMENTS}>{tabNames.payments}</TabsTrigger>
          </TabsList>
          {myProfileData && (
            <ProfileDataTab myProfileData={myProfileData} value={TAB_PROFILE_DATA} />
          )}
          {sessionsData && <DevicesTab data={sessionsData} value={TAB_DEVICES} />}
          <TabsContent value={TAB_ACCOUNT}>Mock data Account Management</TabsContent>
          <TabsContent value={TAB_PAYMENTS}>Mock dataMy payments</TabsContent>
        </TabsRoot>
      </div>
    </Page>
  )
}

SettingsPage.getLayout = getSidebarLayout
export default SettingsPage
