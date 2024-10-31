import { MIN_USER_AGE } from '@/features/profile/config'
import { LocaleValidation } from '@/locales/en'
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
      dateOfBirth: z.date(),
      firstName: nameScheme(t.name),
      lastName: nameScheme(t.name),
      userName: userNameScheme(t.userName),
    })
    .refine(
      val => {
        if (val.dateOfBirth) {
          const isOldEnough =
            new Date().getFullYear() - new Date(val.dateOfBirth).getFullYear() >= MIN_USER_AGE

          if (!isOldEnough) {
            toaster(
              {
                text: (
                  <PrivacyPolicyNotification
                    linkText={t.minAge.linkLabel}
                    notificationMessage={t.minAge.notification}
                  />
                ),
                variant: 'error',
              },
              // add autoClose delay and toastID to avoid toast duplicates in case of multiple validation errors
              { autoClose: 8000, toastId: 'user-age-validation' }
            )

            return isOldEnough
          }
        }

        return true
      },
      {
        message: t.minAge.formField,
        path: ['dateOfBirth'],
      }
    )
}
