import { Platform } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import auth from '@react-native-firebase/auth';
import { config } from '@app/config';

export const recordError = (error: Error): void => {
  if (__DEV__) {
    try {
      const { currentUser } = auth();
      if (currentUser) {
        crashlytics().log(`userId: ${currentUser.uid}`);
      }
      crashlytics().log(`appVersion: ${Platform.OS === 'ios' ? config.ios.version : config.android.version}`);
      crashlytics().recordError(error);
    } catch (internalError) {
      // do nothing
    }
  } else {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
