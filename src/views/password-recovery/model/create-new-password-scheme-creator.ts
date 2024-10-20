import { LocaleValidation } from '@/locales/en'
import { confirmPasswordScheme, passwordScheme } from '@/shared/lib/validations'
import { z } from 'zod'

export const createNewPasswordSchemeCreator = (t: LocaleValidation) => {
  return z
    .object({
      confirmPassword: confirmPasswordScheme,
      newPassword: passwordScheme(t.password),
    })
    .refine(val => val.newPassword === val.confirmPassword, {
      message: t.passwordsMatch,
      path: ['confirmPassword'],
    })
}
