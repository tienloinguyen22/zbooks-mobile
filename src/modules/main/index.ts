import { WithStore, WithLazyLoad } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/core';
import { HomeScreen, NewScreen } from './screens';

const registerScreens = (): void => {
  Navigation.registerComponent(screenNames.HomeScreen, () => WithLazyLoad(WithStore(HomeScreen)));
  Navigation.registerComponent(screenNames.NewScreen, () => WithStore(NewScreen));
};

export default {
  registerScreens,
};
