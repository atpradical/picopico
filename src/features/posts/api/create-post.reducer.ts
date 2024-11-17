import { Point } from 'react-easy-crop'

import { PostFilter } from '@/features/posts/config'
import { PostPreview, PostsState, PostsStep } from '@/features/posts/model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: PostsState = {
  activeSlideIndex: 0,
  description: '',
  dialogMeta: {
    currentStep: PostsStep.Start,
    errorMessage: '',
    isDialogOpen: false,
  },
  previewList: null,
  // previewListWithFilter: null,
  previewUrlsList: null,
}

const slice = createSlice({
  initialState,
  name: 'createPost',
  reducers: {
    addPostDescription: (state, action: PayloadAction<{ description: string }>) => {
      state.description = action.payload.description
    },
    addPostPreview: (state, action: PayloadAction<{ preview: PostPreview[] }>) => {
      state.previewList = action.payload.preview
      state.previewUrlsList = action.payload.preview.map(el => el.previewUrlOrig)
    },
    applyFilterToPostPreview: (
      state,
      action: PayloadAction<{ filter: PostFilter; index: number; preview: string }>
    ) => {
      if (state.previewList) {
        state.previewList[action.payload.index].previewUrlModified = action.payload.preview
        state.previewList[action.payload.index].appliedFilter = action.payload.filter
      }
    },
    resetPost: state => {
      state.description = ''
      state.dialogMeta.currentStep = PostsStep.Start
      state.dialogMeta.errorMessage = ''
      state.previewList = null
      // state.previewListWithFilter = null
      state.activeSlideIndex = 0
    },
    setActiveSlideIndex: (state, action: PayloadAction<{ index: number }>) => {
      state.activeSlideIndex = action.payload.index
    },
    // setInitialPreviewListWithFilter: state => {
    //   state.previewListWithFilter = state.previewList && [...state.previewList]
    setCrop: (state, action: PayloadAction<{ crop: Point; index: number }>) => {
      if (state.previewList) {
        state.previewList[action.payload.index].crop = action.payload.crop
      }
    },
    // },
    setPostCreationStep: (state, action: PayloadAction<{ step: PostsStep }>) => {
      state.dialogMeta.currentStep = action.payload.step
    },
    setPostErrorMessage: (state, action: PayloadAction<{ error: string }>) => {
      state.dialogMeta.errorMessage = action.payload.error
    },
    setZoom: (state, action: PayloadAction<{ index: number; zoom: number }>) => {
      if (state.previewList) {
        state.previewList[action.payload.index].appliedZoom = action.payload.zoom
      }
    },
    togglePostCreationDialog: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.dialogMeta.isDialogOpen = action.payload.isOpen
    },
    updatePostPreviewUrlModified: (
      state,
      action: PayloadAction<{ index: number; preview: string }>
    ) => {
      if (state.previewList) {
        state.previewList[action.payload.index].previewUrlModified = action.payload.preview
      }
    },
    updatePreviewModifiedAspect: (
      state,
      action: PayloadAction<{ aspect: number; index: number }>
    ) => {
      if (state.previewList) {
        state.previewList[action.payload.index].aspectModified = action.payload.aspect
      }
    },
    updatePreviewOriginalAspect: (
      state,
      action: PayloadAction<{ aspect: number; index: number }>
    ) => {
      if (state.previewList) {
        state.previewList[action.payload.index].aspectOrig = action.payload.aspect
        state.previewList[action.payload.index].aspectModified = action.payload.aspect
      }
    },
  },
})

export const createPostReducer = slice.reducer
export const createPostActions = slice.actions
