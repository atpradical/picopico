import { picoApi } from '@/services'
import {
  DeleteNotificationArgs,
  GetNotificationsArgs,
  GetNotificationsResponse,
  MarkNotificationAsReadArgs,
} from '@/services/notofications/notifications.types'

export const notificationsApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteNotification: builder.mutation<void, DeleteNotificationArgs>({
        invalidatesTags: ['Notifications'],
        query: ({ id, ...body }) => ({
          body,
          method: 'DELETE',
          url: `/v1/notifications/${id}`,
        }),
      }),
      getNotifications: builder.query<GetNotificationsResponse, GetNotificationsArgs>({
        providesTags: ['Notifications'],
        query: body => ({
          body,
          method: 'GET',
          url: '/v1/notifications',
        }),
      }),
      markNotificationAsRead: builder.mutation<void, MarkNotificationAsReadArgs>({
        invalidatesTags: ['Notifications'],
        query: body => ({
          body,
          method: 'PUT',
          url: '/v1/notifications/mark-as-read',
        }),
      }),
    }
  },
})

export const {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} = notificationsApi
