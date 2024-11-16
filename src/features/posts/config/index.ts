export const POSTS_MAX_FILE_SIZE = 20000000 // 20MB in bytes
export const POSTS_ALLOWED_UPLOAD_TYPES = ['image/jpeg', 'image/png']
export const POSTS_DESCRIPTION_MAX_LENGTH = 500
export const POSTS_FILES_LIMIT = 10
export const POSTS_INITIAL_PAGE_NUMBER = 1
export const POSTS_MAX_PAGE_SIZE = 8

export enum PostFilter {
  clarendon = 'Clarendon',
  gingham = 'Gingham',
  lark = 'Lark',
  moon = 'Moon',
  original = 'Normal',
  sepia = 'Sepia',
}

export const FILTERS_LIST = [
  PostFilter.original,
  PostFilter.clarendon,
  PostFilter.lark,
  PostFilter.gingham,
  PostFilter.sepia,
  PostFilter.moon,
]

export enum PostAspect {
  landscape = '16:9',
  original = 'original',
  portrait = '4:5',
  square = '1:1',
}
