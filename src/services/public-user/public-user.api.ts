import { picoApi } from '@/services/picoApi'

import {
  GetCurrentUsersAmountResponse,
  GetPublicPostsAllArgs,
  GetPublicPostsAllResponse,
} from './public-user.types'

export const publicUserApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCurrentUsersAmount: builder.query<GetCurrentUsersAmountResponse, void>({
        providesTags: ['PublicUsersAmount'],
        query: () => ({
          method: 'GET',
          url: `/v1/public-user`,
        }),
      }),
      getPublicPostsAll: builder.query<GetPublicPostsAllResponse, GetPublicPostsAllArgs>({
        providesTags: ['PublicPostsAll'],
        query: ({ endCursorPostId, ...params }) => ({
          method: 'GET',
          params,
          url: `v1/public-posts/all/${endCursorPostId}`,
        }),
      }),
    }
  },
})

export const { useGetCurrentUsersAmountQuery, useGetPublicPostsAllQuery } = publicUserApi

// export endpoints for use in SSR
export const { getCurrentUsersAmount, getPublicPostsAll } = publicUserApi.endpoints
