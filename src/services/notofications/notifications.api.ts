import { picoApi } from '@/services'
import {
  DeleteNotificationArgs,
  GetNotificationsArgs,
  GetNotificationsResponse,
  MarkNotificationAsReadArgs,
} from '@/services/notofications/notifications.types'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'

export const notificationsApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteNotification: builder.mutation<void, DeleteNotificationArgs>({
        async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
          const cachedNotificationsForQuery = notificationsApi.util.selectCachedArgsForQuery(
            getState(),
            'getNotifications'
          )

          const patchedNotifications: any[] = []

          cachedNotificationsForQuery.forEach(cachedArgs => {
            patchedNotifications.push(
              dispatch(
                notificationsApi.util.updateQueryData('getNotifications', cachedArgs, draft => {
                  draft.items = draft.items.filter(el => el.id !== args.id)
                  draft.totalCount = draft.totalCount - 1
                })
              )
            )
          })

          try {
            await queryFulfilled
          } catch (e) {
            patchedNotifications.forEach(patchResult => patchResult.undo())
            //todo: Бекенд возвращает не консистентные ошибки, задал вопрос, нужно вернуться к этому позже.
            const error = getErrorMessageData(e)

            showErrorToast(error)
          }
        },
        query: ({ id, ...body }) => ({
          body,
          method: 'DELETE',
          url: `/v1/notifications/${id}`,
        }),
      }),
      getNotifications: builder.query<GetNotificationsResponse, GetNotificationsArgs>({
        forceRefetch({ currentArg, previousArg }) {
          return currentArg?.cursor !== previousArg?.cursor
        },
        merge: (currentCache, newItems) => {
          currentCache.items.push(...newItems.items)
        },
        providesTags: ['Notifications'],
        query: ({ cursor, ...args }) => ({
          method: 'GET',
          params: args,
          url: `/v1/notifications/${cursor}`,
        }),
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName
        },
      }),
      markNotificationAsRead: builder.mutation<void, MarkNotificationAsReadArgs>({
        async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
          const cachedNotificationsForQuery = notificationsApi.util.selectCachedArgsForQuery(
            getState(),
            'getNotifications'
          )

          const patchedNotifications: any[] = []

          cachedNotificationsForQuery.forEach(cachedArgs => {
            patchedNotifications.push(
              dispatch(
                notificationsApi.util.updateQueryData('getNotifications', cachedArgs, draft => {
                  args.ids.forEach(notificationId => {
                    const notificationToUpdateIndex = draft.items.findIndex(
                      el => el.id === notificationId
                    )

                    if (notificationToUpdateIndex !== -1) {
                      draft.items[notificationToUpdateIndex].isRead = true
                      draft.notReadCount = draft.notReadCount - 1
                    }
                  })
                })
              )
            )
          })

          try {
            await queryFulfilled
          } catch (e) {
            patchedNotifications.forEach(patchResult => patchResult.undo())
            //todo: Бекенд возвращает не консистентные ошибки, задал вопрос, нужно вернуться к этому позже.
            const error = getErrorMessageData(e)

            showErrorToast(error)
          }
        },
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
