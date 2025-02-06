import { BillingPeriod, PaymentSystem } from '@/shared/enums'

export type SubscriptionPlanItem = {
  amount: number
  typeDescription: BillingPeriod
}

export type GetSubscriptionPlansResponse = {
  data: SubscriptionPlanItem[]
}

export type SubscriptionDetails = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}

export type GetActiveSubscriptionInfoResponse = {
  data: SubscriptionDetails[]
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
  paymentType: PaymentSystem
  typeSubscription: BillingPeriod
}

export type CancelAutoRenewalArgs = {
  //
}

export type CancelAutoRenewalResponse = {
  //
}
