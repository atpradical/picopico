import { accountTypesOptions } from '@/features/payments/config'
import { useTranslation } from '@/shared/hooks'
import { Card, Radio, Typography } from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './AccountType.module.scss'

type AccountTypeProps = {}
export const AccountType = ({}: AccountTypeProps) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <section className={s.section}>
      <Typography as={'h3'} variant={'h3'}>
        {t.profileSettings.accountManagementTab.accountTypes}
      </Typography>
      <Card className={s.container}>
        <Radio options={accountTypesOptions[locale ?? 'en']} />
      </Card>
    </section>
  )
}
