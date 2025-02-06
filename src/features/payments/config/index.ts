import { en } from '@/locales/en'
import { ru } from '@/locales/ru'
import { RadioOption } from '@/shared/types'
import { OptionsValue } from '@atpradical/picopico-ui-kit'

type OptionsWithLocale = Record<string, RadioOption[]>

export const accountTypesOptions: OptionsWithLocale = {
  en: [
    {
      id: '1',
      label: en.profileSettings.accountManagementTab.paymentType.personal,
      value: en.profileSettings.accountManagementTab.paymentType.personal,
    },
    {
      id: '2',
      label: en.profileSettings.accountManagementTab.paymentType.business,
      value: en.profileSettings.accountManagementTab.paymentType.business,
    },
  ],
  ru: [
    {
      id: '1',
      label: ru.profileSettings.accountManagementTab.paymentType.personal,
      value: ru.profileSettings.accountManagementTab.paymentType.personal,
    },
    {
      id: '2',
      label: ru.profileSettings.accountManagementTab.paymentType.business,
      value: ru.profileSettings.accountManagementTab.paymentType.business,
    },
  ],
}

export const paymentOptions: OptionsWithLocale = {
  en: [
    {
      id: '1',
      label: en.profileSettings.accountManagementTab.subscriptionDescriptions.dollars_10,
      value: '10',
    },
    {
      id: '2',
      label: en.profileSettings.accountManagementTab.subscriptionDescriptions.dollars_50,
      value: '50',
    },
    {
      id: '3',
      label: en.profileSettings.accountManagementTab.subscriptionDescriptions.dollars_100,
      value: '100',
    },
  ],
  ru: [
    {
      id: '1',
      label: ru.profileSettings.accountManagementTab.subscriptionDescriptions.dollars_10,
      value: '10',
    },
    {
      id: '2',
      label: ru.profileSettings.accountManagementTab.subscriptionDescriptions.dollars_50,
      value: '50',
    },
    {
      id: '3',
      label: ru.profileSettings.accountManagementTab.subscriptionDescriptions.dollars_100,
      value: '100',
    },
  ],
}

export const paginationSelectOptions: OptionsValue[] = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
]

export enum Subscription {
  Day = 'DAY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
}

export enum PaymentType {
  CreditCard = 'CREDIT_CARD',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE',
}
