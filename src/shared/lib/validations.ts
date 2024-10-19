import { LocaleValidationPassword, LocaleValidationUserName } from '@/locales/en'
import {
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from '@/shared/constants'
import { z } from 'zod'

export const userNameScheme = (args: LocaleValidationUserName) =>
  z
    .string()
    .trim()
    .min(MIN_USERNAME_LENGTH, { message: args.minLength })
    .max(MAX_USERNAME_LENGTH, { message: args.maxLength })
    .regex(USERNAME_REGEX, {
      message: args.allowedSymbols,
    })

export const emailScheme = (message: string) => z.string().email({ message }).toLowerCase()

export const passwordScheme = (args: LocaleValidationPassword) =>
  z
    .string()
    .trim()
    .regex(/^\S*$/, { message: args.noWhiteSpace })
    .min(MIN_PASSWORD_LENGTH, { message: args.minLength })
    .max(MAX_PASSWORD_LENGTH, { message: args.maxLength })
    .refine(value => PASSWORD_REGEX.test(value), {
      message: args.mustContain,
    })

export const confirmPasswordScheme = z.string().trim()

export const recaptchaScheme = (message: string) => {
  return z.string().min(1, message)
}
