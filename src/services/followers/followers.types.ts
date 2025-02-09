import { Nullable } from '@/shared/types'

export type FollowArgs = {
  selectedUserId: number
}
export type UnfollowArgs = {
  userId: number
}

export type GetUserProfileByUserNameWithFollowInfoArgs = {
  userName: string
}

export type Avatars = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type GetUserProfileByUserNameWithFollowInfoResponse = {
  aboutMe: Nullable<string>
  avatars: Avatars[]
  city: Nullable<string>
  country: Nullable<string>
  dateOfBirth: Nullable<string>
  firstName: Nullable<string>
  followersCount: number
  followingCount: number
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  lastName: Nullable<string>
  publicationsCount: number
  region: Nullable<string>
  userName: string
}
