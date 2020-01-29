import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { imageSources } from '@app/assets';
import { ScreenProps, showNotification, commonStyles, screenNames, NotificationTypes } from '@app/core';
import { Image, Button, Text, Container, ImageIcon, View, LoadingModal } from '@app/components';
import { authService, LoginResult, navigationService } from '@app/services';
import LinearGradient from 'react-native-linear-gradient';
import gql from 'graphql-tag';
import { apolloClient, updateCurrentUser } from '@app/graphql';
import _ from 'lodash';
import { styles } from './styles';

type Props = ScreenProps;

const appIconSource = imageSources.loginIcon();

const FIND_USER_BY_TOKEN = gql`
  query FindUserByToken($payload: FindUserByTokenQuery!) {
    users {
      findByToken(payload: $payload) {
        id
        email
        fullName
        countryCode
        phoneNo
        address
        avatarUrl
        dob
        gender
        firebaseId
        preferenceCategories
      }
    }
  }
`;

const REGISTER_USER_WITH_TOKEN = gql`
  mutation RegisterUserWithToken($payload: RegisterWithTokenPayload!) {
    users {
      registerWithToken(payload: $payload) {
        id
        email
        fullName
        countryCode
        phoneNo
        address
        avatarUrl
        dob
        gender
        firebaseId
        preferenceCategories
      }
    }
  }
`;

const BaseScreen = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const performLogin = async (loginType: 'GOOGLE' | 'FACEBOOK'): Promise<void> => {
    let result: LoginResult | undefined;
    switch (loginType) {
      case 'GOOGLE':
        result = await authService.loginGoogle();
        break;
      default:
        result = await authService.loginFacebook();
        break;
    }

    if (!result.isSuccessful) {
      if (result.errorMessage) {
        showNotification({
          type: NotificationTypes.ERROR,
          message: result.errorMessage,
        });
      }
      return;
    }

    const idToken = await authService.getIdToken();
    const findUserByTokenResult = await apolloClient.query({
      query: FIND_USER_BY_TOKEN,
      variables: {
        payload: {
          token: idToken,
        },
      },
    });

    if (_.get(findUserByTokenResult, 'data.users.findByToken.id')) {
      updateCurrentUser({
        ..._.get(findUserByTokenResult, 'data.users.findByToken'),
        isLoggedIn: true,
      });
      navigationService.setRootHome();
    } else {
      // User not exist => register
      const currentUser = authService.getCurrentUser();
      const fullName = _.get(currentUser, 'displayName', '');
      const email = _.get(currentUser, 'email', '');

      if (!fullName || !email) {
        // Navigation to Finish register screen
        navigationService.navigateTo({
          componentId: props.componentId,
          screenName: screenNames.FinishRegisterScreen,
          options: {
            passProps: {
              showHeader: true,
              showBackButton: true,
              headerTitle: t('finishRegisterScreen.headerTitle'),
              userInfo: {
                email,
                fullName,
              },
            },
          },
        });
      } else {
        const registerUserResult = await apolloClient.mutate({
          mutation: REGISTER_USER_WITH_TOKEN,
          variables: {
            payload: {
              token: idToken,
              email,
              fullName,
            },
          },
        });

        updateCurrentUser({
          ..._.get(registerUserResult, 'data.users.registerWithToken'),
          isLoggedIn: true,
        });
        navigationService.setRootHome();
      }
    }
  };

  const loginFacebook = async (): Promise<void> => {
    try {
      setIsBusy(true);
      await performLogin('FACEBOOK');
    } finally {
      setIsBusy(false);
    }
  };

  const loginGoogle = async (): Promise<void> => {
    try {
      setIsBusy(true);
      await performLogin('GOOGLE');
    } finally {
      setIsBusy(false);
    }
  };

  if (isBusy) {
    return <LoadingModal />;
  }

  return (
    <Container column center centerVertical>
      <LinearGradient colors={['#89f7fe', '#66a6ff']} style={styles.appIconContainer}>
        <Image style={styles.appIcon} source={appIconSource} />
      </LinearGradient>

      <View style={styles.welcomeContainer}>
        <View style={styles.titleContainer}>
          <Text h2 bold textCenter>
            {t('loginScreen.welcome')}
          </Text>
        </View>
        <View>
          <Text textCenter>{t('loginScreen.wecomeDescription')}</Text>
        </View>
      </View>

      <View>
        <Button rounded onPress={loginFacebook} style={[styles.button, styles.facebookButton, commonStyles.boxShadow]}>
          <ImageIcon source={imageSources.facebookIcon()} />
          <Text white>{t('loginScreen.continueWith')} Facebook</Text>
          <View />
        </Button>
        <Button rounded onPress={loginGoogle} style={[styles.button, styles.googleButton, commonStyles.boxShadow]}>
          <ImageIcon source={imageSources.googleIcon()} />
          <Text>{t('loginScreen.continueWith')} Google</Text>
          <View />
        </Button>
      </View>
    </Container>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
