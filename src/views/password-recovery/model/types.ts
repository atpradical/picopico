import { createNewPasswordSchemeCreator } from '@/views/password-recovery'
import { z } from 'zod'

export type CreatePWDFields = z.infer<ReturnType<typeof createNewPasswordSchemeCreator>>
