import { AppState } from '@/lib/store'
import { createSelector } from 'reselect'

export const selectCreatePostAllData = (state: AppState) => state.createPost
export const selectPostDialogMeta = (state: AppState) => state.createPost.dialogMeta
export const selectPostDescription = (state: AppState) => state.createPost.description

export const selectPublicationsAllData = (state: AppState) => state.publications

// Селектор для получения контента поста по его postId
export const selectPostContent = createSelector(
  [selectPublicationsAllData, (state: AppState, postId: number) => postId],
  (publications, postId) => {
    // Убедитесь, что publications.posts существует и является массивом
    if (Array.isArray(publications.posts)) {
      return publications.posts.find(el => el.id === postId)
    }

    return undefined // Возвращаем undefined, если posts не существует или не является массивом
  }
)
