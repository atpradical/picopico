import { confirmEmailPage } from '@/locales/en/confirm-email-page'
import { createNewPasswordForm } from '@/locales/en/create-new-password-form'
import { emailConfirmationDialog } from '@/locales/en/email-confirmation-dialog'
import { expiredLink } from '@/locales/en/expired-link'
import { forgotPasswordPage } from '@/locales/en/forgot-password-page'
import { logoutDialog } from '@/locales/en/logout-dialog'
import { privacyPolicyPage } from '@/locales/en/privacy-policy-page'
import { signInPage } from '@/locales/en/sign-in-page'
import { signUpPage } from '@/locales/en/sign-up-page'
import { termsOfServicePage } from '@/locales/en/terms-of-service-page'
import { validation } from '@/locales/en/validation'

export type LocaleType = typeof en
export type LocaleValidation = typeof en.validation
export type LocaleValidationUserName = typeof en.validation.userName
export type LocaleValidationPassword = typeof en.validation.password
export type LocaleEmailConfirmationDialog = typeof en.emailConfirmationDialog
export type LocaleEmailConfirmed = typeof en.confirmEmailPage.emailConfirmed
export type LocaleLinkExpired = typeof en.expiredLink
export type LocaleLogoutDialog = typeof en.logoutDialog
export type LocaleCreateNewPasswordForm = typeof en.createNewPasswordForm

export const en = {
  confirmEmailPage: confirmEmailPage,
  createNewPasswordForm: createNewPasswordForm,
  emailConfirmationDialog: emailConfirmationDialog,
  expiredLink: expiredLink,
  forgotPasswordPage: forgotPasswordPage,
  language: {
    en: 'English',
    ru: ' Russian',
  },
  logoutDialog: logoutDialog,
  privacyPolicyPage: privacyPolicyPage,
  signInPage: signInPage,
  signUpPage: signUpPage,
  termsOfServicePage: termsOfServicePage,
  validation: validation,
}
