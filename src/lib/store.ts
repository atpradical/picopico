import { createPostReducer, publicationsReducer } from '@/features/posts/api'
import { avatarPostReducer } from '@/features/profile/api'
import { countriesApi } from '@/services/countries'
import { picoApi } from '@/services/picoApi'
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
  configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(picoApi.middleware).concat(countriesApi.middleware),
    // reducer: combineSlices(picoApi, countriesApi),
    reducer: {
      avatar: avatarPostReducer,
      [countriesApi.reducerPath]: countriesApi.reducer,
      createPost: createPostReducer,
      [picoApi.reducerPath]: picoApi.reducer,
      publications: publicationsReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>
export const wrapper = createWrapper<AppStore>(makeStore)
