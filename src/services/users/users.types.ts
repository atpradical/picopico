import { AvatarsData } from '@/services/profile'
import { Nullable } from '@/shared/types'

export type GetAllUsersArgs = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
}

export type User = {
  avatars: AvatarsData[]
  createdAt: string
  firstName?: Nullable<string>
  id: number
  lastName?: Nullable<string>
  userName: string
}

export type GetAllUsersResponse = {
  items: User[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
