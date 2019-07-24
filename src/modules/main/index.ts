import { withStore } from '@app/core';
import { Navigation } from 'react-native-navigation';
import { HomeScreen } from './screens';

const screenNames = {
  HomeScreen: 'HomeScreen',
};

const registerScreens = () => {
  Navigation.registerComponent(screenNames.HomeScreen, () => withStore(HomeScreen));
};

export default {
  screenNames,
  registerScreens,
};
