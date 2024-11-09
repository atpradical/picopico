import { Nullable } from '@/shared/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type StateType = {
  avatarPreview: Nullable<string>
  isOpen: boolean
}

const initialState: StateType = {
  avatarPreview: null,
  isOpen: false,
}

const slice = createSlice({
  initialState,
  name: 'avatar',
  reducers: {
    resetAvatarDialog: state => {
      state.isOpen = false
      state.avatarPreview = null
    },
    setAvatarPreview: (state: StateType, action: PayloadAction<{ preview: Nullable<string> }>) => {
      state.avatarPreview = action.payload.preview
    },
    toggleAvatarDialog: (state: StateType, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isOpen = action.payload.isOpen
    },
  },
})

export const avatarPostReducer = slice.reducer
export const avatarPostActions = slice.actions
