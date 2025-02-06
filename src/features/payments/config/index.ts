import { en } from '@/locales/en'
import { ru } from '@/locales/ru'
import { AccountType, BillingPeriod } from '@/shared/enums'
import { RadioOption } from '@/shared/types'
import { OptionsValue } from '@atpradical/picopico-ui-kit'

type OptionsWithLocale = Record<string, RadioOption[]>

export const accountTypesOptions: OptionsWithLocale = {
  en: [
    {
      id: '1',
      label: en.profileSettings.accountManagementTab.paymentType.personal,
      value: AccountType.Personal,
    },
    {
      id: '2',
      label: en.profileSettings.accountManagementTab.paymentType.business,
      value: AccountType.Business,
    },
  ],
  ru: [
    {
      id: '1',
      label: ru.profileSettings.accountManagementTab.paymentType.personal,
      value: AccountType.Personal,
    },
    {
      id: '2',
      label: ru.profileSettings.accountManagementTab.paymentType.business,
      value: AccountType.Business,
    },
  ],
}

export const paymentOptions: OptionsWithLocale = {
  en: [
    {
      id: '1',
      label: en.profileSettings.accountManagementTab.subscriptionDescriptions.dollars_10,
      value: BillingPeriod.Day,
    },
    {
      id: '2',
      label: en.profileSettings.accountManagementTab.subscriptionDescriptions.dollars_50,
      value: BillingPeriod.Weekly,
    },
    {
      id: '3',
      label: en.profileSettings.accountManagementTab.subscriptionDescriptions.dollars_100,
      value: BillingPeriod.Monthly,
    },
  ],
  ru: [
    {
      id: '1',
      label: ru.profileSettings.accountManagementTab.subscriptionDescriptions.dollars_10,
      value: BillingPeriod.Day,
    },
    {
      id: '2',
      label: ru.profileSettings.accountManagementTab.subscriptionDescriptions.dollars_50,
      value: BillingPeriod.Weekly,
    },
    {
      id: '3',
      label: ru.profileSettings.accountManagementTab.subscriptionDescriptions.dollars_100,
      value: BillingPeriod.Monthly,
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
