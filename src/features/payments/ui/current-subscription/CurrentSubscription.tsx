import { useTranslation } from '@/shared/hooks'
import { Card, Typography } from '@atpradical/picopico-ui-kit'

import s from './CurrentSubscription.module.scss'

type CurrentSubscriptionProps = {}

export const CurrentSubscription = ({}: CurrentSubscriptionProps) => {
  const { t } = useTranslation()

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
          <Typography variant={'bold_14'}>{`31.12.9999`}</Typography>
        </div>
        <div className={s.item}>
          <Typography grey>
            {t.profileSettings.accountManagementTab.subscriptionDates.nextPayment}
          </Typography>
          <Typography variant={'bold_14'}>{`31.12.9999`}</Typography>
        </div>
      </Card>
    </section>
  )
}
