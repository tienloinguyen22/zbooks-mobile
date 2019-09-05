import { authService } from '@app/services';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth, { Auth } from '@react-native-firebase/auth';
import { GoogleSignin } from 'react-native-google-signin';
import { ErrorWithCode } from '@app/core';

jest.mock('react-native-fbsdk', () => ({
  LoginManager: {
    logInWithPermissions: () => ({
      error: '',
      isCancelled: false,
    }),
  },
  AccessToken: {
    getCurrentAccessToken: async () => ({}),
  },
}));
jest.mock('react-native-google-signin', () => ({
  GoogleSignin: {
    getTokens: () => ({
      idToken: 'idToken',
      accessToken: 'accessToken',
    }),
    signIn: async () => {},
  },
}));
jest.mock('@react-native-firebase/auth', () => jest.fn());

describe('services/auth_service', () => {
  beforeEach(() => {
    auth.FacebookAuthProvider = {
      credential: (_token, _secret) => ({
        providerId: 'providerId',
        token: 'token',
        secret: 'secret',
      }),
      PROVIDER_ID: 'PROVIDER_ID',
    };
    auth.GoogleAuthProvider = {
      credential: (_token, _secret) => ({
        providerId: 'providerId',
        token: 'token',
        secret: 'secret',
      }),
      PROVIDER_ID: 'PROVIDER_ID',
    };
  });

  describe('loginFacebook', () => {
    it('runs succesfully', async () => {
      ((auth as unknown) as jest.Mock).mockReturnValue({
        signInWithCredential: () => ({
          user: {
            uid: 'uid',
            photoURL: 'facebook/photoURL',
            providerData: [
              {
                providerId: 'facebook.com',
              },
            ],
            displayName: 'displayName',
            email: '',
          },
        }),
      });

      const result = await authService.loginFacebook();

      expect(result).toMatchInlineSnapshot(`
                                Object {
                                  "isSuccessful": true,
                                  "user": Object {
                                    "avatarUrl": "facebook/photoURL?height=500",
                                    "displayName": "displayName",
                                    "email": undefined,
                                    "emailVerified": undefined,
                                    "id": "uid",
                                    "isLoggedIn": true,
                                    "loginType": "FACEBOOK",
                                  },
                                }
                        `);
    });

    it('runs succesfully with no display name', async () => {
      ((auth as unknown) as jest.Mock).mockReturnValue({
        signInWithCredential: () => ({
          user: {
            uid: 'uid',
            photoURL: 'facebook/photoURL',
            providerData: [
              {
                providerId: 'facebook.com',
              },
            ],
            displayName: '',
            email: '',
          },
        }),
      });

      const result = await authService.loginFacebook();

      expect(result).toMatchInlineSnapshot(`
        Object {
          "isSuccessful": true,
          "user": Object {
            "avatarUrl": "facebook/photoURL?height=500",
            "displayName": undefined,
            "email": undefined,
            "emailVerified": undefined,
            "id": "uid",
            "isLoggedIn": true,
            "loginType": "FACEBOOK",
          },
        }
      `);
    });

    it('runs then cancels', async () => {
      jest.spyOn(LoginManager, 'logInWithPermissions').mockImplementation(async () => {
        return {
          error: '',
          isCancelled: true,
        };
      });

      const result = await authService.loginFacebook();

      expect(result).toMatchInlineSnapshot(`
                Object {
                  "errorMessage": "",
                  "isCancelled": true,
                  "isSuccessful": false,
                }
            `);
    });

    it('runs without accessToken', async () => {
      jest.spyOn(LoginManager, 'logInWithPermissions').mockImplementation(async () => {
        return {
          error: '',
          isCancelled: false,
        };
      });
      jest.spyOn(AccessToken, 'getCurrentAccessToken').mockImplementation(async () => {
        // eslint-disable-next-line no-null/no-null
        return null;
      });

      let hasError = false;
      try {
        await authService.loginFacebook();
      } catch (error) {
        hasError = true;
        expect(error.message).toBe('Something went wrong obtaining the users access token');
      }

      expect(hasError).toBe(true);
    });
  });

  describe('loginGoogle', () => {
    it('runs succesfully', async () => {
      jest.spyOn(AccessToken, 'getCurrentAccessToken').mockImplementation(async () => {
        return ({} as unknown) as AccessToken;
      });
      ((auth as unknown) as jest.Mock).mockReturnValue({
        signInWithCredential: () => ({
          user: {
            uid: 'uid',
            photoURL: 'google/photoURL',
            providerData: [
              {
                providerId: 'google.com',
              },
            ],
            displayName: 'displayName',
            email: 'email',
          },
        }),
      });

      const result = await authService.loginGoogle();

      expect(result).toMatchInlineSnapshot(`
          Object {
            "isSuccessful": true,
            "user": Object {
              "avatarUrl": "google/photoURL",
              "displayName": "displayName",
              "email": "email",
              "emailVerified": undefined,
              "id": "uid",
              "isLoggedIn": true,
              "loginType": "GOOGLE",
            },
          }
        `);
    });

    it('runs then cancels', async () => {
      jest.spyOn(GoogleSignin, 'getTokens').mockImplementation(async () => {
        throw Error('The user canceled the sign in request');
      });
      ((auth as unknown) as jest.Mock).mockReturnValue({
        signInWithCredential: () => ({
          user: {
            uid: 'uid',
            photoURL: 'google/photoURL',
            providerData: [
              {
                providerId: 'google.com',
              },
            ],
            displayName: 'displayName',
            email: 'email',
          },
        }),
      });

      const result = await authService.loginGoogle();

      expect(result).toMatchInlineSnapshot(`
            Object {
              "errorMessage": "",
              "isCancelled": true,
              "isSuccessful": false,
            }
        `);
    });

    it('throws error', async () => {
      jest.spyOn(GoogleSignin, 'getTokens').mockImplementation(async () => {
        throw Error('Unknowx exception');
      });
      ((auth as unknown) as jest.Mock).mockReturnValue({
        signInWithCredential: () => ({
          user: {
            uid: 'uid',
            photoURL: 'google/photoURL',
            providerData: [
              {
                providerId: 'google.com',
              },
            ],
            displayName: 'displayName',
            email: 'email',
          },
        }),
      });

      let hasError = false;
      try {
        await authService.loginGoogle();
      } catch (error) {
        hasError = true;
      }

      expect(hasError).toBe(true);
    });
  });

  describe('createUserWithEmailAndPassword', () => {
    it('runs succesfully', async () => {
      const updateProfile = jest.fn();
      const reload = jest.fn();
      const sendEmailVerification = jest.fn();
      ((auth as unknown) as jest.Mock).mockReturnValue({
        createUserWithEmailAndPassword: () => ({
          user: {
            uid: 'uid',
            photoURL: 'google/photoURL',
            providerData: [
              {
                providerId: 'google.com',
              },
            ],
            displayName: 'displayName',
            email: 'email',
            updateProfile: async () => {
              updateProfile();
            },
            reload: async () => {
              reload();
            },
            sendEmailVerification: async () => {
              sendEmailVerification();
            },
          },
        }),
      });

      const email = 'email.com';
      const password = 'password';
      const user = await authService.createUserWithEmailAndPassword(email, password);

      expect(updateProfile).toBeCalledTimes(1);
      expect(reload).toBeCalledTimes(1);
      expect(sendEmailVerification).toBeCalledTimes(1);
      expect(user).toMatchInlineSnapshot(`
                                                                                Object {
                                                                                  "avatarUrl": "google/photoURL",
                                                                                  "displayName": "displayName",
                                                                                  "email": "email",
                                                                                  "emailVerified": undefined,
                                                                                  "id": "uid",
                                                                                  "isLoggedIn": true,
                                                                                  "loginType": "GOOGLE",
                                                                                }
                                                            `);
    });
  });

  describe('signInWithEmailAndPassword', () => {
    it('runs succesfully', async () => {
      ((auth as unknown) as jest.Mock).mockReturnValue({
        signInWithEmailAndPassword: (email: string, _password: string) => ({
          user: {
            uid: 'uid',
            photoURL: '',
            providerData: [
              {
                providerId: 'email',
              },
            ],
            displayName: '',
            email,
          },
        }),
      });

      const email = 'email.com';
      const password = 'password';
      const user = await authService.signInWithEmailAndPassword(email, password);

      expect(user).toMatchInlineSnapshot(`
                                        Object {
                                          "avatarUrl": undefined,
                                          "displayName": "email.com",
                                          "email": "email.com",
                                          "emailVerified": undefined,
                                          "id": "uid",
                                          "isLoggedIn": true,
                                          "loginType": "EMAIL",
                                        }
                              `);
    });
  });

  describe('isEmailRegistered', () => {
    it('returns true if user is found', async () => {
      ((auth as unknown) as jest.Mock).mockReturnValue({
        signInWithEmailAndPassword: (_email: string, _password: string) => {
          const error = (Error() as unknown) as ErrorWithCode;
          error.code = 'auth/wrong-password';
          throw error;
        },
      });

      const email = 'email.com';
      const isEmailRegistered = await authService.isEmailRegistered(email);

      expect(isEmailRegistered).toBe(true);
    });

    it('returns false if user not found', async () => {
      ((auth as unknown) as jest.Mock).mockReturnValue({
        signInWithEmailAndPassword: (_email: string, _password: string) => {
          const error = (Error() as unknown) as ErrorWithCode;
          error.code = 'auth/user-not-found';
          throw error;
        },
      });

      const email = 'email.com';
      const isEmailRegistered = await authService.isEmailRegistered(email);

      expect(isEmailRegistered).toBe(false);
    });

    it('throws error if getting other exceptions', async () => {
      ((auth as unknown) as jest.Mock).mockReturnValue({
        signInWithEmailAndPassword: (_email: string, _password: string) => {
          const error = (Error() as unknown) as ErrorWithCode;
          throw error;
        },
      });

      let hasError = false;
      try {
        const email = 'email.com';
        await authService.isEmailRegistered(email);
      } catch (error) {
        hasError = true;
      }

      expect(hasError).toBe(true);
    });
  });

  describe('isEmailVerified', () => {
    it('returns true if email is verified', async () => {
      const reload = jest.fn();
      ((auth as unknown) as jest.Mock).mockReturnValue({
        currentUser: {
          uid: 'uid',
          photoURL: '',
          providerData: [
            {
              providerId: 'email',
            },
          ],
          displayName: 'displayName',
          email: 'email.com',
          emailVerified: true,
          reload: async () => {
            reload();
          },
        },
      });

      const isEmailVerified = await authService.isEmailVerified();

      expect(reload).toBeCalledTimes(1);
      expect(isEmailVerified).toBe(true);
    });

    it('returns false if user is not logged in', async () => {
      ((auth as unknown) as jest.Mock).mockReturnValue({
        currentUser: undefined,
      });

      const isEmailVerified = await authService.isEmailVerified();

      expect(isEmailVerified).toBe(false);
    });
  });

  describe('getCurrentUser', () => {
    it('returns current user', async () => {
      ((auth as unknown) as jest.Mock).mockReturnValue({
        currentUser: {
          uid: 'uid',
          photoURL: 'facebook/photoURL',
          providerData: [
            {
              providerId: 'facebook.com',
            },
          ],
          displayName: 'displayName',
          email: 'email',
        },
      });

      const user = await authService.getCurrentUser();

      expect(user).toMatchInlineSnapshot(`
                        Object {
                          "avatarUrl": "facebook/photoURL?height=500",
                          "displayName": "displayName",
                          "email": "email",
                          "emailVerified": undefined,
                          "id": "uid",
                          "isLoggedIn": true,
                          "loginType": "FACEBOOK",
                        }
                  `);
    });

    it('returns undefined if the user is not logged in', async () => {
      ((auth as unknown) as jest.Mock).mockReturnValue({
        currentUser: undefined,
      });

      const user = await authService.getCurrentUser();

      expect(user).toBe(undefined);
    });
  });

  describe('logout', () => {
    it('runs succesfully', async () => {
      GoogleSignin.isSignedIn = async () => true;
      GoogleSignin.revokeAccess = jest.fn();
      GoogleSignin.signOut = jest.fn();
      const signOut = jest.fn();
      ((auth as unknown) as jest.Mock).mockReturnValue({
        currentUser: {
          uid: 'uid',
          photoURL: 'google/photoURL',
          providerData: [
            {
              providerId: 'google.com',
            },
          ],
          displayName: 'displayName',
          email: 'email',
        },
        signOut: async () => {
          signOut();
        },
      });

      await authService.logout();

      expect(GoogleSignin.revokeAccess).toBeCalledTimes(1);
      expect(GoogleSignin.signOut).toBeCalledTimes(1);
      expect(signOut).toBeCalledTimes(1);
    });

    it('runs succesfully if not begin google account', async () => {
      GoogleSignin.isSignedIn = async () => true;
      GoogleSignin.revokeAccess = jest.fn();
      GoogleSignin.signOut = jest.fn();
      const signOut = jest.fn();
      ((auth as unknown) as jest.Mock).mockReturnValue({
        currentUser: {
          uid: 'uid',
          photoURL: 'facebook/photoURL',
          providerData: [
            {
              providerId: 'facebook.com',
            },
          ],
          displayName: 'displayName',
          email: 'email',
        },
        signOut: async () => {
          signOut();
        },
      });

      await authService.logout();

      expect(GoogleSignin.revokeAccess).not.toBeCalled();
      expect(GoogleSignin.signOut).not.toBeCalled();
      expect(signOut).toBeCalledTimes(1);
    });

    it('does nothing if firebase account is blank', async () => {
      const signOut = jest.fn();
      ((auth as unknown) as jest.Mock).mockReturnValue({
        currentUser: undefined,
        signOut: async () => {
          signOut();
        },
      });

      await authService.logout();

      expect(signOut).not.toBeCalled();
    });
  });

  describe('resendVerificationEmail', () => {
    it('runs succesfully', async () => {
      const sendEmailVerification = jest.fn();
      ((auth as unknown) as jest.Mock).mockReturnValue({
        currentUser: {
          uid: 'uid',
          photoURL: 'google/photoURL',
          providerData: [
            {
              providerId: 'google.com',
            },
          ],
          displayName: 'displayName',
          email: 'email',
          sendEmailVerification,
        },
      });

      await authService.resendVerificationEmail('en');

      expect(sendEmailVerification).toBeCalledTimes(1);
    });

    it('uses default language', async () => {
      const sendEmailVerification = jest.fn();
      ((auth as unknown) as jest.Mock).mockReturnValue({
        currentUser: {
          uid: 'uid',
          photoURL: 'google/photoURL',
          providerData: [
            {
              providerId: 'google.com',
            },
          ],
          displayName: 'displayName',
          email: 'email',
          sendEmailVerification,
        },
      });

      await authService.resendVerificationEmail();

      expect(sendEmailVerification).toBeCalledTimes(1);
    });

    it('does nothing if user is not logged in', async () => {
      ((auth as unknown) as jest.Mock).mockReturnValue({
        currentUser: undefined,
      });

      await authService.resendVerificationEmail('en');
    });
  });

  describe('changePassword', () => {
    it('runs succesfully', async () => {
      const updatePassword = jest.fn();
      ((auth as unknown) as jest.Mock).mockReturnValue({
        currentUser: {
          updatePassword,
        },
      });

      const newPassword = 'newPassword';
      await authService.changePassword(newPassword);

      expect(updatePassword).toBeCalledWith(newPassword);
    });
  });

  describe('sendSmsVerification', () => {
    it('runs succesfully', async () => {
      const signInWithPhoneNumber = jest.fn();
      ((auth as unknown) as jest.Mock).mockReturnValue({
        signInWithPhoneNumber,
      });

      const phoneNo = 'phoneNo';
      await authService.sendSmsVerification(phoneNo);

      expect(signInWithPhoneNumber).toBeCalledWith(phoneNo, true);
    });
  });

  describe('verifySmsCode', () => {
    it('runs succesfully', async () => {
      const confirmationResult = {
        confirm: (_code: string) => ({
          uid: 'uid',
          photoURL: 'facebook/photoURL',
          providerData: [
            {
              providerId: 'phone',
            },
          ],
          displayName: '',
          email: 'email',
        }),
      };
      const code = 'code';

      const user = await authService.verifySmsCode((confirmationResult as unknown) as Auth.ConfirmationResult, code);

      expect(user).toMatchInlineSnapshot(`
                                                Object {
                                                  "avatarUrl": "facebook/photoURL?height=500",
                                                  "displayName": undefined,
                                                  "email": "email",
                                                  "emailVerified": undefined,
                                                  "id": "uid",
                                                  "isLoggedIn": true,
                                                  "loginType": "PHONE_NO",
                                                }
                                    `);
    });

    it('returns undefined if code does not match', async () => {
      const confirmationResult = {
        confirm: (_code: string) => undefined,
      };
      const code = 'code';

      const user = await authService.verifySmsCode((confirmationResult as unknown) as Auth.ConfirmationResult, code);

      expect(user).toMatchInlineSnapshot(`undefined`);
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('runs succesfully', async () => {
      const sendPasswordResetEmail = jest.fn();
      ((auth as unknown) as jest.Mock).mockReturnValue({
        sendPasswordResetEmail,
      });

      const email = 'email';
      await authService.sendPasswordResetEmail(email);

      expect(sendPasswordResetEmail).toBeCalledWith(email);
    });
  });
});
