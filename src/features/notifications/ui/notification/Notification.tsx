import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { useMarkNotificationAsReadMutation } from '@/services/notofications'
import { useTranslation } from '@/shared/hooks'
import { getDateDistanceToNow } from '@/shared/utils'
import {
  Button,
  EyeOutlineIcon,
  Separator,
  TrashOutlineIcon,
  Typography,
} from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './Notification.module.scss'

type NotificationProps = {
  createdAt: string
  id: number
  isRead: boolean
  message: string
} & Omit<ComponentPropsWithoutRef<'div'>, 'id'>

type NotificationRef = ElementRef<'div'>

export const Notification = forwardRef<NotificationRef, NotificationProps>(
  ({ createdAt, id, isRead, message, ...rest }, ref) => {
    const { t } = useTranslation()
    const { locale } = useRouter()
    //todo: не проходит инвалидация после установки уведомления в read!
    const [markAsRead, { isLoading: isMarkAsReadLoading }] = useMarkNotificationAsReadMutation()

    const formattedCreatedAt = getDateDistanceToNow(new Date(createdAt), locale ?? 'en')

    const markAsReadHandler = async (id: number) => {
      void (await markAsRead({ ids: [id] }))
    }

    return (
      <div {...rest}>
        <div className={s.notificationTopRow} ref={ref}>
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
                isLoading={isMarkAsReadLoading}
                onClick={() => markAsReadHandler(id)}
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
          {formattedCreatedAt}
        </Typography>
        <Separator className={s.separator} />
      </div>
    )
  }
)
