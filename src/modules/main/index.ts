import { WithStore } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { HomeScreen } from './screens';
import { screenNames } from '@app/core';

const registerScreens = () => {
  Navigation.registerComponent(screenNames.HomeScreen, () => WithStore(HomeScreen));
};

export default {
  registerScreens,
};
