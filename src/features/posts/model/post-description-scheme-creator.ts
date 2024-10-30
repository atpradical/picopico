import { LocaleValidation } from '@/locales/en'
import { postDescriptionScheme } from '@/shared/lib/validations'
import { z } from 'zod'

export const postDescriptionSchemeCreator = (t: LocaleValidation) => {
  return z.object({
    description: postDescriptionScheme(t.postDescription.maxLength),
  })
}
