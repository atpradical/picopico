import { SignUpForm } from '@/features/auth/ui/sign-up/SignUpForm'
import { OAuth } from '@/features/oAuth'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { getLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { Button, Card, Typography } from '@atpradical/picopico-ui-kit'
import Link from 'next/link'

import s from './SignUpPage.module.scss'

function SignUpPage() {
  const { t } = useTranslation()

  return (
    <Page>
      <div className={s.container}>
        <Card className={s.card}>
          <Typography as={'h1'} variant={'h1'}>
            {t.signUpPage.pageTitle}
          </Typography>
          <OAuth />
          <SignUpForm />
          <div className={s.footer}>
            <Typography variant={'regular_16'}>{t.signUpPage.isAccount}</Typography>
            <Button as={Link} className={s.linkButton} href={Paths.LogIn} variant={'nb-outlined'}>
              {t.signUpPage.linkToSignIn}
            </Button>
          </div>
        </Card>
      </div>
    </Page>
  )
}

SignUpPage.getLayout = getLayout
export default SignUpPage
