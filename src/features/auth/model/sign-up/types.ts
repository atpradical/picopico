import { signUpSchemeCreator } from '@/features/auth/model/sign-up/sign-up-scheme-creator'
import { z } from 'zod'

export type SignUpFields = z.infer<ReturnType<typeof signUpSchemeCreator>>
