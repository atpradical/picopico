import { LocaleType } from '@/locales/en'
import { confirmEmailPage } from '@/locales/ru/confirm-email-page'
import { createNewPasswordForm } from '@/locales/ru/create-new-password-form'
import { emailConfirmationDialog } from '@/locales/ru/email-confirmation-dialog'
import { expiredLink } from '@/locales/ru/expired-link'
import { forgotPasswordPage } from '@/locales/ru/forgot-password-page'
import { logoutDialog } from '@/locales/ru/logout-dialog'
import { privacyPolicyPage } from '@/locales/ru/privacy-policy-page'
import { profileSettings } from '@/locales/ru/profile-settings'
import { signInPage } from '@/locales/ru/sign-in-page'
import { signUpPage } from '@/locales/ru/sign-up-page'
import { termsOfServicePage } from '@/locales/ru/terms-of-service-page'
import { validation } from '@/locales/ru/validation'

export const ru: LocaleType = {
  confirmEmailPage: confirmEmailPage,
  createNewPasswordForm: createNewPasswordForm,
  emailConfirmationDialog: emailConfirmationDialog,
  expiredLink: expiredLink,
  forgotPasswordPage: forgotPasswordPage,
  language: {
    en: 'Английский',
    ru: ' Русский',
  },
  logoutDialog: logoutDialog,
  privacyPolicyPage: privacyPolicyPage,
  profileSettings: profileSettings,
  signInPage: signInPage,
  signUpPage: signUpPage,
  termsOfServicePage: termsOfServicePage,
  validation: validation,
}
