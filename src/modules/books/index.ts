import { WithScreen, WithApolloClient } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/core';
import { FavoriteBooksScreen } from './screens';

const registerScreens = (): void => {
  Navigation.registerComponent(screenNames.FavoriteBooksScreen, () =>
    WithScreen(WithApolloClient(FavoriteBooksScreen), {
      lazyLoad: true,
      orientation: 'PORTRAIT',
    }),
  );
};

export default {
  registerScreens,
};
