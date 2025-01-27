import { AppStore } from '@/lib/store'
import { baseQueryWithReauth } from '@/services/pico-base-query'
import { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

function isHydrateAction(action: Action): action is PayloadAction<AppStore> {
  return action.type === HYDRATE
}

export const picoApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      // todo: CHECK
      // @ts-ignore
      return action.payload[reducerPath]
    }
  },
  reducerPath: 'picoApi',
  tagTypes: [
    'Me',
    'Devices',
    'MyProfile',
    'Posts',
    'Profile',
    'PublicAllPostsByUserId',
    'PublicUsersAmount',
    'PublicPostsAll',
  ],
})
