import { signInSchemeCreator } from '@/views/sign-in'
import { z } from 'zod'

export type SignInFields = z.infer<ReturnType<typeof signInSchemeCreator>>
