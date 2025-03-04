import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { useTranslation } from '@/shared/hooks'
import {
  Button,
  EyeOutlineIcon,
  Separator,
  TrashOutlineIcon,
  Typography,
} from '@atpradical/picopico-ui-kit'

import s from './Notification.module.scss'

type NotificationProps = {
  createdAt: string
  isLastNotification: boolean
  isRead: boolean
  message: string
} & ComponentPropsWithoutRef<'div'>

type NotificationRef = ElementRef<'div'>

export const Notification = forwardRef<NotificationRef, NotificationProps>(
  ({ createdAt, isLastNotification, isRead, message, ...rest }, ref) => {
    const { t } = useTranslation()

    return (
      <div ref={isLastNotification ? ref : undefined} {...rest}>
        <div className={s.notificationTopRow}>
          <div>
            <Typography as={'span'} variant={'bold_14'}>
              {t.notifications.newNotification}
            </Typography>
            {!isRead && (
              <Typography as={'span'} className={s.newLabel} variant={'small'}>
                {t.notifications.new}
              </Typography>
            )}
          </div>
          <div className={s.notificationControls}>
            {!isRead && (
              <Button
                className={s.readButton}
                title={t.notifications.markAsReadButtonTitle}
                variant={'icon'}
              >
                <EyeOutlineIcon className={s.controlsIcon} />
              </Button>
            )}
            <Button
              className={s.deleteButton}
              title={t.notifications.deleteButtonTitle}
              variant={'icon'}
            >
              <TrashOutlineIcon className={s.controlsIcon} />
            </Button>
          </div>
        </div>
        <Typography>{message}</Typography>
        <Typography grey variant={'small'}>
          {createdAt}
        </Typography>
        <Separator className={s.separator} />
      </div>
    )
  }
)
