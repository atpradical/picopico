import { picoApi } from '@/services'
import {
  FollowArgs,
  GetUserProfileByUserNameWithFollowInfoArgs,
  GetUserProfileByUserNameWithFollowInfoResponse,
  UnfollowArgs,
} from '@/services/followers/followers.types'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'

export const followersApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      follow: builder.mutation<void, FollowArgs>({
        invalidatesTags: ['PublicUserProfile'],
        // Pessimistic Update
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const CachedArgsForQuery = followersApi.util.selectCachedArgsForQuery(
            getState(),
            'getUserProfileByUserNameWithFollowInfo'
          )

          try {
            // Ждем завершения запроса
            await queryFulfilled

            debugger
            // После успешного запроса обновляем кеш
            CachedArgsForQuery.forEach(cachedArgs => {
              dispatch(
                followersApi.util.updateQueryData(
                  'getUserProfileByUserNameWithFollowInfo',
                  cachedArgs,
                  draft => {
                    debugger
                    draft.isFollowing = true
                  }
                )
              )
            })
          } catch (e) {
            // Если запрос завершился ошибкой, откатываем изменения и показываем нотификашку
            CachedArgsForQuery.forEach((patchResult: any) => patchResult.undo())
            const error = getErrorMessageData(e)

            showErrorToast(error)
          }
        },
        query: body => ({
          body,
          method: 'POST',
          url: '/v1/users/following',
        }),
      }),
      getUserProfileByUserNameWithFollowInfo: builder.query<
        GetUserProfileByUserNameWithFollowInfoResponse,
        GetUserProfileByUserNameWithFollowInfoArgs
      >({
        providesTags: ['UserProfileByUserNameWithFollowInfo'],
        query: ({ userName }) => ({
          method: 'GET',
          url: `v1/users/${userName}`,
        }),
      }),
      unfollow: builder.mutation<void, UnfollowArgs>({
        invalidatesTags: ['PublicUserProfile'],
        // Pessimistic Update
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const cachedArgsForQuery = followersApi.util.selectCachedArgsForQuery(
            getState(),
            'getUserProfileByUserNameWithFollowInfo'
          )

          try {
            // Ждем завершения запроса
            await queryFulfilled

            // После успешного запроса обновляем кеш
            cachedArgsForQuery.forEach(cachedArgs => {
              dispatch(
                followersApi.util.updateQueryData(
                  'getUserProfileByUserNameWithFollowInfo',
                  cachedArgs,
                  draft => {
                    draft.isFollowing = false
                  }
                )
              )
            })
          } catch (e) {
            const error = getErrorMessageData(e)

            showErrorToast(error)
          }
        },
        query: ({ userId }) => ({
          method: 'DELETE',
          url: `v1/users/follower/${userId}`,
        }),
      }),
    }
  },
})

export const {
  useFollowMutation,
  useGetUserProfileByUserNameWithFollowInfoQuery,
  useUnfollowMutation,
} = followersApi
