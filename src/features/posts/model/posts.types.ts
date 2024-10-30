import { Nullable } from '@/shared/types'

export type Post = {
  content: Nullable<File | string>
  description: string
  id: string
}

export type PostsState = {
  description: string
  isOpen: boolean
  newPost: Nullable<File> // todo: заменить на массив постов
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
