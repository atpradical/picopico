import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { usePasswordRecoveryMutation } from '@/shared/api'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { EmailConfirmationDialog } from '@/shared/ui/components'
import { ControlledTextField } from '@/shared/ui/form-components'
import { getErrorMessageData } from '@/shared/utils'
import { ForgotPasswordFields, forgotPasswordSchemeCreator } from '@/views/forgot-password/model'
import { Button, Typography, toaster } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'

import s from './ForgotPasswordForm.module.scss'

export const ForgotPasswordForm = () => {
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const emailRef = useRef('')
  const recaptchaRef = useRef<Nullable<ReCAPTCHA>>(null)
  const { locale, t } = useTranslation()
  const { formContent, pageLink, sentLinkText, submitButton } = t.forgotPasswordPage

  const [passwordRecovery] = usePasswordRecoveryMutation()

  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
  } = useForm<ForgotPasswordFields>({
    defaultValues: {
      email: '',
      recaptcha: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(forgotPasswordSchemeCreator(t.validation)),
  })

  const formHandler = handleSubmit(async (data: ForgotPasswordFields) => {
    emailRef.current = ''
    try {
      await passwordRecovery(data).unwrap()
      setIsLinkSent(true)
      emailRef.current = data.email
      setShowDialog(true)
    } catch (e) {
      const errors = getErrorMessageData(e)

      //todo: Toaster заменить на универсальный функционал
      if (typeof errors !== 'string') {
        errors.forEach(el => {
          setError(el.field as keyof ForgotPasswordFields, { message: el.message })
        })
      } else {
        toaster({ text: errors, variant: 'error' })
      }
    } finally {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
    }
  })

  const onRecaptchaChangeHandler = (token: null | string) => {
    if (token) {
      setValue('recaptcha', token)
      clearErrors('recaptcha')
    }
  }

  return (
    <form className={s.form} onSubmit={formHandler}>
      <ControlledTextField
        control={control}
        label={'Email'}
        name={'email'}
        placeholder={'Epam@epam.com'}
      />
      <Typography className={s.text} variant={'regular_14'}>
        {formContent}
      </Typography>
      {isLinkSent && (
        <Typography className={s.sentMessage} variant={'regular_14'}>
          {sentLinkText}
        </Typography>
      )}
      <Button type={'submit'}>{submitButton}</Button>
      <Button as={Link} className={s.button} href={Paths.logIn} variant={'nb-outlined'}>
        {pageLink}
      </Button>
      <div className={clsx(s.recaptcha, !!errors.recaptcha && s.recaptchaError)}>
        <ReCAPTCHA
          hl={locale}
          onChange={onRecaptchaChangeHandler}
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY ?? ''}
          theme={'dark'}
        />
        {errors.recaptcha && <Typography variant={'error'}>{errors.recaptcha.message}</Typography>}
      </div>
      <EmailConfirmationDialog
        email={emailRef.current}
        isOpen={showDialog}
        onOpenChange={setShowDialog}
        t={t.emailConfirmationDialog}
      />
    </form>
  )
}
