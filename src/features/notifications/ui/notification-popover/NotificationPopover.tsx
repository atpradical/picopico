import { useContext, useEffect, useRef, useState } from 'react'

import {
  NOTIFICATION_INITIAL_CURSOR,
  NOTIFICATION_MAX_PAGE_SIZE,
} from '@/features/notifications/config'
import { Notification } from '@/features/notifications/ui/notification'
import { useGetNotificationsQuery } from '@/services/notofications'
import { AuthContext } from '@/shared/contexts'
import { SortDirection } from '@/shared/enums'
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

type Props = {}
export const NotificationPopover = ({}: Props) => {
  const { t } = useTranslation()
  const isAuth = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const sectionRef = useRef(null)
  const [cursor, setCursor] = useState(NOTIFICATION_INITIAL_CURSOR)
  const [lastNotificationRef, entry] = useIntersectionObserver({ root: null, threshold: 0.5 })

  const { data } = useGetNotificationsQuery(
    {
      cursor,
      pageSize: NOTIFICATION_MAX_PAGE_SIZE,
      sortDirection: SortDirection.DESC,
    },
    { skip: !isAuth }
  )

  useEffect(() => {
    if (data?.items.length && entry?.isIntersecting) {
      setCursor(data.items[data.items.length - 1].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting, data?.items.length])

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
          <Badge count={data?.notReadCount}>
            {isOpen ? <BellIcon className={s.icon} /> : <BellOutlineIcon className={s.icon} />}
          </Badge>
        </Button>
      </PopoverTrigger>

      <PopoverContent align={'end'} className={s.popoverContent} ref={sectionRef}>
        <PopoverArrow className={s.arrow} height={8} width={16} />
        <Typography className={s.title}>{t.notifications.popoverTitle}</Typography>
        <Separator className={s.separator} />
        <ScrollArea type={'scroll'}>
          <div className={s.scrollContainer}>
            {data?.items.map((el, index) => (
              <Notification
                createdAt={el.createdAt}
                isLastNotification={data.items.length === index + 1}
                isRead={el.isRead}
                key={el.id}
                message={el.message}
                ref={lastNotificationRef}
              />
            ))}
            <ScrollBar />
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
