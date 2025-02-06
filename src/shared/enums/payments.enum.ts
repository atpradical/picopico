export enum AccountType {
  Business = 'Business',
  Personal = 'Personal',
}

export enum BillingPeriod {
  Day = 'DAY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
}

export enum PaymentSystem {
  CreditCard = 'CREDIT_CARD',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE',
}

export const PaymentAmount = {
  DAY: 10,
  MONTHLY: 100,
  WEEKLY: 50,
}
