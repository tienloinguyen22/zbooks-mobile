import { WithStore, WithLazyLoad } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/core';
import { SettingsScreen } from './screens';

const registerScreens = (): void => {
  Navigation.registerComponent(screenNames.SettingsScreen, () => WithLazyLoad(WithStore(SettingsScreen)));
};

export default {
  registerScreens,
};
