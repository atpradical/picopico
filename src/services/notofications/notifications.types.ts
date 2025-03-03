export type GetNotificationsArgs = {
  cursor?: number
  isRead?: boolean
  pageSize?: number
  sortBy?: string
  sortDirection?: string
}

export type GetNotificationsResponse = {
  items: NotificationType[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type NotificationType = {
  createdAt: string
  id: number
  isRead: boolean
  message: string
}

export type DeleteNotificationArgs = {
  id: number
}

export type MarkNotificationAsReadArgs = {
  ids: number[]
}
