// validation constants:
export const MIN_USERNAME_LENGTH = 6
export const MAX_USERNAME_LENGTH = 30
export const MIN_NAME_LENGTH = 1
export const MAX_NAME_LENGTH = 50
export const MIN_PASSWORD_LENGTH = 6
export const MAX_PASSWORD_LENGTH = 20
export const MAX_ABOUT_ME_LENGTH = 200
export const MIN_USER_AGE = 13

// validation regex:
export const USERNAME_REGEX = /^[a-zA-Z0-9_-]*$/
export const NAME_REGEX = /^[a-zA-Zа-яА-Я0]*$/
export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-.:;<=>?@[\]^_`{|}~])/
export const ABOUT_ME_REGEX = /^[0-9a-zA-ZА-Яа-я!"#$%&'()*+,\-.:;<=>?@[\]^_`{|}~\s]*$/

// countriesApi constants: request for cities
export const MAX_CITY_POPULATION = 500000

// upload image limits
export const AVATAR_MAX_FILE_SIZE = 10000000 // 10MB in bytes
export const ALLOWED_IMAGE_UPLOAD_TYPES = ['image/jpeg', 'image/png']
