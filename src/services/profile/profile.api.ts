import { picoApi } from '@/services/picoApi'
import { ResponseGetMyProfile, UpdateMyProfileArgs, UploadAvatarArgs } from '@/services/profile'

export const profileApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteAvatar: builder.mutation<void, void>({
        invalidatesTags: ['Profile'],
        query: () => ({
          method: 'DELETE',
          url: `/v1/users/profile/avatar`,
        }),
      }),
      getMyProfile: builder.query<ResponseGetMyProfile, void>({
        providesTags: ['Profile'],
        query: () => ({
          method: 'GET',
          url: `v1/users/profile`,
        }),
      }),
      updateMyProfile: builder.mutation<void, UpdateMyProfileArgs>({
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

export const {
  useDeleteAvatarMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useUploadAvatarMutation,
} = profileApi
