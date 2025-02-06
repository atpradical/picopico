import { paymentOptions } from '@/features/payments/config'
import { SubscriptionPlanItem, useGetSubscriptionPlansQuery } from '@/services/payments'
import { BillingPeriod } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { Card, Radio, RadioOption, Typography } from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './SubscriptionPlansRadioGroup.module.scss'

type Props = {
  onChange: (value: BillingPeriod) => void
}
export const SubscriptionPlansRadioGroup = ({ onChange }: Props) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const { data: subscriptionPlans } = useGetSubscriptionPlansQuery()

  const options = subscriptionPlans
    ? getTranslatedSubscriptionPlan(subscriptionPlans.data, locale)
    : undefined

  if (!options) {
    return null
  }

  return (
    <section className={s.section}>
      <Typography as={'h3'} variant={'h3'}>
        {t.profileSettings.accountManagementTab.changeSubscription}
      </Typography>
      <Card className={s.container}>
        <Radio
          defaultValue={BillingPeriod.Day}
          onValueChange={onChange}
          options={options as RadioOption[]}
        />
      </Card>
    </section>
  )
}

const getTranslatedPlanOption = (typeDescription: string, locale: string) => {
  return paymentOptions[locale].find(option => option.value === typeDescription)
}

const getTranslatedSubscriptionPlan = (
  data: SubscriptionPlanItem | SubscriptionPlanItem[],
  locale: string = 'en'
) => {
  if (Array.isArray(data)) {
    return data.map(item => getTranslatedPlanOption(item.typeDescription, locale))
  }

  return getTranslatedPlanOption(data.typeDescription, locale)
}
