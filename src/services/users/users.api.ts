import { INITIAL_CURSOR } from '@/features/profile/config'
import { picoApi } from '@/services/picoApi'

import { GetAllUsersArgs, GetAllUsersResponse } from './users.types'

export const usersApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      getAllUsers: builder.query<GetAllUsersResponse, GetAllUsersArgs>({
        // Refetch when the page arg changes
        forceRefetch({ currentArg, previousArg }) {
          // Повторный запрос только если изменился cursor или другие ключевые параметры
          return (
            currentArg?.cursor !== previousArg?.cursor || currentArg?.search !== previousArg?.search
          )
        },
        merge: (currentCache, newItems, { arg }) => {
          // Если это первый запрос (cursor равен начальному)
          if (arg.cursor === INITIAL_CURSOR) {
            // Заменяем все элементы новыми (для нового поиска)
            currentCache.items = [...newItems.items]
          } else {
            // Добавляем новые элементы к существующим (для пагинации)
            currentCache.items.push(...newItems.items)
          }

          // Обновляем nextCursor в любом случае
          currentCache.nextCursor = newItems.nextCursor
        },

        providesTags: ['Users'],
        query: params => ({
          method: 'GET',
          params,
          url: `/v1/users`,
        }),
        // Only have one cache entry because the arg always maps to one string
        serializeQueryArgs: ({ endpointName, queryArgs }) => {
          return endpointName + (queryArgs.search || '')
        },
      }),
    }
  },
})

export const { useGetAllUsersQuery } = usersApi
