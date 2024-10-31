export type PostsState = {
  description: string
  dialogMeta: {
    currentStep: PostsStep
    isDialogOpen: boolean
    uploadError: string
  }
}

export enum PostsStep {
  Crop = 'CROP',
  Filters = 'FILTERS',
  Publish = 'PUBLISH',
  Start = 'START',
}
