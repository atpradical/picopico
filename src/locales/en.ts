import { confirmEmailPage } from '@/locales/en/confirm-email-page'
import { forgotPasswordPage } from '@/locales/en/forgot-password-page'
import { logoutDialog } from '@/locales/en/logout-dialog'
import { passwordRecoveryForm } from '@/locales/en/password-recovery-form'
import { privacyPolicyPage } from '@/locales/en/privacy-policy-page'
import { signInPage } from '@/locales/en/sign-in-page'
import { signUpPage } from '@/locales/en/sign-up-page'
import { termsOfServicePage } from '@/locales/en/terms-of-service-page'
import { validation } from '@/locales/en/validation'

export type LocaleType = typeof en
export type LocaleValidation = typeof en.validation
export type LocaleValidationUserName = typeof en.validation.userName
export type LocaleValidationPassword = typeof en.validation.password
export type LocaleEmailSentDialog = typeof en.signUpPage.signUpForm.emailSentDialog
export type LocaleEmailConfirmed = typeof en.confirmEmailPage.emailConfirmed
export type LocaleLinkExpired = typeof en.confirmEmailPage.linkExpired
export type LocaleLogoutDialog = typeof en.logoutDialog

export const en = {
  confirmEmailPage: confirmEmailPage,
  forgotPasswordPage: forgotPasswordPage,
  language: {
    en: 'English',
    ru: ' Russian',
  },
  logoutDialog: logoutDialog,
  passwordRecoveryForm: passwordRecoveryForm,
  privacyPolicyPage: privacyPolicyPage,
  signInPage: signInPage,
  signUpPage: signUpPage,
  termsOfServicePage: termsOfServicePage,
  validation: validation,
}
