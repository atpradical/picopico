import { LocaleValidation } from '@/locales/en'
import { aboutMeScheme, nameScheme, userNameScheme } from '@/shared/lib/validations'
import { z } from 'zod'

export const profileDataSchemeCreator = (t: LocaleValidation) => {
  return z.object({
    aboutMe: aboutMeScheme(t.aboutMe),
    city: z.string().min(1),
    country: z.string().min(1),
    dateOfBirth: z.string().min(1),
    firstName: nameScheme(t.name),
    lastName: nameScheme(t.name),
    userName: userNameScheme(t.userName),
  })
}
