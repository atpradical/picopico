import { useForm, useWatch } from 'react-hook-form'

import { Paths } from '@/shared/enums'
import { useCheckPasswordsMatch, useTranslation } from '@/shared/hooks'
import { ControlledTextField } from '@/shared/ui/form-components'
import { CreatePWDFields, createNewPasswordSchemeCreator } from '@/views/password-recovery'
import { Button, Card, Typography } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import s from './CreateNewPasswordForm.module.scss'

export const CreateNewPasswordForm = () => {
  const { t } = useTranslation()
  const {
    captionText,
    formTitle,
    labels: { labelConfirmPassword, labelPassword },
    placeholders: { placeholderConfirmPassword, placeholderPassword },
    submitButton,
  } = t.passwordRecoveryForm
  const router = useRouter()

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
    setError,
  } = useForm<CreatePWDFields>({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(createNewPasswordSchemeCreator(t.validation)),
  })

  const formHandler = handleSubmit(data => {
    if (isValid) {
      reset()
      router.push(Paths.logIn)
    }
  })

  const password = useWatch({ control, name: 'password' })
  const confirmPassword = useWatch({ control, name: 'confirmPassword' })

  useCheckPasswordsMatch({
    confirmPassword,
    password,
    setError,
    validationMessage: t.validation.passwordsMatch,
  })

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        {formTitle}
      </Typography>
      <form className={s.form} onSubmit={formHandler}>
        <ControlledTextField
          control={control}
          label={labelPassword}
          name={'password'}
          placeholder={placeholderPassword}
          variant={'password'}
        />
        <ControlledTextField
          control={control}
          label={labelConfirmPassword}
          name={'confirmPassword'}
          placeholder={placeholderConfirmPassword}
          variant={'password'}
        />
        <Typography className={s.caption} variant={'regular_14'}>
          {captionText}
        </Typography>
        <Button type={'submit'}>{submitButton}</Button>
      </form>
    </Card>
  )
}
