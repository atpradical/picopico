import { profileDataSchemeCreator } from '@/views/profile/model/profile-data-scheme-creator'
import { z } from 'zod'

export type ProfileFormFields = z.infer<ReturnType<typeof profileDataSchemeCreator>>
