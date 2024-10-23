import { picoApi } from '@/shared/api/picoApi'
import { ResponseGetUserProfile, UpdateUserProfileArgs } from '@/shared/api/profile/profile.types'

export const profileApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      getUserProfile: builder.query<ResponseGetUserProfile, void>({
        query: () => ({
          method: 'GET',
          url: `v1/users/profile`,
        }),
      }),
      updateUserProfile: builder.mutation<void, UpdateUserProfileArgs>({
        query: body => ({
          body,
          method: 'PUT',
          url: `v1/users/profile`,
        }),
      }),
    }
  },
})

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = profileApi
