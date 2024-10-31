import { postsDescriptionSchemeCreator } from '@/features/posts/model/posts-descriptioin-scheme-creator'
import { z } from 'zod'

export type PostsState = {
  description: string
  dialogMeta: {
    currentStep: PostsStep
    errorMessage: string
    isDialogOpen: boolean
  }
}

export type PostsDescriptionField = z.infer<ReturnType<typeof postsDescriptionSchemeCreator>>

export enum PostsStep {
  Crop = 'CROP',
  Filters = 'FILTERS',
  Publish = 'PUBLISH',
  Start = 'START',
}
