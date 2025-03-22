import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { Button, SignUpConfirmedIllustration, Typography } from '@atpradical/picopico-ui-kit'
import link from 'next/link'

import s from './ConfirmedEmail.module.scss'

export const ConfirmedEmail = () => {
  const { t } = useTranslation()

  return (
    <div className={s.container}>
      <Typography as={'h1'} variant={'h1'}>
        {t.confirmEmailPage.emailConfirmed.title}
      </Typography>
      <Typography variant={'regular_16'}>{t.confirmEmailPage.emailConfirmed.caption}</Typography>
      <Button as={link} className={s.button} href={Paths.LogIn}>
        {t.confirmEmailPage.emailConfirmed.signInButton}
      </Button>
      <SignUpConfirmedIllustration className={s.image} />
    </div>
  )
}
