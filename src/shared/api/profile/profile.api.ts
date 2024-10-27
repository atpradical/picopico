import { picoApi } from '@/shared/api/picoApi'
import {
  ResponseGetUserProfile,
  UpdateUserProfileArgs,
  UploadAvatarArgs,
} from '@/shared/api/profile/profile.types'

export const profileApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      getUserProfile: builder.query<ResponseGetUserProfile, void>({
        providesTags: ['Profile'],
        query: () => ({
          method: 'GET',
          url: `v1/users/profile`,
        }),
      }),
      updateUserProfile: builder.mutation<void, UpdateUserProfileArgs>({
        invalidatesTags: ['Profile'],
        query: body => ({
          body,
          method: 'PUT',
          url: `v1/users/profile`,
        }),
      }),
      uploadAvatar: builder.mutation<void, UploadAvatarArgs>({
        invalidatesTags: ['Profile'],
        query: body => {
          const { file } = body

          const formData = new FormData()

          if (file) {
            formData.append('file', file)
          }

          return {
            body: formData,
            method: 'POST',
            url: `/v1/users/profile/avatar`,
          }
        },
      }),
    }
  },
})

export const { useGetUserProfileQuery, useUpdateUserProfileMutation, useUploadAvatarMutation } =
  profileApi
