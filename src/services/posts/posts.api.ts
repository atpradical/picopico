import { picoApi } from '@/services'
import {
  CreatePostArgs,
  CreatePostImageArgs,
  CreatePostImageResponse,
  CreatePostResponse,
  DeletePostArgs,
  GetPostsAllPublicArgs,
  GetPostsAllPublicResponse,
  GetPostsArgs,
  GetPostsResponse,
  GetPublicPostByIdArgs,
  GetPublicPostByIdResponse,
  UpdatePostArgs,
} from '@/services/posts/posts.types'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'

export const postsApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      createPost: builder.mutation<CreatePostResponse, CreatePostArgs>({
        // Pessimistic Update
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const cachedArgsForQuery = postsApi.util.selectCachedArgsForQuery(
            getState(),
            'getPostsAllPublicByUserId'
          )

          try {
            // Ждем завершения запроса
            const { data } = await queryFulfilled

            // После успешного запроса обновляем кеш
            cachedArgsForQuery.forEach(cachedArgs => {
              dispatch(
                postsApi.util.updateQueryData('getPostsAllPublicByUserId', cachedArgs, draft => {
                  draft.items.unshift(data)
                })
              )
            })
          } catch (e) {
            const error = getErrorMessageData(e)

            showErrorToast(error)
          }
        },
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
      deletePost: builder.mutation<void, DeletePostArgs>({
        async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
          // Optimistic Update for Post Delete
          // читаем кеш постов
          const cachedPublicPostsForQuery = postsApi.util.selectCachedArgsForQuery(
            getState(),
            'getPostsAllPublicByUserId'
          )

          // массив пустышка куда положим посты после удаления.
          const patchedPublicPosts: any[] = []

          cachedPublicPostsForQuery.forEach(cachedArgs => {
            patchedPublicPosts.push(
              dispatch(
                postsApi.util.updateQueryData('getPostsAllPublicByUserId', cachedArgs, draft => {
                  // Удаляем пост из draft
                  draft.items = draft.items.filter(post => post.id !== args.postId)
                })
              )
            )
          })
          try {
            await queryFulfilled
          } catch (e) {
            // Если запрос завершился ошибкой, откатываем изменения и показываем нотификашку
            patchedPublicPosts.forEach(patchResult => patchResult.undo())
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
        providesTags: ['Posts'],
        query: ({ userName, ...args }) => ({
          method: 'GET',
          params: args ?? undefined,
          url: `v1/posts/${userName}`,
        }),
      }),
      getPostsAllPublicByUserId: builder.query<GetPostsAllPublicResponse, GetPostsAllPublicArgs>({
        // Refetch when the page arg changes
        forceRefetch({ currentArg, previousArg }) {
          // Повторный запрос только если изменился endCursorPostId или другие ключевые параметры
          return currentArg?.endCursorPostId !== previousArg?.endCursorPostId
        },
        // Always merge incoming data to the cache entry
        merge: (currentCache, newItems) => {
          currentCache.items.push(...newItems.items)
        },
        providesTags: ['PublicAllPostsByUserId'],
        query: ({ endCursorPostId, userId, ...args }) => ({
          method: 'GET',
          params: args ?? undefined,
          url: `v1/public-posts/user/${userId}/${endCursorPostId}`,
        }),
        // Only have one cache entry because the arg always maps to one string
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName
        },
      }),
      getPublicPostById: builder.mutation<GetPublicPostByIdResponse, GetPublicPostByIdArgs>({
        query: ({ postId }) => ({
          method: 'GET',
          url: `v1/public-posts/${postId}`,
        }),
      }),
      updatePost: builder.mutation<void, UpdatePostArgs>({
        async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
          // Optimistic Update for Post Delete
          // читаем кеш постов
          const cachedPublicPostsForQuery = postsApi.util.selectCachedArgsForQuery(
            getState(),
            'getPostsAllPublicByUserId'
          )

          // массив пустышка куда положим посты после удаления.
          const patchedPublicPosts: any[] = []

          cachedPublicPostsForQuery.forEach(cachedArgs => {
            patchedPublicPosts.push(
              dispatch(
                postsApi.util.updateQueryData('getPostsAllPublicByUserId', cachedArgs, draft => {
                  // Обновляем пост в draft
                  const postToUpdateIndex = draft.items.findIndex(el => el.id === args.postId)

                  draft.items[postToUpdateIndex].description = args.description
                })
              )
            )
          })

          try {
            await queryFulfilled
          } catch (e) {
            // Если запрос завершился ошибкой, откатываем изменения и показываем нотификашку
            patchedPublicPosts.forEach(patchResult => patchResult.undo())
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
  useGetPostsAllPublicByUserIdQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
} = postsApi

// export endpoints for use in SSR
export const { getPostsAllPublicByUserId, getPublicPostById } = postsApi.endpoints
