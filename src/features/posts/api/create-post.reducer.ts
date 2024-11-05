import { PostsState, PostsStep } from '@/features/posts/model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: PostsState = {
  description: '',
  dialogMeta: {
    currentStep: PostsStep.Start,
    errorMessage: '',
    isDialogOpen: false,
  },
}

const slice = createSlice({
  initialState,
  name: 'createPost',
  reducers: {
    addPostDescription: (state, action: PayloadAction<{ description: string }>) => {
      state.description = action.payload.description
    },
    resetPost: state => {
      state.description = ''
      state.dialogMeta.currentStep = PostsStep.Start
      state.dialogMeta.errorMessage = ''
    },
    setPostCreationStep: (state, action: PayloadAction<{ step: PostsStep }>) => {
      state.dialogMeta.currentStep = action.payload.step
    },
    setPostErrorMessage: (state, action: PayloadAction<{ error: string }>) => {
      state.dialogMeta.errorMessage = action.payload.error
    },
    togglePostCreationDialog: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.dialogMeta.isDialogOpen = action.payload.isOpen
    },
  },
})

export const createPostReducer = slice.reducer
export const createPostActions = slice.actions
