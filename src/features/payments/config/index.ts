import { RadioOption } from '@/shared/types'

type OptionsWithLocale = Record<string, RadioOption[]>

export const accountTypesOptions: OptionsWithLocale = {
  en: [
    { id: '1', label: 'Personal', value: 'Personal' },
    {
      id: '2',
      label: 'Business',
      value: 'Business',
    },
  ],
  ru: [
    { id: '1', label: 'Индивидуальная', value: 'Индивидуальная' },
    {
      id: '2',
      label: 'Бизнес',
      value: 'Бизнес',
    },
  ],
}

export const paymentOptions: OptionsWithLocale = {
  en: [
    { id: '1', label: '$10 per 1 Day', value: '10' },
    {
      id: '2',
      label: '$50 per 7 Day',
      value: '50',
    },
    {
      id: '3',
      label: '$100 per month',
      value: '100',
    },
  ],
  ru: [
    { id: '1', label: '$10 за 1 день', value: '10' },
    {
      id: '2',
      label: '$50 за 7 дней',
      value: '50',
    },
    {
      id: '3',
      label: '$100 в месяц',
      value: '100',
    },
  ],
}
