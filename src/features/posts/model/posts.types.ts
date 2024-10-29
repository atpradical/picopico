import { Nullable } from '@/shared/types'

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

// export type PostCreationStep =
//   | 'COMPLETED'
//   | 'CROPPING'
//   | 'FILTERING'
//   | 'IDLE'
//   | 'PUBLISHING'
//   | 'SELECTING'

export enum PostCreationStep {
  Completed = 'COMPLETED',
  Cropping = 'CROPPING',
  Filtering = 'FILTERING',
  Idle = 'IDLE',
  Publishing = 'PUBLISHING',
  Selecting = 'SELECTING',
}
