import { LocaleValidation } from '@/locales/en'
import { createCustomErrorMap } from '@/shared/lib/custom-error-map'
import { emailScheme } from '@/shared/lib/validations'
import { z } from 'zod'

export const signInSchemeCreator = (t: LocaleValidation) => {
  const signInErrorMap = createCustomErrorMap(t)

  z.setErrorMap(signInErrorMap)

  return z.object({
    email: emailScheme(t.email),
    password: z.string(),
  })
}
