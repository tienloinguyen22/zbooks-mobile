import { i18n, configureGoogleSignIn } from '@app/core';
import { Sentry } from 'react-native-sentry';
import { navigationService, appService } from '@app/services';
import { registerModules } from '@app/modules';
import { config } from '@app/config';
import { handleGlobalErrors } from './handle_global_errors';

const bootstrap = async (): Promise<void> => {
  handleGlobalErrors();
  await i18n.initialize();
  registerModules();
  navigationService.initialize();
  await configureGoogleSignIn();
  await appService.setDefaults();
  await appService.checkUpdate();
  !__DEV__ && Sentry.config(config.sentryDns).install();
};

bootstrap();
