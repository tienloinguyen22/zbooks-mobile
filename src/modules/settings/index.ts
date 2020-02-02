import { WithScreen, WithApolloClient } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/core';
import { SettingsScreen, CategoryPreferenceScreen } from './screens';

const registerScreens = (): void => {
  Navigation.registerComponent(screenNames.SettingsScreen, () =>
    WithScreen(WithApolloClient(SettingsScreen), {
      lazyLoad: true,
      orientation: 'PORTRAIT',
    }),
  );
  Navigation.registerComponent(screenNames.CategoryPreferenceScreen, () =>
    WithScreen(WithApolloClient(CategoryPreferenceScreen), {
      lazyLoad: true,
      orientation: 'PORTRAIT',
    }),
  );
};

export default {
  registerScreens,
};
