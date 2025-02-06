import { picoApi } from '@/services/picoApi'

import {
  CreatePaymentSubscriptionArgs,
  CreatePaymentSubscriptionResponse,
  GetActiveSubscriptionInfoResponse,
  GetSubscriptionPlansResponse,
  GetUserPaymentsHistoryResponse,
} from './payments.types'

export const paymentsApi = picoApi.injectEndpoints({
  endpoints: builder => {
    return {
      cancelAutoRenewal: builder.mutation<void, void>({
        invalidatesTags: ['ActiveSubscriptionInfo'],
        query: body => {
          return {
            body,
            method: 'POST',
            url: `/v1/subscriptions/canceled-auto-renewal`,
          }
        },
      }),
      createPaymentSubscription: builder.mutation<
        CreatePaymentSubscriptionResponse,
        CreatePaymentSubscriptionArgs
      >({
        query: body => {
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
          url: `/v1/subscriptions/current-payment-subscriptions`,
        }),
      }),
      getSubscriptionPlans: builder.query<GetSubscriptionPlansResponse, void>({
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
  useGetSubscriptionPlansQuery,
  useGetUserPaymentsHistoryQuery,
} = paymentsApi
