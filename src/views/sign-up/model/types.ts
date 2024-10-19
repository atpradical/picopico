import { signUpSchemeCreator } from '@/views/sign-up/model/sign-up-scheme-creator'
import { z } from 'zod'

export type SignUpFields = z.infer<ReturnType<typeof signUpSchemeCreator>>
