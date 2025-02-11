import { BrowserIcon } from '@/features/devices/model'
import { useTerminateSessionMutation } from '@/services/devices'
import { SessionData } from '@/services/devices/devices.types'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { Button, Card, LogOutOutlineIcon, Typography } from '@atpradical/picopico-ui-kit'

import s from './DeviceItem.module.scss'

type DeviceItemProps = {
  data: SessionData
  isCurrent?: boolean
}

export const DeviceItem = ({
  data: { browserName, browserVersion, deviceId, ip, lastActive },
  isCurrent = false,
}: DeviceItemProps) => {
  const { locale, t } = useTranslation()

  const [terminateSession] = useTerminateSessionMutation()

  const terminateSessionHandler = async () => {
    try {
      await terminateSession({ deviceId }).unwrap()
    } catch (e) {
      const errors = getErrorMessageData(e)

      showErrorToast(errors)
    }
  }

  return (
    <Card className={s.container}>
      <BrowserIcon browserName={browserName} className={s.icon} />
      <div className={s.sessionInfo}>
        <Typography variant={'bold_16'}>{`${browserName} (v.${browserVersion})`}</Typography>
        <Typography>{`IP: ${ip}`}</Typography>
        <Typography
          variant={'small'}
        >{`${t.profileSettings.devicesTab.lastVisit}: ${new Date(lastActive).toLocaleString(locale, { dateStyle: 'short' })}`}</Typography>
      </div>
      {!isCurrent && (
        <Button className={s.button} onClick={terminateSessionHandler} variant={'icon'}>
          <LogOutOutlineIcon />
          {t.profileSettings.devicesTab.logout}
        </Button>
      )}
    </Card>
  )
}
