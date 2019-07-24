/* eslint-disable no-undef */
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

/* eslint-disable no-console */
const originalConsoleError = console.error;
console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalConsoleError(...args);
};

jest.mock('react-native-splash-screen', () => ({ hide: jest.fn() }));
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
