import { Auth } from '@react-native-firebase/auth';
import { CurrentUserState } from '@app/store';
import { LOGIN_TYPE } from '../interfaces/LoginType';

const FACEBOOK_PROVIDER_ID = 'facebook.com';
const GOOGLE_PROVIDER_ID = 'google.com';
const getUser = (user: Auth.User): CurrentUserState => {
  const avatarUrl =
    user.photoURL && user.photoURL.indexOf('facebook') > -1 ? `${user.photoURL}?height=500` : user.photoURL;
  let loginType = LOGIN_TYPE.EMAIL;
  if (user.providerData && user.providerData.length > 0) {
    if (user.providerData[0].providerId === FACEBOOK_PROVIDER_ID) {
      loginType = LOGIN_TYPE.FACEBOOK;
    } else if (user.providerData[0].providerId === GOOGLE_PROVIDER_ID) {
      loginType = LOGIN_TYPE.GOOGLE;
    }
  }
  return {
    id: user.uid,
    displayName: user.displayName || undefined,
    avatarUrl: avatarUrl || undefined,
    isLoggedIn: true,
    emailVerified: user.emailVerified,
    loginType,
  };
};

export const firebase = { getUser };
