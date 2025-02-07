import { LocaleValidation } from '@/locales/en'
import { createCustomErrorMap } from '@/shared/lib/custom-error-map'
import {
  confirmPasswordScheme,
  emailScheme,
  passwordScheme,
  userNameScheme,
} from '@/shared/lib/validations'
import { z } from 'zod'

export const signUpSchemeCreator = (t: LocaleValidation) => {
  // Create a custom errorMap
  const signUpErrorMap = createCustomErrorMap(t)

  // Set custom errorMap globally into Zod
  z.setErrorMap(signUpErrorMap)

  return z
    .object({
      TOS: z.boolean().default(false),
      confirmPassword: confirmPasswordScheme,
      email: emailScheme(t.email),
      password: passwordScheme(t.password),
      userName: userNameScheme(t.userName),
    })
    .refine(val => val.password === val.confirmPassword, {
      message: t.passwordsMatch,
      path: ['confirmPassword'],
    })
    .refine(val => val.TOS, {
      message: t.agreeToTerms,
      path: ['termsAgreement'],
    })
}
