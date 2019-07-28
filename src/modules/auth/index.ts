import { WithStore } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { LoginScreen, AppLoaderScreen } from './screens';
import { screenNames } from '@app/core';

const registerScreens = () => {
  Navigation.registerComponent(screenNames.LoginScreen, () => WithStore(LoginScreen));
  Navigation.registerComponent(screenNames.AppLoaderScreen, () => WithStore(AppLoaderScreen));
};

export default {
  registerScreens,
};
