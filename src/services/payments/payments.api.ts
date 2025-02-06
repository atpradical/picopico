import { picoApi } from '@/services/picoApi'

import {
  CancelAutoRenewalArgs,
  CancelAutoRenewalResponse,
  CreatePaymentSubscriptionArgs,
  CreatePaymentSubscriptionResponse,
  GetActiveSubscriptionInfoResponse,
  GetSubscriptionPricingDetailsResponse,
  GetUserPaymentsHistoryResponse,
} from './payments.types'

export const paymentsApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      cancelAutoRenewal: builder.mutation<CancelAutoRenewalResponse, CancelAutoRenewalArgs>({
        // invalidatesTags: ['MyProfile'],
        query: body => {
          // const { file } = body
          //
          // const formData = new FormData()
          //
          // if (file) {
          //   formData.append('file', file)
          // }

          return {
            body,
            method: 'POST',
            url: `/v1/subscriptions/cancel-auto-renewal`,
          }
        },
      }),
      createPaymentSubscription: builder.mutation<
        CreatePaymentSubscriptionResponse,
        CreatePaymentSubscriptionArgs
      >({
        // invalidatesTags: ['MyProfile'],
        query: body => {
          // const { file } = body
          //
          // const formData = new FormData()
          //
          // if (file) {
          //   formData.append('file', file)
          // }

          return {
            body,
            method: 'POST',
            url: `/v1/subscriptions`,
          }
        },
      }),
      getActiveSubscriptionInfo: builder.query<GetActiveSubscriptionInfoResponse, void>({
        providesTags: ['ActiveSubscriptionInfo'],
        query: () => ({
          method: 'GET',
          url: `/v1/subscriptions/cost-of-payment-subscriptions`,
        }),
      }),
      getSubscriptionPricingDetails: builder.query<GetSubscriptionPricingDetailsResponse, void>({
        providesTags: ['SubscriptionPricingDetails'],
        query: () => ({
          method: 'GET',
          url: `/v1/subscriptions/cost-of-payment-subscriptions`,
        }),
      }),
      getUserPaymentsHistory: builder.query<GetUserPaymentsHistoryResponse, void>({
        providesTags: ['UserPaymentsHistory'],
        query: () => ({
          method: 'GET',
          url: `/v1/subscriptions/my-payments`,
        }),
      }),
    }
  },
})

export const {
  useCancelAutoRenewalMutation,
  useCreatePaymentSubscriptionMutation,
  useGetActiveSubscriptionInfoQuery,
  useGetSubscriptionPricingDetailsQuery,
  useGetUserPaymentsHistoryQuery,
} = paymentsApi
