import { baseQueryWithReauth } from '@/services/pico-base-query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const picoApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'picoApi',
  tagTypes: ['Me', 'Devices', 'Profile', 'Posts'],
})
