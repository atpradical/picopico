import { publicationsActions } from '@/features/posts/api'
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
import { getErrorMessageData, showErrorToast } from '@/shared/utils'

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
        onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled
            dispatch(publicationsActions.deletePublication({ postId: args.postId }))
          } catch (e) {
            const error = getErrorMessageData(e)

            showErrorToast(error)
          }
        },
        query: ({ postId }) => ({
          method: 'DELETE',
          url: `/v1/posts/${postId}`,
        }),
      }),
      getPosts: builder.query<GetPostsResponse, GetPostsArgs>({
        onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled

            dispatch(
              publicationsActions.setPublications({
                posts: data.items,
              })
            )
          } catch (e) {
            const error = getErrorMessageData(e)

            showErrorToast(error)
          }
        },
        providesTags: ['Posts'],
        query: ({ userName, ...args }) => ({
          method: 'GET',
          params: args ?? undefined,
          url: `v1/posts/${userName}`,
        }),
      }),
      updatePost: builder.mutation<void, UpdatePostArgs>({
        onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled
            dispatch(
              publicationsActions.updatePostDescription({
                description: args.description,
                postId: args.postId,
              })
            )
          } catch (e) {
            const error = getErrorMessageData(e)

            showErrorToast(error)
          }
        },
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
