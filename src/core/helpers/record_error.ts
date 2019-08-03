// import firebase from 'react-native-firebase';

export const recordError = (error: Error): void => {
  if (!__DEV__) {
    try {
      // if (firebase.auth().currentUser) {
      //     firebase.crashlytics().setStringValue('userId', `${firebase.auth().currentUser!.uid}`);
      // }
      // firebase.crashlytics().setStringValue('stack', `${error.stack}`);
      // firebase.crashlytics().setStringValue('message', `${error.message}`);
      // firebase.crashlytics().recordError(0, `RN Fatal: ${error.message}`);
    } catch {
      // do nothing
    }
  } else {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
