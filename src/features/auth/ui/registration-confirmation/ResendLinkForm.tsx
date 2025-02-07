import { useForm } from 'react-hook-form'

import { ResendLinkFields, resendRegistrationEmailSchemeCreator } from '@/features/auth/model'
import { useResendRegistrationEmailMutation } from '@/services/auth'
import { useTranslation } from '@/shared/hooks'
import { ControlledTextField } from '@/shared/ui/form-components'
import { getErrorMessageData, setFormErrors } from '@/shared/utils'
import { Button, toaster } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import s from './ResendLinkForm.module.scss'

export const ResendLinkForm = () => {
  const { t } = useTranslation()

  const router = useRouter()

  const email = Array.isArray(router.query.email) ? router.query.email[0] : router.query.email

  const { button, label, placeholder, successMessage } = t.confirmEmailPage.resendLinkForm

  const { control, handleSubmit, setError } = useForm<ResendLinkFields>({
    defaultValues: {
      email,
    },
    mode: 'onTouched',
    resolver: zodResolver(resendRegistrationEmailSchemeCreator(t.validation)),
  })

  const [resendRegistrationEmail, { isLoading }] = useResendRegistrationEmailMutation()

  const formHandler = handleSubmit(async data => {
    try {
      await resendRegistrationEmail(data).unwrap()
      toaster({
        text: `${successMessage} ${data.email}`,
      })
    } catch (e) {
      const errors = getErrorMessageData(e)

      setFormErrors({
        errors,
        fields: [...(Object.keys(data) as (keyof ResendLinkFields)[])],
        setError,
      })
    }
  })

  return (
    <>
      <form className={s.form} onSubmit={formHandler}>
        <ControlledTextField
          className={s.textField}
          control={control}
          label={label}
          name={'email'}
          placeholder={placeholder}
        />
        <Button className={s.button} isLoading={isLoading} type={'submit'}>
          {button}
        </Button>
      </form>
    </>
  )
}
