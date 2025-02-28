import { AppState } from '@/lib/store'
import { createSelector } from '@reduxjs/toolkit'

export const selectCreatePostState = (state: AppState) => state.createPost

export const selectActiveSlideIndex = createSelector(
  selectCreatePostState,
  state => state.activeSlideIndex
)

export const selectCurrentStep = createSelector(selectCreatePostState, state => state.currentStep)

export const selectPreviewList = createSelector(selectCreatePostState, state => state.previewList)

export const selectPreviewUrlList = createSelector(
  selectCreatePostState,
  state => state.previewUrlsList
)

export const selectIsDialogOpen = createSelector(selectCreatePostState, state => state.isDialogOpen)
