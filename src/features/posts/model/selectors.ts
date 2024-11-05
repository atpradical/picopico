import { AppState } from '@/lib/store'

export const selectCreatePostAllData = (state: AppState) => state.createPost
export const selectPostDialogMeta = (state: AppState) => state.createPost.dialogMeta
export const selectPostDescription = (state: AppState) => state.createPost.description
