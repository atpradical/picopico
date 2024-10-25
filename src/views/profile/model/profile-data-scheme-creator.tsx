import { LocaleValidation } from '@/locales/en'
import { MIN_USER_AGE } from '@/shared/constants'
import { aboutMeScheme, nameScheme, userNameScheme } from '@/shared/lib/validations'
import { PrivacyPolicyNotification } from '@/views/profile/ui/privacy-policy-notification'
import { toaster } from '@atpradical/picopico-ui-kit'
import { z } from 'zod'

export const profileDataSchemeCreator = (t: LocaleValidation) => {
  return z
    .object({
      aboutMe: aboutMeScheme(t.aboutMe),
      city: z.string(),
      country: z.string(),
      dateOfBirth: z.any(),
      firstName: nameScheme(t.name),
      lastName: nameScheme(t.name),
      userName: userNameScheme(t.userName),
    })
    .refine(
      val => {
        const result =
          new Date().getFullYear() - new Date(val.dateOfBirth).getFullYear() >= MIN_USER_AGE

        if (!result) {
          toaster({
            text: (
              <PrivacyPolicyNotification
                linkText={t.minAge.linkLabel}
                notificationMessage={t.minAge.notification}
              />
            ),
            variant: 'error',
          })
        }

        return result
      },
      {
        message: t.minAge.formField,
        path: ['dateOfBirth'],
      }
    )
}
