import { useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { useCreateUserMutation } from '@/shared/api/auth/auth.api'
import { useTranslation } from '@/shared/hooks'
import { useCheckPasswordsMatch } from '@/shared/hooks/useCheckPasswordsMatch'
import { EmailConfirmationDialog } from '@/shared/ui/components'
import { ControlledCheckbox, ControlledTextField } from '@/shared/ui/form-components'
import { getErrorMessageData } from '@/shared/utils'
import { setFormErrors } from '@/shared/utils/set-form-errors'
import { SignUpFields, TermsAgreementLabel, signUpSchemeCreator } from '@/views/sign-up'
import { Button } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './SignUpFrom.module.scss'

export const SignUpForm = () => {
  const { t } = useTranslation()
  const { labels, placeholders, policy, submitButton, terms, termsAgreement } =
    t.signUpPage.signUpForm

  const [showDialog, setShowDialog] = useState(false)
  const emailRef = useRef('')
  const [createUser] = useCreateUserMutation()

  const {
    control,
    formState: { isDirty, isValid },
    handleSubmit,
    reset,
    setError,
  } = useForm<SignUpFields>({
    defaultValues: {
      TOS: false,
      confirmPassword: '',
      email: '',
      password: '',
      userName: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpSchemeCreator(t.validation)),
  })

  const password = useWatch({ control, name: 'password' })
  const confirmPassword = useWatch({ control, name: 'confirmPassword' })

  useCheckPasswordsMatch({
    confirmPassword,
    password,
    setError,
    validationMessage: t.validation.passwordsMatch,
  })

  const isSubmitDisabled = !isValid || !isDirty

  const formHandler = handleSubmit(async data => {
    emailRef.current = ''
    try {
      await createUser(data).unwrap()
      emailRef.current = data.email
      setShowDialog(true)
      reset()
    } catch (e) {
      const errors = getErrorMessageData(e)

      setFormErrors({
        errors,
        fields: [...(Object.keys(data) as (keyof SignUpFields)[])],
        setError,
      })
    }
  })

  return (
    <>
      <form className={s.form} onSubmit={formHandler}>
        <div className={s.textFieldContainer}>
          <ControlledTextField
            control={control}
            label={labels.name}
            name={'userName'}
            placeholder={placeholders.addUsername}
          />
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
            placeholder={placeholders.createPassword}
            variant={'password'}
          />
          <ControlledTextField
            control={control}
            label={labels.confirmPassword}
            name={'confirmPassword'}
            placeholder={placeholders.repeatPassword}
            variant={'password'}
          />
        </div>
        <ControlledCheckbox
          control={control}
          label={
            <TermsAgreementLabel policy={policy} terms={terms} termsAgreement={termsAgreement} />
          }
          name={'TOS'}
        />
        <Button disabled={isSubmitDisabled} type={'submit'}>
          {submitButton}
        </Button>
      </form>
      <EmailConfirmationDialog
        email={emailRef.current}
        isOpen={showDialog}
        onOpenChange={setShowDialog}
        t={t.emailConfirmationDialog}
      />
    </>
  )
}
