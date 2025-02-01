import { paymentOptions } from '@/features/payments/config'
import { useTranslation } from '@/shared/hooks'
import { Card, Radio, Typography } from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './ChangeSubscription.module.scss'

type Props = {}
export const ChangeSubscription = ({}: Props) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <section className={s.section}>
      <Typography as={'h3'} variant={'h3'}>
        {t.profileSettings.accountManagementTab.changeSubscription}
      </Typography>
      <Card className={s.container}>
        <Radio options={paymentOptions[locale ?? 'en']} />
      </Card>
    </section>
  )
}
