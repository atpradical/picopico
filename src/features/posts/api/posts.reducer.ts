import { PostCreationStep, PostsState } from '@/features/posts/model'
import { Nullable } from '@/shared/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialPostsState: PostsState = {
  description: '',
  dialogMeta: {
    currentStep: PostCreationStep.Idle,
    isDialogOpen: false,
    uploadError: '',
  },
  imagesList: [],
  postPreview: null,
}

const slice = createSlice({
  initialState: initialPostsState,
  name: 'posts',
  reducers: {
    addNewPost: (state, action: PayloadAction<{ post: File }>) => {
      state.imagesList.push(action.payload.post)
    },
    addPostDescription: (state, action: PayloadAction<{ description: string }>) => {
      state.description = action.payload.description
    },
    resetPosts: state => {
      state.imagesList = []
      state.description = ''
      state.postPreview = null
      state.dialogMeta.currentStep = PostCreationStep.Idle
      state.dialogMeta.uploadError = ''
    },
    setPostPreview: (state, action: PayloadAction<{ preview: Nullable<string> }>) => {
      state.postPreview = action.payload.preview
    },
    setPostUploadingError: (state, action: PayloadAction<{ error: string }>) => {
      state.dialogMeta.uploadError = action.payload.error
    },
    setPostsCreationStep: (state, action: PayloadAction<{ step: PostCreationStep }>) => {
      state.dialogMeta.currentStep = action.payload.step
    },
    togglePostCreationDialog: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.dialogMeta.isDialogOpen = action.payload.isOpen
    },
  },
})

export const postsReducer = slice.reducer
export const postsActions = slice.actions
