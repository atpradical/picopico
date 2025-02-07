import { useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { SignUpFields, signUpSchemeCreator } from '@/features/auth/model'
import { TermsAgreementLabel } from '@/features/auth/ui'
import { useCreateUserMutation } from '@/services/auth'
import { useCheckPasswordsMatch, useTranslation } from '@/shared/hooks'
import { EmailConfirmationDialog } from '@/shared/ui/components'
import { ControlledCheckbox, ControlledTextField } from '@/shared/ui/form-components'
import { getErrorMessageData, setFormErrors } from '@/shared/utils'
import { Button } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './SignUpFrom.module.scss'

export const SignUpForm = () => {
  const { t } = useTranslation()

  const [showDialog, setShowDialog] = useState(false)
  const emailRef = useRef('')
  const [createUser, { isLoading }] = useCreateUserMutation()

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
            label={t.signUpPage.signUpForm.labels.name}
            name={'userName'}
            placeholder={t.signUpPage.signUpForm.placeholders.addUsername}
          />
          <ControlledTextField
            control={control}
            label={t.signUpPage.signUpForm.labels.email}
            name={'email'}
            placeholder={t.signUpPage.signUpForm.placeholders.addEmail}
          />
          <ControlledTextField
            control={control}
            label={t.signUpPage.signUpForm.labels.password}
            name={'password'}
            placeholder={t.signUpPage.signUpForm.placeholders.createPassword}
            variant={'password'}
          />
          <ControlledTextField
            control={control}
            label={t.signUpPage.signUpForm.labels.confirmPassword}
            name={'confirmPassword'}
            placeholder={t.signUpPage.signUpForm.placeholders.repeatPassword}
            variant={'password'}
          />
        </div>
        <ControlledCheckbox
          control={control}
          label={
            <TermsAgreementLabel
              policy={t.signUpPage.signUpForm.policy}
              terms={t.signUpPage.signUpForm.terms}
              termsAgreement={t.signUpPage.signUpForm.termsAgreement}
            />
          }
          name={'TOS'}
        />
        <Button
          className={s.submitButton}
          disabled={isSubmitDisabled}
          isLoading={isLoading}
          type={'submit'}
        >
          {t.signUpPage.signUpForm.submitButton}
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
