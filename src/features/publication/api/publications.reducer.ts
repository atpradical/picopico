import { PublicPostsItem } from '@/services/posts'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  editMode: false,
  postData: null as PublicPostsItem | null,
  postId: 0,
  showPost: false,
}

const slice = createSlice({
  initialState,
  name: 'publications',
  reducers: {
    setPostData: (state, action: PayloadAction<{ postData: PublicPostsItem }>) => {
      state.postData = action.payload.postData
    },
    toggleEditMode: (state, action: PayloadAction<{ isEdit: boolean }>) => {
      state.editMode = action.payload.isEdit
    },
    togglePostDisplayDialog: (
      state,
      action: PayloadAction<{ isOpen: boolean; postId: number }>
    ) => {
      state.showPost = action.payload.isOpen
      state.postId = action.payload.postId
    },
    updatePostDescription: (state, action: PayloadAction<{ description: string }>) => {
      if (!state.postData) {
        return
      }

      state.postData.description = action.payload.description
    },
  },
})

export const publicationsReducer = slice.reducer
export const publicationsActions = slice.actions
