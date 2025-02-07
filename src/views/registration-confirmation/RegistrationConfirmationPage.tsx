import { useEffect, useState } from 'react'

import { ConfirmedEmail } from '@/features/auth/ui'
import { useConfirmEmailMutation } from '@/services/auth'
import { useTranslation } from '@/shared/hooks'
import { LinkExpired } from '@/shared/ui/components/link-expired/LinkExpired'
import { getLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { showErrorToast } from '@/shared/utils'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
import { useRouter } from 'next/router'

import s from './RegistrationConfirmationPage.module.scss'

function RegistrationConfirmationPage() {
  const { t } = useTranslation()

  const [isRequestCompleted, setIsRequestCompleted] = useState(false)
  const [confirmEmail, { isSuccess }] = useConfirmEmailMutation()

  const router = useRouter()
  const code = Array.isArray(router.query.code) ? router.query.code[0] : router.query.code

  useEffect(() => {
    if (code) {
      confirmEmail({ confirmationCode: code })
        .unwrap()
        .catch(e => {
          const errors = getErrorMessageData(e)

          showErrorToast(errors)
        })
        .finally(() => setIsRequestCompleted(true))
    }
  }, [confirmEmail, code])

  if (!isRequestCompleted) {
    return null
  }

  return (
    <Page pt={'36px'}>
      <div className={s.container}>
        {isSuccess ? (
          <ConfirmedEmail t={t.confirmEmailPage.emailConfirmed} />
        ) : (
          <LinkExpired t={t.expiredLink} variant={'email'} />
        )}
      </div>
    </Page>
  )
}

RegistrationConfirmationPage.getLayout = getLayout
export default RegistrationConfirmationPage
