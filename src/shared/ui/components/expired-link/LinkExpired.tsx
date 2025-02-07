import { useState } from 'react'

import { ResendLinkForm } from '@/features/auth/ui'
import { useTranslation } from '@/shared/hooks'
import { Button, TimeManagementIllustration, Typography } from '@atpradical/picopico-ui-kit'

import s from './LinkExpired.module.scss'

type LinkExpiredProps = {
  variant: 'email' | 'password'
}

export const LinkExpired = ({ variant }: LinkExpiredProps) => {
  const { t } = useTranslation()
  const [showEmailForm, setShowEmailForm] = useState(false)

  const resendEmailButtonHandler = (_: any) => {
    setShowEmailForm(true)
  }

  return (
    <div className={s.container}>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        {t.expiredLink.title}
      </Typography>
      <Typography className={s.caption} variant={'regular_16'}>
        {t.expiredLink.caption}
      </Typography>
      <div className={s.buttonsContainer}>
        {variant === 'email' &&
          (!showEmailForm ? (
            <Button className={s.button} onClick={resendEmailButtonHandler}>
              {t.expiredLink.resendButton}
            </Button>
          ) : (
            <ResendLinkForm />
          ))}
        <TimeManagementIllustration className={s.image} />
      </div>
    </div>
  )
}
