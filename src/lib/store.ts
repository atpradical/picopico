import { postsReducer } from '@/features/posts/api/posts.reducer'
import { countriesApi } from '@/shared/api/countries/countriesApi'
import { picoApi } from '@/shared/api/picoApi'
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
  configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(picoApi.middleware).concat(countriesApi.middleware),
    // reducer: combineSlices(picoApi, countriesApi),
    reducer: {
      [countriesApi.reducerPath]: countriesApi.reducer,
      [picoApi.reducerPath]: picoApi.reducer,
      posts: postsReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>
export const wrapper = createWrapper<AppStore>(makeStore)
