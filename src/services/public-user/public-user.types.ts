import { GetPostsResponse } from '@/services/posts'
import { SortDirection } from '@/shared/enums'

export type GetCurrentUsersAmountResponse = {
  totalCount: number
}

export type GetPublicPostsAllArgs = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
}

export type GetPublicPostsAllResponse = GetPostsResponse
