// validation constants:
export const MIN_USERNAME_LENGTH = 6
export const MAX_USERNAME_LENGTH = 30
export const MIN_NAME_LENGTH = 1
export const MAX_NAME_LENGTH = 50
export const MIN_PASSWORD_LENGTH = 6
export const MAX_PASSWORD_LENGTH = 20

// validation regex:
export const USERNAME_REGEX = /^[a-zA-Z0-9_-]*$/
export const NAME_REGEX = /^[a-zA-Zа-яА-Я\s]*$/
export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-.:;<=>?@[\]^_`{|}~])/

// Screens nax widths in px
export const MAX_SCREEN_WIDTH_MOBILE = 545
export const MAX_SCREEN_WIDTH_TABLET = 991
