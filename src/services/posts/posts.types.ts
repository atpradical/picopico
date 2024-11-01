import { Nullable } from '@/shared/types'

export type CreatePostArgs = {
  childrenMetadata: ChildrenMetaData[]
  description: string
}

export type ChildrenMetaData = {
  uploadId: string
}

export type CreatePostResponse = {
  createdAt: string
  description: string
  id: number
  images: ResponseImagesData[]
  isLiked: boolean
  likesCount: number
  location?: any
  owner: OwnerData
  ownerId: number
  updatedAt: string
  userName: string
}

export type ResponseImagesData = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type OwnerData = {
  firstName?: any
  lastName?: any
}

export type CreatePostImageArgs = {
  file: Nullable<File[]>
}

export type CreatePostImageResponse = {
  images: ImagesData[]
}
export type ImagesData = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
