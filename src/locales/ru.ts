import { LocaleType } from '@/locales/en'
import { confirmEmailPage } from '@/locales/ru/confirm-email-page'
import { createNewPasswordForm } from '@/locales/ru/create-new-password-form'
import { createPostDialog } from '@/locales/ru/create-post-dialog'
import { deleteAvatarDialog } from '@/locales/ru/delete-avatar-dialog'
import { emailConfirmationDialog } from '@/locales/ru/email-confirmation-dialog'
import { expiredLink } from '@/locales/ru/expired-link'
import { forgotPasswordPage } from '@/locales/ru/forgot-password-page'
import { logoutDialog } from '@/locales/ru/logout-dialog'
import { privacyPolicyPage } from '@/locales/ru/privacy-policy-page'
import { profileAvatarDialog } from '@/locales/ru/profile-avatar-dialog'
import { profileSettings } from '@/locales/ru/profile-settings'
import { signInPage } from '@/locales/ru/sign-in-page'
import { signUpPage } from '@/locales/ru/sign-up-page'
import { termsOfServicePage } from '@/locales/ru/terms-of-service-page'
import { validation } from '@/locales/ru/validation'

export const ru: LocaleType = {
  appHeader: {
    signInButton: 'Войти',
    signUpButton: 'Зарегистрироваться',
  },
  appSidebar: {
    createButton: 'Создать',
    favouritesLink: 'Избранное',
    homeLink: 'Главная',
    logOutButton: 'Выйти',
    messagesLink: 'Сообщения',
    profileLink: 'Профиль',
    searchButton: 'Поиск',
    statisticsLink: 'Статистика',
  },
  confirmEmailPage: confirmEmailPage,
  createNewPasswordForm: createNewPasswordForm,
  createPostDialog: createPostDialog,
  deleteAvatarDialog: deleteAvatarDialog,
  emailConfirmationDialog: emailConfirmationDialog,
  expiredLink: expiredLink,
  forgotPasswordPage: forgotPasswordPage,
  language: {
    en: 'Английский',
    ru: ' Русский',
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
