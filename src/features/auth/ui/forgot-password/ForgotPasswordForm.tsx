import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { ForgotPasswordFields, forgotPasswordSchemeCreator } from '@/features/auth/model'
import { usePasswordRecoveryMutation } from '@/services/auth'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { Nullable } from '@/shared/types'
import { EmailConfirmationDialog } from '@/shared/ui/components'
import { ControlledTextField } from '@/shared/ui/form-components'
import { getErrorMessageData } from '@/shared/utils'
import { setFormErrors } from '@/shared/utils/set-form-errors'
import { Button, Typography } from '@atpradical/picopico-ui-kit'
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

  const [passwordRecovery, { isLoading }] = usePasswordRecoveryMutation()

  const {
    clearErrors,
    control,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    setValue,
    trigger,
  } = useForm<ForgotPasswordFields>({
    defaultValues: {
      email: '',
      recaptcha: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
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

      setFormErrors({
        errors,
        fields: [...(Object.keys(data) as (keyof ForgotPasswordFields)[])],
        setError,
      })
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
      trigger()
    }
  }

  return (
    <form className={s.form} onChange={() => trigger('email')} onSubmit={formHandler}>
      <ControlledTextField
        control={control}
        label={'Email'}
        name={'email'}
        placeholder={'Epam@epam.com'}
      />
      <Typography className={s.text} variant={'regular_14'}>
        {t.forgotPasswordPage.formContent}
      </Typography>
      {isLinkSent && (
        <Typography className={s.sentMessage} variant={'regular_14'}>
          {t.forgotPasswordPage.sentLinkText}
        </Typography>
      )}
      <div className={s.buttonsContainer}>
        <Button
          className={s.submitButton}
          disabled={!isValid || isLoading}
          isLoading={isLoading}
          type={'submit'}
        >
          {t.forgotPasswordPage.submitButton}
        </Button>
        <Button as={Link} className={s.linkButton} href={Paths.logIn} variant={'nb-outlined'}>
          {t.forgotPasswordPage.pageLink}
        </Button>
        <div className={clsx(s.recaptcha, errors.recaptcha && s.recaptchaError)}>
          <ReCAPTCHA
            hl={locale}
            onChange={onRecaptchaChangeHandler}
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY ?? ''}
            theme={'dark'}
          />
          {errors.recaptcha && (
            <Typography variant={'error'}>{errors.recaptcha.message}</Typography>
          )}
        </div>
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
