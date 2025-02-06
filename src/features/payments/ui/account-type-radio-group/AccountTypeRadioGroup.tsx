import { useContext } from 'react'

import { accountTypesOptions } from '@/features/payments/config'
import { MyProfileContext } from '@/shared/contexts'
import { useTranslation } from '@/shared/hooks'
import { Card, Radio, Typography } from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './AccountTypeRadioGroup.module.scss'

type AccountTypeProps = {
  onChange: () => void
}
export const AccountTypeRadioGroup = ({ onChange }: AccountTypeProps) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const { activeSubscriptionInfo } = useContext(MyProfileContext)

  if (!activeSubscriptionInfo) {
    return null
  }

  const currentAccountType = !activeSubscriptionInfo.data.length
    ? accountTypesOptions[locale ?? 'en'][0].value
    : accountTypesOptions[locale ?? 'en'][1].value

  return (
    <section className={s.section}>
      <Typography as={'h3'} variant={'h3'}>
        {t.profileSettings.accountManagementTab.accountTypes}
      </Typography>
      <Card className={s.container}>
        <Radio
          defaultValue={currentAccountType}
          onValueChange={onChange}
          options={accountTypesOptions[locale ?? 'en']}
        />
      </Card>
    </section>
  )
}
