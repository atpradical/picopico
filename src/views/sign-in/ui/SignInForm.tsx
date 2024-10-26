import { useForm } from 'react-hook-form'

import { useLoginMutation } from '@/shared/api'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { ControlledTextField } from '@/shared/ui/form-components'
import { getErrorMessageData, setFormErrors } from '@/shared/utils'
import { signInSchemeCreator } from '@/views/sign-in'
import { SignInFields } from '@/views/sign-in/model/types'
import { Button, Typography, toaster } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SignIn.module.scss'

export const SignInForm = () => {
  const { t } = useTranslation()
  const { forgotPassword, labels, placeholders, submitButton } = t.signInPage.signInForm

  const [login] = useLoginMutation()
  const router = useRouter()

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

      router.push(Paths.profile)
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
