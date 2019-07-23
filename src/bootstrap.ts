/**
 * @format Hello world
 */

import { Navigation } from 'react-native-navigation';
import { i18n } from '@app/core';
import App from '@app/App';

const bootstrap = async (): Promise<void> => {
  await i18n.initialize();

  Navigation.registerComponent('navigation.playground.WelcomeScreen', (): (() => JSX.Element) => App);

  Navigation.events().registerAppLaunchedListener((): void => {
    Navigation.setRoot({ root: { component: { name: 'navigation.playground.WelcomeScreen' } } });
  });
};

bootstrap();
