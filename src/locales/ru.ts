import { LocaleType } from '@/locales/en'
import { confirmEmailPage } from '@/locales/ru/confirm-email-page'
import { emailConfirmationDialog } from '@/locales/ru/email-confirmation-dialog'
import { forgotPasswordPage } from '@/locales/ru/forgot-password-page'
import { logoutDialog } from '@/locales/ru/logout-dialog'
import { passwordRecoveryForm } from '@/locales/ru/password-recovery-form'
import { privacyPolicyPage } from '@/locales/ru/privacy-policy-page'
import { signInPage } from '@/locales/ru/sign-in-page'
import { signUpPage } from '@/locales/ru/sign-up-page'
import { termsOfServicePage } from '@/locales/ru/terms-of-service-page'
import { validation } from '@/locales/ru/validation'

export const ru: LocaleType = {
  confirmEmailPage: confirmEmailPage,
  emailConfirmationDialog: emailConfirmationDialog,
  forgotPasswordPage: forgotPasswordPage,
  language: {
    en: 'Английский',
    ru: ' Русский',
  },
  logoutDialog: logoutDialog,
  passwordRecoveryForm: passwordRecoveryForm,
  privacyPolicyPage: privacyPolicyPage,
  signInPage: signInPage,
  signUpPage: signUpPage,
  termsOfServicePage: termsOfServicePage,
  validation: validation,
}
