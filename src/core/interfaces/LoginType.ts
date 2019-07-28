export const LOGIN_TYPE = {
  EMAIL: 'EMAIL',
  PHONE_NO: 'PHONE_NO',
  FACEBOOK: 'FACEBOOK',
  GOOGLE: 'GOOGLE',
};

export type LoginType =
  | typeof LOGIN_TYPE.EMAIL
  | typeof LOGIN_TYPE.PHONE_NO
  | typeof LOGIN_TYPE.FACEBOOK
  | typeof LOGIN_TYPE.GOOGLE;
