import { WithStore } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { SettingsScreen } from './screens';
import { screenNames } from '@app/core';

const registerScreens = () => {
  Navigation.registerComponent(screenNames.SettingsScreen, () => WithStore(SettingsScreen));
};

export default {
  registerScreens,
};
