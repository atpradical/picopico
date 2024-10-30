import { AppState } from '@/lib/store'

export const selectPostsAllData = (state: AppState) => state.posts
export const selectPostsDialogMeta = (state: AppState) => state.posts.dialogMeta
export const selectPostPreview = (state: AppState) => state.posts.postPreview
