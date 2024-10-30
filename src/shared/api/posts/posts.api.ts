import { picoApi } from '@/shared/api/picoApi'
import {
  CreatePostArgs,
  CreatePostImageArgs,
  CreatePostImageResponse,
  CreatePostResponse,
} from '@/shared/api/posts/posts.types'

export const postsApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      createPost: builder.mutation<CreatePostResponse, CreatePostArgs>({
        query: body => ({
          body,
          method: 'POST',
          url: `/v1/posts`,
        }),
      }),
      createPostImage: builder.mutation<CreatePostImageResponse, CreatePostImageArgs>({
        query: body => {
          const { file } = body
          const formData = new FormData()

          if (file && file.length) {
            file.forEach(image => {
              formData.append('file', image)
            })
          }

          return {
            body: formData,
            method: 'POST',
            url: `/v1/posts/image`,
          }
        },
      }),
    }
  },
})

export const { useCreatePostImageMutation, useCreatePostMutation } = postsApi
