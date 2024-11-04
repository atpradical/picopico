import { picoApi } from '@/services'
import {
  CreatePostArgs,
  CreatePostImageArgs,
  CreatePostImageResponse,
  CreatePostResponse,
  DeletePostArgs,
  GetPostsArgs,
  GetPostsResponse,
  UpdatePostArgs,
} from '@/services/posts/posts.types'

export const postsApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      createPost: builder.mutation<CreatePostResponse, CreatePostArgs>({
        invalidatesTags: ['Posts'],
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
      deletePost: builder.mutation<void, DeletePostArgs>({
        invalidatesTags: ['Posts'],
        query: ({ postId }) => ({
          method: 'DELETE',
          url: `/v1/posts/${postId}`,
        }),
      }),
      getPosts: builder.query<GetPostsResponse, GetPostsArgs>({
        providesTags: ['Posts'],
        query: ({ userName, ...args }) => ({
          method: 'GET',
          params: args ?? undefined,
          url: `v1/posts/${userName}`,
        }),
      }),
      updatePost: builder.mutation<void, UpdatePostArgs>({
        invalidatesTags: ['Posts'],
        query: ({ description, postId }) => ({
          body: { description },
          method: 'PUT',
          url: `v1/posts/${postId}`,
        }),
      }),
    }
  },
})

export const {
  useCreatePostImageMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} = postsApi
