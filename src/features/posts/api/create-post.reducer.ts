import { Area, Point } from 'react-easy-crop'

import { PostFilter } from '@/features/posts/config'
import { PostPreview, PostsState, PostsStep } from '@/features/posts/model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: PostsState = {
  activeSlideIndex: 0,
  dialogMeta: {
    currentStep: PostsStep.Start,
    isDialogOpen: false,
  },
  previewList: [],
  previewUrlsList: [],
}

const slice = createSlice({
  initialState,
  name: 'createPost',
  reducers: {
    addPostPreview: (state, action: PayloadAction<{ preview: PostPreview }>) => {
      state.previewList.push(action.payload.preview)
      state.previewUrlsList.push(action.payload.preview.previewUrlOrig)
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
    removePostPreview: (state, action: PayloadAction<{ index: number }>) => {
      state.previewList = state.previewList.filter((_, i) => i !== action.payload.index)
      state.previewUrlsList = state.previewUrlsList.filter((_, i) => i !== action.payload.index)
    },
    resetPost: state => {
      state.dialogMeta.currentStep = PostsStep.Start
      state.previewList = []
      state.activeSlideIndex = 0
    },
    setActiveSlideIndex: (state, action: PayloadAction<{ index: number }>) => {
      state.activeSlideIndex = action.payload.index
    },
    setCrop: (state, action: PayloadAction<{ crop: Point; index: number }>) => {
      if (state.previewList) {
        state.previewList[action.payload.index].crop = action.payload.crop
      }
    },
    setCroppedAreaPixels: (
      state,
      action: PayloadAction<{ croppedAreaPixels: Area; index: number }>
    ) => {
      if (state.previewList) {
        state.previewList[action.payload.index].croppedAreaPixels = action.payload.croppedAreaPixels
      }
    },
    setPostCreationStep: (state, action: PayloadAction<{ step: PostsStep }>) => {
      state.dialogMeta.currentStep = action.payload.step
    },
    setZoom: (state, action: PayloadAction<{ index: number; zoom: number }>) => {
      if (state.previewList) {
        state.previewList[action.payload.index].appliedZoom = action.payload.zoom
      }
    },
    togglePostCreationDialog: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.dialogMeta.isDialogOpen = action.payload.isOpen
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
