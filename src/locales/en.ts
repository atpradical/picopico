import { confirmEmailPage } from '@/locales/en/confirm-email-page'
import { createNewPasswordForm } from '@/locales/en/create-new-password-form'
import { deleteAvatarDialog } from '@/locales/en/delete-avatar-dialog'
import { emailConfirmationDialog } from '@/locales/en/email-confirmation-dialog'
import { expiredLink } from '@/locales/en/expired-link'
import { forgotPasswordPage } from '@/locales/en/forgot-password-page'
import { logoutDialog } from '@/locales/en/logout-dialog'
import { privacyPolicyPage } from '@/locales/en/privacy-policy-page'
import { profileAvatarDialog } from '@/locales/en/profile-avatar-dialog'
import { profileSettings } from '@/locales/en/profile-settings'
import { signInPage } from '@/locales/en/sign-in-page'
import { signUpPage } from '@/locales/en/sign-up-page'
import { termsOfServicePage } from '@/locales/en/terms-of-service-page'
import { validation } from '@/locales/en/validation'
import { ProfileAvatarDialog } from '@/views/profile/ui'

export type LocaleType = typeof en
export type LocaleValidation = typeof en.validation
export type LocaleValidationUserName = typeof en.validation.userName
export type LocaleValidationName = typeof en.validation.name
export type LocaleValidationAboutMe = typeof en.validation.aboutMe
export type LocaleValidationPassword = typeof en.validation.password
export type LocaleEmailConfirmationDialog = typeof en.emailConfirmationDialog
export type LocaleEmailConfirmed = typeof en.confirmEmailPage.emailConfirmed
export type LocaleLinkExpired = typeof en.expiredLink
export type LocaleCreateNewPasswordForm = typeof en.createNewPasswordForm

export const en = {
  confirmEmailPage: confirmEmailPage,
  createNewPasswordForm: createNewPasswordForm,
  deleteAvatarDialog: deleteAvatarDialog,
  emailConfirmationDialog: emailConfirmationDialog,
  expiredLink: expiredLink,
  forgotPasswordPage: forgotPasswordPage,
  language: {
    en: 'English',
    ru: ' Russian',
  },
  logoutDialog: logoutDialog,
  privacyPolicyPage: privacyPolicyPage,
  profileAvatarDialog: profileAvatarDialog,
  profileSettings: profileSettings,
  signInPage: signInPage,
  signUpPage: signUpPage,
  termsOfServicePage: termsOfServicePage,
  validation: validation,
}
