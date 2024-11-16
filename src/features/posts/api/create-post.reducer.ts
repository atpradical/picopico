import { PostsState, PostsStep } from '@/features/posts/model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: PostsState = {
  description: '',
  dialogMeta: {
    currentStep: PostsStep.Start,
    errorMessage: '',
    isDialogOpen: false,
  },
  previewList: null,
  previewListWithFilter: null,
}

const slice = createSlice({
  initialState,
  name: 'createPost',
  reducers: {
    addPostDescription: (state, action: PayloadAction<{ description: string }>) => {
      state.description = action.payload.description
    },
    addPostPreview: (state, action: PayloadAction<{ preview: string[] }>) => {
      state.previewList = action.payload.preview
    },
    addPostPreviewWithFilter: (
      state,
      action: PayloadAction<{ index: number; preview: string }>
    ) => {
      if (state.previewListWithFilter) {
        state.previewListWithFilter[action.payload.index] = action.payload.preview
      }
    },
    resetPost: state => {
      state.description = ''
      state.dialogMeta.currentStep = PostsStep.Start
      state.dialogMeta.errorMessage = ''
      state.previewList = null
    },
    setInitialPreviewListWithFilter: state => {
      state.previewListWithFilter = state.previewList && [...state.previewList]
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
