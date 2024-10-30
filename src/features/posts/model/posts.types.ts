import { postDescriptionSchemeCreator } from '@/features/posts/model/post-description-scheme-creator'
import { postDescriptionScheme } from '@/shared/lib/validations'
import { Nullable } from '@/shared/types'
import { z } from 'zod'

export type Post = {
  content: string
  id: string
  title: string
}

export type PostsState = {
  isOpen: boolean
  newPost: Nullable<File | string> // todo: заменить на массив постов
  postPreview: Nullable<string>
  step: PostCreationStep
  uploadingError: string
}

export enum PostCreationStep {
  Completed = 'COMPLETED',
  Cropping = 'CROPPING',
  Filtering = 'FILTERING',
  Idle = 'IDLE',
  Publishing = 'PUBLISHING',
  Selecting = 'SELECTING',
}

// form in create post feature
export type PostDescriptionFormFields = z.infer<ReturnType<typeof postDescriptionSchemeCreator>>
