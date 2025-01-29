import { useContext, useEffect, useState } from 'react'

import { DevicesTab } from '@/features/devices/ui'
import { ProfileDataTab } from '@/features/profile/ui/settings'
import { useLazyGetSessionsQuery } from '@/services/devices'
import { MyProfileContext } from '@/shared/contexts'
import { useTranslation } from '@/shared/hooks'
import { Page, getSidebarLayout } from '@/shared/ui/layout'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './SettingsPage.module.scss'

const TAB_PROFILE_DATA = 'general'
const TAB_DEVICES = 'devices'
const TAB_ACCOUNT = 'account'
const TAB_PAYMENTS = 'payments'

function SettingsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { tabNames } = t.profileSettings
  const { myProfileData } = useContext(MyProfileContext)
  const [getSessions, { data: sessionsData }] = useLazyGetSessionsQuery()

  // Инициализация состояния с учетом значения из sessionStorage
  const [activeTab, setActiveTab] = useState(TAB_PROFILE_DATA)

  useEffect(() => {
    // Устанавливаем значение из sessionStorage только на клиенте
    if (router.isReady) {
      const tab = sessionStorage.getItem('activeTab') || TAB_PROFILE_DATA

      setActiveTab(tab)
    }
  }, [router.isReady])

  const onTabChangeHandler = async (tabValue: string) => {
    setActiveTab(tabValue)
    sessionStorage.setItem('activeTab', tabValue)

    switch (tabValue) {
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
        <TabsRoot onValueChange={onTabChangeHandler} value={activeTab}>
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
