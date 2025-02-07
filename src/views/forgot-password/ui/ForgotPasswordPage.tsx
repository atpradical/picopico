import { useTranslation } from '@/shared/hooks'
import { getLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { ForgotPasswordForm } from '@/views/forgot-password/ui/ForgotPasswordForm'
import { Card, Typography } from '@atpradical/picopico-ui-kit'

import s from './ForgotPasswordPage.module.scss'

export default function ForgotPasswordPage() {
  const { t } = useTranslation()

  return (
    <Page pt={'72px'}>
      <div className={s.container}>
        <Card className={s.card}>
          <Typography as={'h1'} variant={'h1'}>
            {t.forgotPasswordPage.pageTitle}
          </Typography>
          <ForgotPasswordForm />
        </Card>
      </div>
    </Page>
  )
}

ForgotPasswordPage.getLayout = getLayout
