import { signInSchemeCreator } from '@/features/auth/model'
import { z } from 'zod'

export type SignInFields = z.infer<ReturnType<typeof signInSchemeCreator>>
