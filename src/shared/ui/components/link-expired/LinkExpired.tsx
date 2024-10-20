import { useState } from 'react'

import { LocaleLinkExpired } from '@/locales/en'
import { ResendLinkForm } from '@/views/registration-confirmation/ui/ResendLinkForm'
import { Button, SignUpConfirmedIllustration, Typography } from '@atpradical/picopico-ui-kit'

import s from './LinkExpired.module.scss'

type LinkExpiredProps = {
  t: LocaleLinkExpired
}
export const LinkExpired = ({ t }: LinkExpiredProps) => {
  const { caption, resendButton, title } = t
  const [showEmailForm, setShowEmailForm] = useState(false)

  const resendEmailButtonHandler = () => {
    setShowEmailForm(true)
  }

  return (
    <div className={s.container}>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        {title}
      </Typography>
      <Typography className={s.caption} variant={'regular_16'}>
        {caption}
      </Typography>
      {!showEmailForm ? (
        <Button className={s.button} onClick={resendEmailButtonHandler}>
          {resendButton}
        </Button>
      ) : (
        <ResendLinkForm />
      )}
      <SignUpConfirmedIllustration className={s.image} />
    </div>
  )
}
