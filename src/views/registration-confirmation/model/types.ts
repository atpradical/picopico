import { resendRegistrationEmailSchemeCreator } from '@/views/registration-confirmation/model/resend-registration-email-scheme-creator'
import { z } from 'zod'

export type ResendLinkFields = z.infer<ReturnType<typeof resendRegistrationEmailSchemeCreator>>
