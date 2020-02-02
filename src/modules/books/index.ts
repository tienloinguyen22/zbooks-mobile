import { WithScreen, WithApolloClient } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/core';
import { FavoriteBooksScreen, BookDetailScreen } from './screens';

const registerScreens = (): void => {
  Navigation.registerComponent(screenNames.FavoriteBooksScreen, () =>
    WithScreen(WithApolloClient(FavoriteBooksScreen), {
      lazyLoad: true,
      orientation: 'PORTRAIT',
    }),
  );
  Navigation.registerComponent(screenNames.BookDetailScreen, () =>
    WithScreen(WithApolloClient(BookDetailScreen), {
      lazyLoad: true,
      orientation: 'PORTRAIT',
    }),
  );
};

export default {
  registerScreens,
};
