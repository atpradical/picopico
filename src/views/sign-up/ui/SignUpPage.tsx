import { useRef, useState } from 'react'

import { useCreateUserMutation } from '@/shared/api'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { OAuthBlock } from '@/shared/ui/components/oAuth-block'
import { getLayout } from '@/shared/ui/layout'
import { Page } from '@/shared/ui/layout/page'
import { getErrorMessageData, showErrorToast } from '@/shared/utils'
import { setFormErrors } from '@/shared/utils/set-form-errors'
import { SignUpFields } from '@/views/sign-up'
import { SignUpForm } from '@/views/sign-up/ui/SignUpForm'
import { Button, Card, Typography } from '@atpradical/picopico-ui-kit'
import Link from 'next/link'

import s from './SignUpPage.module.scss'

function SignUpPage() {
  const { t } = useTranslation()
  const { isAccount, linkToSignIn, pageTitle } = t.signUpPage

  return (
    <Page>
      <div className={s.container}>
        <Card className={s.card}>
          <Typography as={'h1'} variant={'h1'}>
            {pageTitle}
          </Typography>
          <OAuthBlock />
          <SignUpForm />
          <div className={s.footer}>
            <Typography variant={'regular_16'}>{isAccount}</Typography>
            <Button as={Link} href={Paths.logIn} variant={'nb-outlined'}>
              {linkToSignIn}
            </Button>
          </div>
        </Card>
      </div>
    </Page>
  )
}

SignUpPage.getLayout = getLayout
export default SignUpPage
