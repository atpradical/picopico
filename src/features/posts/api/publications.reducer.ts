import { POSTS_INITIAL_PAGE_NUMBER } from '@/features/posts/config'
import { GetPostsItems } from '@/services/posts'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  editMode: false,
  pageNumber: POSTS_INITIAL_PAGE_NUMBER,
  postId: 0,
  posts: [] as GetPostsItems[],
  showPost: false,
}

const slice = createSlice({
  initialState,
  name: 'publications',
  reducers: {
    resetPublications: state => {
      state.posts = []
      state.pageNumber = POSTS_INITIAL_PAGE_NUMBER
    },
    setPageNumber: (state, action: PayloadAction<{ pageNumber: number }>) => {
      state.pageNumber = action.payload.pageNumber
    },
    setPublications: (state, action: PayloadAction<{ posts: GetPostsItems[] }>) => {
      state.posts.push(...action.payload.posts)
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
  },
})

export const publicationsReducer = slice.reducer
export const publicationsActions = slice.actions
