import { useEffect, useState } from 'react'

import { useCheckRecoveryCodeMutation } from '@/services/auth'
import { useTranslation } from '@/shared/hooks'
import { LinkExpired } from '@/shared/ui/components/expired-link/LinkExpired'
import { getLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { CreateNewPasswordForm } from '@/views/password-recovery'
import { useRouter } from 'next/router'

import s from './PasswordRecoveryPage.module.scss'

export default function PasswordRecoveryPage() {
  const router = useRouter()
  const recoveryCode = Array.isArray(router.query.code) ? router.query.code[0] : router.query.code
  const [isRequestCompleted, setIsRequestCompleted] = useState(false)
  const { t } = useTranslation()
  const { createNewPasswordForm } = t
  const [checkRecoveryCode, { isSuccess }] = useCheckRecoveryCodeMutation()

  useEffect(() => {
    if (recoveryCode) {
      checkRecoveryCode({ recoveryCode })
        .unwrap()
        .catch(e => {
          const errors = getErrorMessageData(e)

          showErrorToast(errors)
        })
        .finally(() => setIsRequestCompleted(true))
    }
  }, [checkRecoveryCode, recoveryCode])

  if (!isRequestCompleted) {
    return null
  }

  return (
    <Page pt={'36px'}>
      <div className={s.container}>
        {isSuccess ? (
          <CreateNewPasswordForm t={createNewPasswordForm} />
        ) : (
          <LinkExpired variant={'password'} />
        )}
      </div>
    </Page>
  )
}

PasswordRecoveryPage.getLayout = getLayout
