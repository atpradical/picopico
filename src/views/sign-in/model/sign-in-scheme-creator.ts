import { LocaleValidation } from '@/locales/en'
import { emailScheme } from '@/shared/lib/validations'
import { z } from 'zod'

export const signInSchemeCreator = (t: LocaleValidation) => {
  return z.object({
    email: emailScheme(t.email),
    password: z.string(),
  })
}
