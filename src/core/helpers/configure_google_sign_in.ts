import { GoogleSignin } from 'react-native-google-signin';
import { config } from '@app/config';

export const configureGoogleSignIn = async () => {
  GoogleSignin.configure({
    forceConsentPrompt: true,
    // webClientId: config.google.webClientId,
    // iosClientId: config.google.iosClientId,
  });
  await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });
  console.log(config.google.webClientId);
  console.log(config.google.iosClientId);
};
