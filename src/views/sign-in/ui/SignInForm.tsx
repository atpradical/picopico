import { useForm } from 'react-hook-form'

import { useLoginMutation } from '@/shared/api'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { ControlledTextField } from '@/shared/ui/form-components'
import { getErrorMessageData } from '@/shared/utils'
import { signInSchemeCreator } from '@/views/sign-in'
import { Button, Typography, toaster } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { z } from 'zod'

import s from './SignIn.module.scss'

export const SignInForm = () => {
  const { t } = useTranslation()
  const { forgotPassword, labels, placeholders, submitButton } = t.signInPage.signInForm

  const [login] = useLoginMutation()
  const router = useRouter()

  type SignInFields = z.infer<ReturnType<typeof signInSchemeCreator>>
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
      const result = await login(data).unwrap()

      router.push(Paths.home)
    } catch (err) {
      const errors = getErrorMessageData(err)

      if (typeof errors !== 'string') {
        errors.forEach(el => {
          setError(el.field as keyof SignInFields, {
            message: el.message,
            type: 'manual',
          })
        })
      } else {
        Object.keys(data).forEach(field => {
          setError(field as keyof SignInFields, {
            message: ' ',
            type: 'manual',
          })
        })
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
          label={labels.email}
          name={'email'}
          placeholder={placeholders.addEmail}
        />
        <ControlledTextField
          control={control}
          label={labels.password}
          name={'password'}
          placeholder={placeholders.addPassword}
          variant={'password'}
        />
        <Typography as={Link} className={s.forgotPassword} href={Paths.forgotPassword}>
          {forgotPassword}
        </Typography>
        <Button disabled={isSubmitDisabled} type={'submit'}>
          {submitButton}
        </Button>
      </form>
    </>
  )
}
