export const MAX_BADGE_COUNT = 99;

// validation constants:
export const MIN_USERNAME_LENGTH = 6;
export const MAX_USERNAME_LENGTH = 30;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 20;

export const USERNAME_REGEX = /^[a-zA-Z0-9_-]*$/;

export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-.:;<=>?@[\]^_`{|}~])/;

// api constants:
export const INCTAGRAM_BASE_URL = process.env.NEXT_PUBLIC_INCTAGRAM_BASE_URL;
