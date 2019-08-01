import { WithStore } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { LoginScreen, AppLoaderScreen, EmailRegisterScreen } from './screens';
import { screenNames } from '@app/core';

const registerScreens = () => {
  Navigation.registerComponent(screenNames.LoginScreen, () => WithStore(LoginScreen));
  Navigation.registerComponent(screenNames.AppLoaderScreen, () => WithStore(AppLoaderScreen));
  Navigation.registerComponent(screenNames.EmailRegisterScreen, () => WithStore(EmailRegisterScreen));
};

export default {
  registerScreens,
};
