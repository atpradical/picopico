import { z } from 'zod'

import { createNewPasswordSchemeCreator } from './create-new-password-scheme-creator'

export type CreatePWDFields = z.infer<ReturnType<typeof createNewPasswordSchemeCreator>>
