import { Nullable } from '@/shared/types'

export type ResponseGetMyProfile = {
  aboutMe: Nullable<string>
  avatars: AvatarsData[]
  city: Nullable<string>
  country: Nullable<string>
  createdAt: string
  dateOfBirth: Nullable<string>
  firstName: Nullable<string>
  id: number
  lastName: Nullable<string>
  region: Nullable<string>
  userName: string
}
export type AvatarsData = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type UpdateMyProfileArgs = {
  aboutMe?: string
  city?: string
  country?: string
  dateOfBirth?: string
  firstName?: string
  lastName?: string
  region?: string
  userName?: string
}

export type UploadAvatarArgs = {
  file: Nullable<File>
}
