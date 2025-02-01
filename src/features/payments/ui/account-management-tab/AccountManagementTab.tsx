import { ComponentPropsWithoutRef } from 'react'

import { AccountType, ChangeSubscription, CurrentSubscription } from '@/features/payments/ui'
import { useTranslation } from '@/shared/hooks'
import {
  Button,
  Checkbox,
  PaypalIcon,
  StripeIcon,
  TabsContent,
  Typography,
} from '@atpradical/picopico-ui-kit'

import s from './AccountManagementTab.module.scss'

type AccountManagementTabProps = ComponentPropsWithoutRef<typeof TabsContent>

export const AccountManagementTab = ({ ...props }: AccountManagementTabProps) => {
  const { t } = useTranslation()

  return (
    <TabsContent className={s.container} {...props}>
      <CurrentSubscription />
      <Checkbox label={t.profileSettings.accountManagementTab.autoRenewal} />
      <AccountType />
      <ChangeSubscription />
      <div className={s.paymentButtons}>
        <Button variant={'icon'}>
          <PaypalIcon className={s.paymentIcon} isDark />
        </Button>
        <Typography grey>{t.profileSettings.accountManagementTab.or}</Typography>
        <Button variant={'icon'}>
          <StripeIcon className={s.paymentIcon} isDark />
        </Button>
      </div>
      <Typography variant={'error'}>page in development</Typography>
    </TabsContent>
  )
}
