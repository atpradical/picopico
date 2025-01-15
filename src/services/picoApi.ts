import { baseQueryWithReauth } from '@/services/pico-base-query'
import { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { AppStore } from '@/lib/store'

function isHydrateAction(action: Action): action is PayloadAction<AppStore> {
  return action.type === HYDRATE
}

export const picoApi = createApi({
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      // @ts-ignore
      return action.payload[reducerPath]
    }
  },
  endpoints: () => ({}),
  reducerPath: 'picoApi',
  tagTypes: ['Me', 'Devices', 'MyProfile', 'Posts', 'Profile'],
})
