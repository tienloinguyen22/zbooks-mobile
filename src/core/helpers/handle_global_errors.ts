import { recordError } from './record_error';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import { Alert } from 'react-native';
import i18next from 'i18next';
import Promise from 'bluebird';

const showAndRecordError = (error: Error, _isFatal: boolean = false) => {
  recordError(error);
  if (!__DEV__) {
    Alert.alert(i18next.t('error.unexpectedErrorOccurred'), i18next.t('error.unexpectedErrorOccurredMessage'), [
      { text: i18next.t('common.ok') },
    ]);
  }
};

// https://stackoverflow.com/questions/48487089/global-unhandledrejection-listener-in-react-native
// We use the "Bluebird" lib for Promises, because it shows good perf
// and it implements the "unhandledrejection" event:
global.Promise = Promise;

// Global catch of unhandled Promise rejections:
(global as any).onunhandledrejection = (error: Error) => {
  // Warning: when running in "remote debug" mode (JS environment is Chrome browser),
  // this handler is called a second time by Bluebird with a custom "dom-event".
  // We need to filter this case out:
  if (error instanceof Error) {
    showAndRecordError(error);
  }
};

export const handleGlobalErrors = () => {
  setJSExceptionHandler((error: any, isFatal: boolean) => {
    showAndRecordError(error, isFatal);
  }, true);
  setNativeExceptionHandler(
    (_errorString: string) => {
      // do nothing
    },
    false,
    true,
  );
};
export {};
