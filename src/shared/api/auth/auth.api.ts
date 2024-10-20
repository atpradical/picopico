import { picoApi } from '@/shared/api/picoApi'

import {
  ConfirmEmailArgs,
  CreateNewPasswordArgs,
  CreateUserArgs,
  LoginArgs,
  PasswordRecoveryArgs,
  RecoveryCodeArgs,
  ResendRegistrationArgs,
  ResponseLogin,
  ResponseMe,
  ResponseRecoveryCode,
} from './auth.types'

export const authApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      checkRecoveryCode: builder.mutation<ResponseRecoveryCode, RecoveryCodeArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/check-recovery-code',
        }),
      }),
      confirmEmail: builder.mutation<void, ConfirmEmailArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/registration-confirmation',
        }),
      }),
      creatNewPassword: builder.mutation<void, CreateNewPasswordArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/new-password',
        }),
      }),
      createUser: builder.mutation<void, CreateUserArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/registration',
        }),
      }),
      login: builder.mutation<ResponseLogin, LoginArgs>({
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
      passwordRecovery: builder.mutation<void, PasswordRecoveryArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/password-recovery',
        }),
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
  useCheckRecoveryCodeMutation,
  useConfirmEmailMutation,
  useCreatNewPasswordMutation,
  useCreateUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  usePasswordRecoveryMutation,
  useResendRegistrationEmailMutation,
} = authApi
