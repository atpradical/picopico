import { picoApi } from '@/services/picoApi'

import { GetCurrentUsersAmountResponse } from './public-user.types'

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
    }
  },
})

export const { useGetCurrentUsersAmountQuery } = publicUserApi

// export endpoints for use in SSR
export const { getCurrentUsersAmount } = publicUserApi.endpoints
