import { picoApi } from '@/services'

import { ResponseGetSessions, TerminateSessionArgs } from './devices.types'

export const devicesApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      getSessions: builder.query<ResponseGetSessions, void>({
        providesTags: ['Devices'],
        query: () => ({
          method: 'GET',
          url: '/v1/sessions',
        }),
      }),
      terminateAllSessions: builder.mutation<void, void>({
        invalidatesTags: ['Devices'],
        query: () => ({
          method: 'DELETE',
          url: '/v1/sessions/terminate-all',
        }),
      }),
      terminateSession: builder.mutation<void, TerminateSessionArgs>({
        invalidatesTags: ['Devices'],
        query: ({ deviceId }) => ({
          method: 'DELETE',
          url: `/v1/sessions/${deviceId}`,
        }),
      }),
    }
  },
})

export const {
  useGetSessionsQuery,
  useLazyGetSessionsQuery,
  useTerminateAllSessionsMutation,
  useTerminateSessionMutation,
} = devicesApi
