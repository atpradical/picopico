import { PostCreationStep, PostsState } from '@/features/posts/model'
import { Nullable } from '@/shared/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: PostsState = {
  isOpen: false,
  newPost: null, // todo: заменить на массив постов
  postPreview: null,
  step: PostCreationStep.Idle,
  uploadingError: '',
}

const slice = createSlice({
  initialState: initialState,
  name: 'posts',
  reducers: {
    addNewPost: (state, action: PayloadAction<{ post: Nullable<File | string> }>) => {
      state.newPost = action.payload.post
    },
    resetPosts: state => {
      state.newPost = null
      state.postPreview = null
      state.step = PostCreationStep.Idle
      state.uploadingError = ''
    },
    setPostPreview: (state, action: PayloadAction<{ preview: Nullable<string> }>) => {
      state.postPreview = action.payload.preview
    },
    setPostUploadingError: (state, action: PayloadAction<{ error: string }>) => {
      state.uploadingError = action.payload.error
    },
    setPostsCreationStep: (state, action: PayloadAction<{ step: PostCreationStep }>) => {
      state.step = action.payload.step
    },
    togglePostCreationDialog: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isOpen = action.payload.isOpen
    },
  },
})

export const postsReducer = slice.reducer
export const postsActions = slice.actions
