import { useEffect } from 'react'

import { AppDispatch } from '@/lib/store'
import SocketIoApi from '@/services/socket/socket.api'

type UseConnectSocketProps = {
  dispatch: AppDispatch
  isAuth: boolean
}

export const useConnectSocket = ({ dispatch, isAuth }: UseConnectSocketProps) => {
  const connectSocket = () => {
    SocketIoApi.createConnection(dispatch)
  }

  const disconnectSocket = () => {
    SocketIoApi.abortConnection()
  }

  useEffect(() => {
    if (isAuth) {
      connectSocket()
      console.log('connect socket')
    }

    return () => {
      console.log('disconnect socket')
      disconnectSocket()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth])
}
