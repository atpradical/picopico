import { PublicPostsItems } from '@/services/posts'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  editMode: false,
  postId: 0,
  posts: [] as PublicPostsItems[],
  showPost: false,
}

const slice = createSlice({
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action: any) => {
      // Сливаем состояние Redux с серверными данными при гидратации
      // todo: CHECK
      if (action.payload.publications) {
        state.posts = action.payload.publications.posts || state.posts
      }
    })
  },
  initialState,
  name: 'publications',
  reducers: {
    addPublication: (state, action: PayloadAction<{ post: PublicPostsItems }>) => {
      state.posts.unshift(action.payload.post)
    },
    deletePublication: (state, action: PayloadAction<{ postId: number }>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload.postId)
    },
    resetPublications: state => {
      state.posts = []
      state.showPost = false
      state.postId = 0
    },
    setPublications: (state, action: PayloadAction<{ posts: PublicPostsItems[] }>) => {
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
    updatePostDescription: (
      state,
      action: PayloadAction<{ description: string; postId: number }>
    ) => {
      state.posts.forEach(post => {
        if (post.id === action.payload.postId) {
          post.description = action.payload.description
        }
      })
    },
  },
})

export const publicationsReducer = slice.reducer
export const publicationsActions = slice.actions
