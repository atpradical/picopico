import { createNewPasswordSchemeCreator } from '@/features/auth/model'
import { z } from 'zod'

export type CreatePWDFields = z.infer<ReturnType<typeof createNewPasswordSchemeCreator>>
