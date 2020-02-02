import { WithScreen, WithApolloClient } from '@app/components';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/core';
import { UserProfileScreen, EditEmailScreen, EditFullnameScreen, EditPhoneNoScreen, EditGenderScreen } from './screens';

const registerScreens = (): void => {
  Navigation.registerComponent(screenNames.UserProfileScreen, () =>
    WithScreen(WithApolloClient(UserProfileScreen), {
      lazyLoad: true,
      orientation: 'PORTRAIT',
    }),
  );
  Navigation.registerComponent(screenNames.EditEmailScreen, () =>
    WithScreen(WithApolloClient(EditEmailScreen), {
      lazyLoad: true,
      orientation: 'PORTRAIT',
    }),
  );
  Navigation.registerComponent(screenNames.EditFullnameScreen, () =>
    WithScreen(WithApolloClient(EditFullnameScreen), {
      lazyLoad: true,
      orientation: 'PORTRAIT',
    }),
  );
  Navigation.registerComponent(screenNames.EditPhoneNoScreen, () =>
    WithScreen(WithApolloClient(EditPhoneNoScreen), {
      lazyLoad: true,
      orientation: 'PORTRAIT',
    }),
  );
  Navigation.registerComponent(screenNames.EditGenderScreen, () =>
    WithScreen(WithApolloClient(EditGenderScreen), {
      lazyLoad: true,
      orientation: 'PORTRAIT',
    }),
  );
};

export default {
  registerScreens,
};
