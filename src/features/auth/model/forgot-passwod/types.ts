import { forgotPasswordSchemeCreator } from '@/features/auth/model'
import { z } from 'zod'

export type ForgotPasswordFields = z.infer<ReturnType<typeof forgotPasswordSchemeCreator>>
