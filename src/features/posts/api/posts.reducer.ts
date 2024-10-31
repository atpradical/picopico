import { PostsState, PostsStep } from '@/features/posts/model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialPostsState: PostsState = {
  description: '',
  dialogMeta: {
    currentStep: PostsStep.Start,
    errorMessage: '',
    isDialogOpen: false,
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
      state.dialogMeta.errorMessage = ''
    },
    setPostsCreationStep: (state, action: PayloadAction<{ step: PostsStep }>) => {
      state.dialogMeta.currentStep = action.payload.step
    },
    setPostsErrorMessage: (state, action: PayloadAction<{ error: string }>) => {
      state.dialogMeta.errorMessage = action.payload.error
    },
    togglePostCreationDialog: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.dialogMeta.isDialogOpen = action.payload.isOpen
    },
  },
})

export const postsReducer = slice.reducer
export const postsActions = slice.actions
