import { withStore } from '@app/core';
import { Navigation } from 'react-native-navigation';
import { SettingsScreen } from './screens';

const screenNames = {
  SettingsScreen: 'SettingsScreen',
};

const registerScreens = () => {
  Navigation.registerComponent(screenNames.SettingsScreen, () => withStore(SettingsScreen));
};

export default {
  screenNames,
  registerScreens,
};
