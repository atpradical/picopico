import { LocaleValidation } from '@/locales/en'
import { aboutMeScheme, nameScheme, userNameScheme } from '@/shared/lib/validations'
import { z } from 'zod'

export const profileDataSchemeCreator = (t: LocaleValidation) => {
  return z.object({
    aboutMe: aboutMeScheme(t.aboutMe),
    city: z.string(),
    country: z.string(),
    dateOfBirth: z.any(),
    firstName: nameScheme(t.name),
    lastName: nameScheme(t.name),
    userName: userNameScheme(t.userName),
  })
}
