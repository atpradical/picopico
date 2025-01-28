import { picoApi } from '@/services/picoApi'
import {
  GetUserProfileArgs,
  ResponseGetMyProfile,
  ResponseGetUserProfile,
  UpdateMyProfileArgs,
  UploadAvatarArgs,
} from '@/services/profile'

export const profileApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteAvatar: builder.mutation<void, void>({
        invalidatesTags: ['MyProfile'],
        query: () => ({
          method: 'DELETE',
          url: `/v1/users/profile/avatar`,
        }),
      }),
      deleteProfile: builder.mutation<void, void>({
        invalidatesTags: ['MyProfile'],
        query: () => ({
          method: 'DELETE',
          url: `/v1/users/profile`,
        }),
      }),
      getMyProfile: builder.query<ResponseGetMyProfile, void>({
        providesTags: ['MyProfile'],
        query: () => ({
          method: 'GET',
          url: `v1/users/profile`,
        }),
      }),
      getUserProfile: builder.query<ResponseGetUserProfile, GetUserProfileArgs>({
        providesTags: ['Profile'],
        query: ({ profileId }) => ({
          method: 'GET',
          url: `v1/public-user/profile/${profileId}`,
        }),
      }),
      updateMyProfile: builder.mutation<void, UpdateMyProfileArgs>({
        invalidatesTags: ['MyProfile'],
        query: body => ({
          body,
          method: 'PUT',
          url: `v1/users/profile`,
        }),
      }),
      uploadAvatar: builder.mutation<void, UploadAvatarArgs>({
        invalidatesTags: ['MyProfile'],
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

export const {
  useDeleteAvatarMutation,
  useDeleteProfileMutation,
  useGetMyProfileQuery,
  useGetUserProfileQuery,
  useUpdateMyProfileMutation,
  useUploadAvatarMutation,
} = profileApi

// export endpoints for use in SSR
export const { getUserProfile } = profileApi.endpoints
