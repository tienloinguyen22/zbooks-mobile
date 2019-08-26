import { GoogleSignin } from 'react-native-google-signin';
import { configureGoogleSignIn } from '@app/core';

describe('core/helpers/configure_google_sign_in', () => {
  it('calls GoogleSignin correctly', async () => {
    await configureGoogleSignIn();
    expect(GoogleSignin.configure).toBeCalledTimes(1);
    expect(GoogleSignin.hasPlayServices).toBeCalledTimes(1);
  });
});
