import { useForm } from 'react-hook-form'

import { signInSchemeCreator } from '@/features/auth/model'
import { SignInFields } from '@/features/auth/model/sign-in/types'
import { useLoginMutation } from '@/services/auth'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { ControlledTextField } from '@/shared/ui/form-components'
import { getErrorMessageData, setFormErrors } from '@/shared/utils'
import { Button, Typography, toaster } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import s from './SignInForm.module.scss'

export const SignInForm = () => {
  const { t } = useTranslation()

  const [login, { isLoading, isSuccess }] = useLoginMutation()

  const {
    control,
    formState: { isDirty, isValid },
    handleSubmit,
    setError,
  } = useForm<SignInFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(signInSchemeCreator(t.validation)),
  })

  const formHandler = handleSubmit(async data => {
    try {
      await login(data).unwrap()
    } catch (e) {
      const errors = getErrorMessageData(e)

      setFormErrors({
        errors,
        fields: [...(Object.keys(data) as (keyof SignInFields)[])],
        setError,
      })

      if (typeof errors === 'string') {
        toaster({ text: errors, variant: 'error' })
      }
    }
  })

  const isSubmitDisabled = !isValid || !isDirty

  return (
    <>
      <form className={s.form} onSubmit={formHandler}>
        <ControlledTextField
          control={control}
          label={t.signInPage.signInForm.labels.email}
          name={'email'}
          placeholder={t.signInPage.signInForm.placeholders.addEmail}
        />
        <ControlledTextField
          control={control}
          label={t.signInPage.signInForm.labels.password}
          name={'password'}
          placeholder={t.signInPage.signInForm.placeholders.addPassword}
          variant={'password'}
        />
        <Typography as={Link} className={s.forgotPassword} href={Paths.forgotPassword}>
          {t.signInPage.signInForm.forgotPassword}
        </Typography>
        <Button disabled={isSubmitDisabled} isLoading={isLoading || isSuccess} type={'submit'}>
          {t.signInPage.signInForm.submitButton}
        </Button>
      </form>
    </>
  )
}
