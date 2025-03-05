import { useEffect, useRef, useState } from 'react'

import { Notification } from '@/features/notifications/ui/notification'
import { NotificationType } from '@/services/notofications'
import { useTranslation } from '@/shared/hooks'
import {
  Badge,
  BellIcon,
  BellOutlineIcon,
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  ScrollBar,
  Separator,
  Typography,
} from '@atpradical/picopico-ui-kit'
import { useIntersectionObserver } from '@uidotdev/usehooks'

import s from './NotificationPopover.module.scss'

type Props = {
  notReadCount?: number
  notifications?: NotificationType[]
  onScroll: (cursor: number) => void
  totalCount?: number
}
export const NotificationPopover = ({
  notReadCount,
  notifications = [],
  onScroll,
  totalCount,
}: Props) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const sectionRef = useRef(null)
  const [lastNotificationRef, entry] = useIntersectionObserver({ root: null, threshold: 1 })

  useEffect(() => {
    if (notifications.length && entry?.isIntersecting) {
      onScroll(notifications[notifications.length - 1].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting])

  const onOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen)
  }

  return (
    <Popover modal onOpenChange={onOpenChange} open={isOpen}>
      <PopoverTrigger asChild>
        <Button
          className={s.buttonTrigger}
          title={t.notifications.showNotificationsButtonTitle}
          variant={'icon'}
        >
          <Badge count={notReadCount}>
            {isOpen ? <BellIcon className={s.icon} /> : <BellOutlineIcon className={s.icon} />}
          </Badge>
        </Button>
      </PopoverTrigger>

      <PopoverContent align={'end'} className={s.popoverContent} ref={sectionRef}>
        <PopoverArrow className={s.arrow} height={8} width={16} />
        <Typography className={s.title}>
          {t.notifications.popoverTitle} {`(${totalCount})`}
        </Typography>
        <Separator className={s.separator} />
        <ScrollArea type={'scroll'}>
          <div className={s.scrollContainer}>
            {notifications.map((el, index) => (
              <Notification
                createdAt={el.createdAt}
                id={el.id}
                isRead={el.isRead}
                key={`${el.id} + ${index}`}
                message={el.message}
                ref={notifications.length === index + 1 ? lastNotificationRef : null}
              />
            ))}
            <ScrollBar />
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
