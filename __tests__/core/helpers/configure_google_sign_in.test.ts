import { GoogleSignin } from 'react-native-google-signin';
import { configureGoogleSignIn } from '@app/core';

jest.mock('react-native-google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
  },
}));

describe('core/helpers/configure_google_sign_in', () => {
  it('calls GoogleSignin correctly', async () => {
    await configureGoogleSignIn();

    expect(GoogleSignin.configure).toBeCalledTimes(1);
    expect(GoogleSignin.hasPlayServices).toBeCalledTimes(1);
  });
});
