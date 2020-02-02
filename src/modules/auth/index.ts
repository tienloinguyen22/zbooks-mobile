import { WithScreen, WithApolloClient } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/core';
import { LoginScreen, AppLoaderScreen, FinishRegisterScreen } from './screens';

const registerScreens = (): void => {
  Navigation.registerComponent(screenNames.LoginScreen, () =>
    WithScreen(WithApolloClient(LoginScreen), {
      orientation: 'PORTRAIT',
    }),
  );

  Navigation.registerComponent(screenNames.AppLoaderScreen, () =>
    WithScreen(WithApolloClient(AppLoaderScreen), {
      orientation: 'PORTRAIT',
    }),
  );

  Navigation.registerComponent(screenNames.FinishRegisterScreen, () =>
    WithScreen(WithApolloClient(FinishRegisterScreen), {
      orientation: 'PORTRAIT',
    }),
  );
};

export default {
  registerScreens,
};
