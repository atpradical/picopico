import { PaymentType, Subscription } from '@/features/payments/config'

export type SubscriptionOption = {
  amount: number
  typeDescription: Subscription
}

export type GetSubscriptionPricingDetailsResponse = {
  data: SubscriptionOption[]
}

export type SubscriptionOptionDetails = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}

export type GetActiveSubscriptionInfoResponse = {
  data: SubscriptionOptionDetails[]
  hasAutoRenewal: boolean
}

export type GetUserPaymentsHistoryResponse = PaymentHistoryItem[]

export type PaymentHistoryItem = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: string
  price: number
  subscriptionId: string
  subscriptionType: string
  userId: number
}

export type CreatePaymentSubscriptionResponse = {
  url: string
}

export type CreatePaymentSubscriptionArgs = {
  amount: number
  baseUrl: string
  paymentType: PaymentType
  typeSubscription: Subscription
}

export type CancelAutoRenewalArgs = {
  //
}

export type CancelAutoRenewalResponse = {
  //
}
