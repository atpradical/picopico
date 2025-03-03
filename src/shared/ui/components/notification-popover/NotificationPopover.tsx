import { useState } from 'react'

import { NotificationType, useGetNotificationsQuery } from '@/services/notofications'
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

import s from './NotificationPopover.module.scss'

type Props = {}
export const NotificationPopover = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  //todo: проверить почему не отправляется запрос за уведомлениями.
  const { data } = useGetNotificationsQuery({})

  console.table(data)

  const onOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen)
  }

  return (
    <Popover onOpenChange={onOpenChange} open={isOpen}>
      <PopoverTrigger asChild>
        {/*todo: add translations to title*/}
        <Button className={s.buttonTrigger} title={'notifications'} variant={'icon'}>
          <Badge count={999}>
            {isOpen ? <BellIcon className={s.icon} /> : <BellOutlineIcon className={s.icon} />}
          </Badge>
        </Button>
      </PopoverTrigger>

      <PopoverContent align={'end'} className={s.popoverContent}>
        <PopoverArrow className={s.arrow} height={8} width={16} />
        <Typography className={s.title}>Notifications</Typography>
        <Separator className={s.separator} />
        <ScrollArea>
          <div className={s.notificationContainer}>
            {data?.items.map(el => (
              <Notification
                createdAt={el.createdAt}
                id={el.id}
                isRead={el.isRead}
                key={el.id}
                message={el.message}
              />
            ))}
          </div>
          <ScrollBar />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

const Notification = ({ createdAt, message }: NotificationType) => {
  return (
    <div>
      <Typography variant={'bold_14'}>Новое уведомление!</Typography>
      <Typography>{message}</Typography>
      <Typography grey variant={'small'}>
        {createdAt}
      </Typography>
      <Separator className={s.separator} />
    </div>
  )
}
