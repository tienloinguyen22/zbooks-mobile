import { WithStore } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/core';
import { LoginScreen, AppLoaderScreen, EmailRegisterScreen, EmailLoginScreen } from './screens';

const registerScreens = (): void => {
  Navigation.registerComponent(screenNames.LoginScreen, () => WithStore(LoginScreen));
  Navigation.registerComponent(screenNames.AppLoaderScreen, () => WithStore(AppLoaderScreen));
  Navigation.registerComponent(screenNames.EmailRegisterScreen, () => WithStore(EmailRegisterScreen));
  Navigation.registerComponent(screenNames.EmailLoginScreen, () => WithStore(EmailLoginScreen));
};

export default { registerScreens };
