import { picoApi } from '@/services'
import {
  CreatePostArgs,
  CreatePostImageArgs,
  CreatePostImageResponse,
  CreatePostResponse,
  GetPostsArgs,
  GetPostsResponse,
} from '@/services/posts/posts.types'

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
        invalidatesTags: ['Posts'],
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
      getPosts: builder.query<GetPostsResponse, GetPostsArgs>({
        providesTags: ['Posts'],
        query: ({ userName, ...args }) => ({
          method: 'GET',
          params: args ?? undefined,
          url: `v1/posts/${userName}`,
        }),
      }),
    }
  },
})

export const { useCreatePostImageMutation, useCreatePostMutation, useGetPostsQuery } = postsApi
