import { AppState } from '@/lib/store'

export const selectAvatarAllData = (state: AppState) => state.avatar

export const selectAvatarPreview = (state: AppState) => state.avatar.avatarPreview
