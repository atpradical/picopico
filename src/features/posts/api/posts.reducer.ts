import { PostsState, PostsStep } from '@/features/posts/model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialPostsState: PostsState = {
  description: '',
  dialogMeta: {
    currentStep: PostsStep.Start,
    isDialogOpen: false,
    uploadError: '',
  },
}

const slice = createSlice({
  initialState: initialPostsState,
  name: 'posts',
  reducers: {
    addPostDescription: (state, action: PayloadAction<{ description: string }>) => {
      state.description = action.payload.description
    },
    resetPosts: state => {
      state.description = ''
      state.dialogMeta.currentStep = PostsStep.Start
      state.dialogMeta.uploadError = ''
    },
    setPostUploadingError: (state, action: PayloadAction<{ error: string }>) => {
      state.dialogMeta.uploadError = action.payload.error
    },
    setPostsCreationStep: (state, action: PayloadAction<{ step: PostsStep }>) => {
      state.dialogMeta.currentStep = action.payload.step
    },
    togglePostCreationDialog: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.dialogMeta.isDialogOpen = action.payload.isOpen
    },
  },
})

export const postsReducer = slice.reducer
export const postsActions = slice.actions
