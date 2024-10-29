import { AppState } from '@/lib/store'

export const selectPosts = (state: AppState) => state.posts
export const selectNewPost = (state: AppState) => state.posts.newPost
export const selectPostPreview = (state: AppState) => state.posts.postPreview
export const selectPostCreationStep = (state: AppState) => state.posts.step
export const selectPostsIsOpen = (state: AppState) => state.posts.isOpen
export const selectPostsUploadingError = (state: AppState) => state.posts.uploadingError
