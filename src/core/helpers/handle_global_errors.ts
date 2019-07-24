// import { recordError } from '@app/core';
// import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
// import { Alert } from 'react-native';
// import Promise from 'bluebird';

// const showAndRecordError = (error: Error, _isFatal: boolean = false) => {
//   recordError(error);
//   if (!__DEV__) {
//     Alert.alert(
//       'Unexpected error occurred',
//       `We have reported this to our team.! Please close the app and start again!`,
//       [{ text: 'OK' }],
//     );
//   }
// };

// // https://stackoverflow.com/questions/48487089/global-unhandledrejection-listener-in-react-native
// // We use the "Bluebird" lib for Promises, because it shows good perf
// // and it implements the "unhandledrejection" event:
// global.Promise = Promise;

// // Global catch of unhandled Promise rejections:
// (global as any).onunhandledrejection = (error: Error) => {
//   // Warning: when running in "remote debug" mode (JS environment is Chrome browser),
//   // this handler is called a second time by Bluebird with a custom "dom-event".
//   // We need to filter this case out:
//   if (error instanceof Error) {
//     showAndRecordError(error);
//   }
// };

// export const handleGlobalErrors = () => {
//   setJSExceptionHandler((error: any, isFatal: boolean) => {
//     showAndRecordError(error, isFatal);
//   });
//   setNativeExceptionHandler(
//     (_errorString: string) => {
//       // do nothing
//     },
//     false,
//     true,
//   );
// };
export {};
