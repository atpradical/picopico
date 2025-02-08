import { useForm, useWatch } from 'react-hook-form'

import { CreatePWDFields, createNewPasswordSchemeCreator } from '@/features/auth/model'
import { useCreatNewPasswordMutation } from '@/services/auth'
import { Paths } from '@/shared/enums'
import { useCheckPasswordsMatch, useTranslation } from '@/shared/hooks'
import { ControlledTextField } from '@/shared/ui/form-components'
import { getErrorMessageData, setFormErrors } from '@/shared/utils'
import { Button, Card, Typography, toaster } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import s from './CreateNewPasswordForm.module.scss'

type CreateNewPasswordFormProps = {}

export const CreateNewPasswordForm = ({}: CreateNewPasswordFormProps) => {
  const router = useRouter()
  const code = Array.isArray(router.query.code) ? router.query.code[0] : router.query.code

  const { t } = useTranslation()
  const [createNewPassword, { isLoading }] = useCreatNewPasswordMutation()

  const { control, handleSubmit, setError } = useForm<CreatePWDFields>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(createNewPasswordSchemeCreator(t.validation)),
  })

  const formHandler = handleSubmit(async (data: CreatePWDFields) => {
    try {
      await createNewPassword({ newPassword: data.newPassword, recoveryCode: code ?? '' }).unwrap()
      router.push(Paths.logIn)
      toaster({ text: t.createNewPasswordForm.successNotification })
    } catch (e) {
      const errors = getErrorMessageData(e)

      setFormErrors({
        errors,
        fields: [...(Object.keys(data) as (keyof CreatePWDFields)[])],
        setError,
      })
    }
  })

  const password = useWatch({ control, name: 'newPassword' })
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
        {t.createNewPasswordForm.formTitle}
      </Typography>
      <form className={s.form} onSubmit={formHandler}>
        <ControlledTextField
          control={control}
          label={t.createNewPasswordForm.labels.newPassword}
          name={'newPassword'}
          placeholder={t.createNewPasswordForm.placeholders.newPassword}
          variant={'password'}
        />
        <ControlledTextField
          control={control}
          label={t.createNewPasswordForm.labels.confirmPassword}
          name={'confirmPassword'}
          placeholder={t.createNewPasswordForm.placeholders.confirmPassword}
          variant={'password'}
        />
        <Typography className={s.caption} variant={'regular_14'}>
          {t.createNewPasswordForm.captionText}
        </Typography>
        <Button isLoading={isLoading} type={'submit'}>
          {t.createNewPasswordForm.submitButton}
        </Button>
      </form>
    </Card>
  )
}
