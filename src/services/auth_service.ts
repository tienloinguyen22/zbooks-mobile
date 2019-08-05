import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth, { Auth } from '@react-native-firebase/auth';
import { User, LoginType } from '@app/core';
import { GoogleSignin } from 'react-native-google-signin';

interface LoginResultSuccess {
  isSuccessful: true;
  user: User;
}

interface LoginResultFail {
  isSuccessful: false;
  isCancelled: boolean;
  errorMessage: string;
}

export type LoginResult = LoginResultSuccess | LoginResultFail;

const FACEBOOK_PROVIDER_ID = 'facebook.com';
const GOOGLE_PROVIDER_ID = 'google.com';

const getUser = (user: Auth.User): User => {
  const avatarUrl =
    user.photoURL && user.photoURL.indexOf('facebook') > -1 ? `${user.photoURL}?height=500` : user.photoURL;
  let loginType: LoginType = 'EMAIL';
  if (user.providerData && user.providerData.length > 0) {
    if (user.providerData[0].providerId === FACEBOOK_PROVIDER_ID) {
      loginType = 'FACEBOOK';
    } else if (user.providerData[0].providerId === GOOGLE_PROVIDER_ID) {
      loginType = 'GOOGLE';
    }
  }
  return {
    id: user.uid,
    displayName: user.displayName || undefined,
    avatarUrl: avatarUrl || undefined,
    isLoggedIn: true,
    email: user.email || undefined,
    emailVerified: user.emailVerified,
    loginType,
  };
};

const loginFacebook = async (): Promise<LoginResult> => {
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  if (result.isCancelled) {
    return {
      isSuccessful: false,
      isCancelled: true,
      errorMessage: '',
    };
  }
  // get the access token
  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    // handle this however suites the flow of your app
    throw new Error('Something went wrong obtaining the users access token');
  }
  const credential = await auth.FacebookAuthProvider.credential(data.accessToken);
  const { user } = await auth().signInWithCredential(credential);
  return {
    user: getUser(user),
    isSuccessful: true,
  };
};

const loginGoogle = async (): Promise<LoginResult> => {
  try {
    await GoogleSignin.signIn();
    const { idToken, accessToken } = await GoogleSignin.getTokens();
    const credential = auth.GoogleAuthProvider.credential(idToken, accessToken);
    const { user } = await auth().signInWithCredential(credential);
    return {
      user: getUser(user),
      isSuccessful: true,
    };
  } catch (error) {
    if (
      error.message.indexOf('The user canceled the sign in request') > -1 ||
      error.message.indexOf('Sign in action cancelled') > -1
    ) {
      return {
        isSuccessful: false,
        isCancelled: true,
        errorMessage: '',
      };
    }
    throw error;
  }
};

const createUserWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  const { user } = await auth().createUserWithEmailAndPassword(email, password);
  await user.updateProfile({
    displayName: user.email || '',
  });
  await user.reload();
  await user.sendEmailVerification();
  return getUser(user);
};

const signInWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  const { user } = await auth().signInWithEmailAndPassword(email, password);
  return getUser(user);
};

const isEmailRegistered = async (email: string): Promise<boolean> => {
  try {
    await auth().signInWithEmailAndPassword(email, ' ');
  } catch (error) {
    if (error.code !== 'auth/user-not-found') {
      return true;
    }
    if (!error.code) {
      throw error;
    }
  }
  return false;
};

const isEmailVerified = async (): Promise<boolean> => {
  const currentUser = await auth().currentUser;
  if (!currentUser) {
    return false;
  }
  await currentUser.reload();
  return currentUser.emailVerified;
};

const getCurrentUser = (): User | undefined => {
  const { currentUser } = auth();
  if (!currentUser) {
    return undefined;
  }
  return getUser(currentUser);
};

const logout = async (): Promise<void> => {
  const user = auth().currentUser;
  if (!user) {
    return;
  }

  if (
    user.providerData &&
    user.providerData.length > 0 &&
    user.providerData[0].providerId === 'google.com' &&
    (await GoogleSignin.isSignedIn())
  ) {
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  }
  await auth().signOut();
};

const resendVerificationEmail = async (): Promise<void> => {
  const user = auth().currentUser;
  if (!user) {
    return;
  }
  await user.sendEmailVerification();
};

const changePassword = async (newPassword: string): Promise<void> => {
  const user = auth().currentUser;
  if (!user) {
    return;
  }
  await user.updatePassword(newPassword);
};

export const authService = {
  loginFacebook,
  loginGoogle,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  isEmailRegistered,
  isEmailVerified,
  getCurrentUser,
  logout,
  resendVerificationEmail,
  changePassword,
};
