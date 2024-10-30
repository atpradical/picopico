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
        query: () => ({
          method: 'post',
          url: `/v1/posts/image`,
        }),
      }),
      createPostImage: builder.mutation<CreatePostImageResponse, CreatePostImageArgs>({
        query: () => ({
          method: 'post',
          url: `/v1/posts`,
        }),
      }),
    }
  },
})

export const { useCreatePostImageMutation, useCreatePostMutation } = postsApi
