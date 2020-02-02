import { WithScreen, WithApolloClient } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/core';
import { HomeScreen } from './screens';

const registerScreens = (): void => {
  Navigation.registerComponent(screenNames.HomeScreen, () =>
    WithScreen(WithApolloClient(HomeScreen), {
      lazyLoad: true,
    }),
  );
};

export default {
  registerScreens,
};
