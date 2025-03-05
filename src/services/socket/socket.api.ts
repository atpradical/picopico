import { AppDispatch } from '@/lib/store'
import { NotificationType, notificationsApi } from '@/services/notofications'
import { SocketEvents } from '@/shared/enums'
import { Nullable } from '@/shared/types'
import { Socket, io } from 'socket.io-client'

class SocketIoApi {
  static socket: Nullable<Socket>

  static abortConnection() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  static createConnection(dispatch: AppDispatch) {
    const options = {
      query: {
        accessToken: localStorage.getItem('accessToken'),
      },
    }

    this.socket = io(process.env.NEXT_PUBLIC_INCTAGRAM_WEBSOCKET_URL, options)

    this.socket.on(SocketEvents.Connect, () => {
      console.log('ws:connect')
    })

    this.socket.on(SocketEvents.Disconnect, e => {
      console.log('ws:disconnect')
    })

    this.socket.on(SocketEvents.Notifications, response => {
      const newNotification: NotificationType = {
        createdAt: response.createdAt,
        id: response.id,
        isRead: response.isRead,
        message: response.message,
      }

      dispatch(
        notificationsApi.util.updateQueryData('getNotifications', {}, draft => {
          // Проверяем существует ли уже уведомление с таким ID
          const existingNotificationIndex = draft.items.findIndex(
            item => item.id === newNotification.id
          )

          if (existingNotificationIndex === -1) {
            // Если уведомления нет - добавляем его в начало списка
            draft.items.unshift(newNotification)
            draft.notReadCount += 1
            draft.totalCount += 1
          } else {
            // Если уведомление существует - обновляем его
            draft.items[existingNotificationIndex] = newNotification
          }
        })
      )
    })
  }
}

export default SocketIoApi
