import { resendRegistrationEmailSchemeCreator } from '@/features/auth/model'
import { z } from 'zod'

export type ResendLinkFields = z.infer<ReturnType<typeof resendRegistrationEmailSchemeCreator>>
