import { useContext } from 'react'

import { useCancelAutoRenewalMutation } from '@/services/payments'
import { MyProfileContext } from '@/shared/contexts'
import { useTranslation } from '@/shared/hooks'
import { Card, Checkbox, Typography } from '@atpradical/picopico-ui-kit'
import { addDays } from 'date-fns'
import { useRouter } from 'next/router'

import s from './ActiveSubscription.module.scss'

type Props = {}

export const ActiveSubscription = ({}: Props) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const { activeSubscriptionInfo } = useContext(MyProfileContext)
  const [cancelAutoRenewal] = useCancelAutoRenewalMutation()

  if (!activeSubscriptionInfo || !activeSubscriptionInfo.data.length) {
    return null
  }

  const expireAtDate = new Date(activeSubscriptionInfo.data.at(-1)!.endDateOfSubscription)
  const formattedExpireAt = expireAtDate.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const nextPaymentDate = addDays(expireAtDate, 1)
  const formattedNextPaymentDate = nextPaymentDate.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const isAutoRenewal = activeSubscriptionInfo?.hasAutoRenewal

  const cancelAutoRenewalHandler = () => {
    cancelAutoRenewal()
  }

  return (
    <section className={s.section}>
      <Typography as={'h3'} variant={'h3'}>
        {t.profileSettings.accountManagementTab.currentSubscription}
      </Typography>
      <Card className={s.container}>
        <div className={s.item}>
          <Typography grey>
            {t.profileSettings.accountManagementTab.subscriptionDates.expireAt}
          </Typography>
          <Typography variant={'bold_14'}>{formattedExpireAt}</Typography>
        </div>
        {isAutoRenewal && (
          <div className={s.item}>
            <Typography grey>
              {t.profileSettings.accountManagementTab.subscriptionDates.nextPayment}
            </Typography>
            <Typography variant={'bold_14'}>{formattedNextPaymentDate}</Typography>
          </div>
        )}
      </Card>
      {isAutoRenewal && (
        <Checkbox
          checked={isAutoRenewal}
          label={t.profileSettings.accountManagementTab.autoRenewal}
          onCheckedChange={cancelAutoRenewalHandler}
        />
      )}
    </section>
  )
}
