import { ComponentPropsWithoutRef, useContext, useEffect, useState } from 'react'

import { AccountTypeRadioGroup, SubscriptionPlansRadioGroup } from '@/features/payments/ui'
import { ActiveSubscription } from '@/features/payments/ui/active-subscription'
import { useCreatePaymentSubscriptionMutation } from '@/services/payments'
import { MyProfileContext } from '@/shared/contexts'
import { BillingPeriod, Paths, PaymentAmount, PaymentSystem } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { AlertDialog } from '@/shared/ui/components'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { Button, StripeIcon, TabsContent } from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './AccountManagementTab.module.scss'

type AccountManagementTabProps = ComponentPropsWithoutRef<typeof TabsContent>

export const AccountManagementTab = ({ ...props }: AccountManagementTabProps) => {
  const { t } = useTranslation()

  const router = useRouter()
  const success = router.query.success

  const { isBusinessAccount } = useContext(MyProfileContext)
  const [createPayment, { isLoading }] = useCreatePaymentSubscriptionMutation()

  const [isPlansDescription, setPlansDescription] = useState(false)
  const [newSubscription, setNewSubscription] = useState<BillingPeriod>(BillingPeriod.Day)
  const [isAlertOpen, setAlertOpen] = useState(false)

  useEffect(() => {
    if (isBusinessAccount) {
      setPlansDescription(true)
    }
  }, [isBusinessAccount])

  useEffect(() => {
    if (success) {
      setAlertOpen(true)
    }
  }, [success])

  const changeAccountType = () => {
    setPlansDescription(!isPlansDescription)
  }

  const changeSubscriptionType = (value: BillingPeriod) => {
    setNewSubscription(value)
  }

  const createPaymentStripe = async () => {
    try {
      const result = await createPayment({
        amount: PaymentAmount[newSubscription],
        baseUrl: process.env.NEXT_PUBLIC_PAYMENTS_URL ?? '',
        paymentType: PaymentSystem.Stripe,
        typeSubscription: newSubscription,
      }).unwrap()

      if (result) {
        router.push(result.url)
      }
    } catch (e) {
      const errorMessage = getErrorMessageData(e)

      showErrorToast(errorMessage)
    }
  }

  const closeAlertHandler = (open: boolean) => {
    setAlertOpen(open)
    router.replace(Paths.Settings, undefined, { shallow: true })
  }

  return (
    <TabsContent className={s.container} {...props}>
      <ActiveSubscription />
      <AccountTypeRadioGroup onChange={changeAccountType} />
      {isPlansDescription && (
        <>
          <SubscriptionPlansRadioGroup onChange={changeSubscriptionType} />
          <div className={s.paymentButtons}>
            <Button
              className={s.paymentButton}
              isLoading={isLoading}
              onClick={createPaymentStripe}
              variant={'icon'}
            >
              <StripeIcon className={s.paymentIcon} isDark />
            </Button>
          </div>
        </>
      )}
      <AlertDialog
        isOpen={isAlertOpen}
        onConfirm={() => closeAlertHandler(false)}
        onOpenChange={closeAlertHandler}
        t={
          success === 'true'
            ? t.profileSettings.paymentAlert.success
            : t.profileSettings.paymentAlert.fail
        }
      />
    </TabsContent>
  )
}
