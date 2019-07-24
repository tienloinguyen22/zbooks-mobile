import { withStore } from '@app/core';
import { Navigation } from 'react-native-navigation';
import { LoginScreen, AppLoaderScreen } from './screens';

const screenNames = {
  LoginScreen: 'LoginScreen',
  AppLoaderScreen: 'AppLoaderScreen',
};

const registerScreens = () => {
  Navigation.registerComponent(screenNames.LoginScreen, () => withStore(LoginScreen));
  Navigation.registerComponent(screenNames.AppLoaderScreen, () => withStore(AppLoaderScreen));
};

export default {
  screenNames,
  registerScreens,
};
