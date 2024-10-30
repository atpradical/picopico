import { Nullable } from '@/shared/types'

export type PostsState = {
  description: string
  dialogMeta: {
    currentStep: PostsStep
    isDialogOpen: boolean
    uploadError: string
  }
  imagesList: File[]
  postPreview: Nullable<string> // todo: заменить на массив постов previewList
}

export enum PostsStep {
  Crop = 'CROP',
  Filters = 'FILTERS',
  Publish = 'PUBLISH',
  Start = 'START',
}
