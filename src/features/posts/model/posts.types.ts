import { Nullable } from '@/shared/types'

export type PostsState = {
  description: string
  dialogMeta: {
    currentStep: PostCreationStep
    isDialogOpen: boolean
    uploadError: string
  }
  imagesList: File[]
  postPreview: Nullable<string> // todo: заменить на массив постов previewList
}

export enum PostCreationStep {
  Completed = 'COMPLETED',
  Cropping = 'CROPPING',
  Filtering = 'FILTERING',
  Idle = 'IDLE',
  Publishing = 'PUBLISHING',
  Selecting = 'SELECTING',
}
