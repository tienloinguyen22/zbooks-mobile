import { WithStore, WithScreen } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/core';
import {
  LoginScreen,
  AppLoaderScreen,
  EmailRegisterScreen,
  EmailLoginScreen,
  EmailVerificationScreen,
  ChangePasswordScreen,
  PhoneNoLoginScreen,
  ForgotPasswordScreen,
} from './screens';

const registerScreens = (): void => {
  Navigation.registerComponent(screenNames.LoginScreen, () =>
    WithScreen(WithStore(LoginScreen), {
      orientation: 'PORTRAIT',
    }),
  );

  Navigation.registerComponent(screenNames.AppLoaderScreen, () =>
    WithScreen(WithStore(AppLoaderScreen), {
      orientation: 'PORTRAIT',
    }),
  );
  Navigation.registerComponent(screenNames.EmailRegisterScreen, () =>
    WithScreen(WithStore(EmailRegisterScreen), {
      orientation: 'PORTRAIT',
    }),
  );
  Navigation.registerComponent(screenNames.EmailLoginScreen, () =>
    WithScreen(WithStore(EmailLoginScreen), {
      orientation: 'PORTRAIT',
    }),
  );
  Navigation.registerComponent(screenNames.EmailVerificationScreen, () =>
    WithScreen(WithStore(EmailVerificationScreen), {
      orientation: 'PORTRAIT',
    }),
  );
  Navigation.registerComponent(screenNames.ChangePasswordScreen, () =>
    WithScreen(WithStore(ChangePasswordScreen), {
      orientation: 'PORTRAIT',
    }),
  );
  Navigation.registerComponent(screenNames.PhoneNoLoginScreen, () =>
    WithScreen(WithStore(PhoneNoLoginScreen), {
      orientation: 'PORTRAIT',
    }),
  );
  Navigation.registerComponent(screenNames.ForgotPasswordScreen, () =>
    WithScreen(WithStore(ForgotPasswordScreen), {
      orientation: 'PORTRAIT',
    }),
  );
};

export default {
  registerScreens,
};
