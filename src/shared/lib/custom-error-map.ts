import { LocaleValidation } from '@/locales/en'
import { ZodErrorMap, z } from 'zod'

export const createCustomErrorMap =
  (t: LocaleValidation): ZodErrorMap =>
  (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_type) {
      if (issue.expected === 'string' && issue.received === 'undefined') {
        return { message: t.requiredField }
      }
    }

    return { message: ctx.defaultError }
  }
