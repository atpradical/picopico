import { LocaleValidation } from '@/locales/en'
import { emailScheme, recaptchaScheme } from '@/shared/lib/validations'
import { z } from 'zod'

export const forgotPasswordSchemeCreator = (t: LocaleValidation) => {
  return z.object({
    email: emailScheme(t.email),
    recaptcha: recaptchaScheme(t.recaptcha),
  })
}
