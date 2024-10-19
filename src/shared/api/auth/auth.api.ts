import { picoApi } from '@/shared/api/picoApi'

import {
  ConfirmEmailArgs,
  CreateUserArgs,
  LoginData,
  ResendRegistrationArgs,
  ResponseLogin,
  ResponseMe,
} from './auth.types'

export const authApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      confirmEmail: builder.mutation<void, ConfirmEmailArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/registration-confirmation',
        }),
      }),
      createUser: builder.mutation<void, CreateUserArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/registration',
        }),
      }),
      login: builder.mutation<ResponseLogin, LoginData>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled

            localStorage.setItem('accessToken', data.accessToken.trim())

            dispatch(authApi.util.invalidateTags(['Me']))
          } catch (e) {
            // error is catches in baseQueryWithReauth & sigInPage component
          }
        },
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      logout: builder.mutation<void, void>({
        query: () => ({
          method: 'POST',
          url: '/v1/auth/logout',
        }),
      }),
      me: builder.query<ResponseMe, void>({
        providesTags: ['Me'],
        query: () => `v1/auth/me`,
      }),
      resendRegistrationEmail: builder.mutation<void, ResendRegistrationArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/registration-email-resending',
        }),
      }),
    }
  },
})

export const {
  useConfirmEmailMutation,
  useCreateUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useResendRegistrationEmailMutation,
} = authApi
