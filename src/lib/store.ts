import { countriesApi } from '@/shared/api/countries/countriesApi'
import { picoApi } from '@/shared/api/picoApi'
import { Action, ThunkAction, combineSlices, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
  configureStore({
    devTools: true,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(picoApi.middleware).concat(countriesApi.middleware),
    reducer: combineSlices(picoApi, countriesApi),
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>
export const wrapper = createWrapper<AppStore>(makeStore)
