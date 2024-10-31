import { postDescriptionScheme } from '@/shared/lib/validations'
import { z } from 'zod'

export const postsDescriptionSchemeCreator = (message: string) => {
  return z.object({
    description: postDescriptionScheme(message),
  })
}
