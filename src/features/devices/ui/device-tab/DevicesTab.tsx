import { ComponentPropsWithoutRef } from 'react'

import { DeviceItem } from '@/features/devices/ui/device-item'
import { ResponseGetSessions, useTerminateAllSessionsMutation } from '@/services/devices'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { Button, TabsContent, Typography } from '@atpradical/picopico-ui-kit'

import s from './DevicesTab.module.scss'

type DevicesTabProps = {
  data: ResponseGetSessions
} & ComponentPropsWithoutRef<typeof TabsContent>

export const DevicesTab = ({ data: { current, others }, ...rest }: DevicesTabProps) => {
  const { t } = useTranslation()
  const { devicesTab } = t.profileSettings

  const [terminateAll] = useTerminateAllSessionsMutation()

  const killAllSessionsHandler = async () => {
    try {
      await terminateAll().unwrap()
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  }

  const otherSessions = others.filter(el => el.deviceId != current.deviceId)

  return (
    <TabsContent className={s.container} {...rest}>
      <section className={s.section}>
        <Typography as={'h3'} variant={'h3'}>
          {devicesTab.currentDevices}
        </Typography>
        <DeviceItem data={current} isCurrent />
      </section>
      {!!otherSessions.length && (
        <>
          <Button className={s.button} onClick={killAllSessionsHandler} variant={'outlined'}>
            {devicesTab.terminateAllOtherSessions}
          </Button>
          <section className={s.section}>
            <Typography as={'h3'} variant={'h3'}>
              {devicesTab.activeSessions}
            </Typography>
            {otherSessions.map(el => (
              <DeviceItem data={el} key={el.deviceId} />
            ))}
          </section>
        </>
      )}
    </TabsContent>
  )
}
