import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { imageSources } from '@app/assets';
import { ScreenProps, showNotification, commonStyles } from '@app/core';
import { Image, Button, Text, Loading, Container, ImageIcon } from '@app/components';
import { authService, LoginResult, navigationService } from '@app/services';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { apolloClient, updateCurrentUser } from '@app/graphql';
import _ from 'lodash';
import { styles } from './styles';

type Props = ScreenProps;

const appIconSource = imageSources.loginIcon();

const FIND_USER_BY_TOKEN = gql`
  query findUserByToken($payload: FindUserByTokenQuery!) {
    users {
      findByToken(payload: $payload) {
        id
        fullName
        email
        avatarUrl
        firebaseId
      }
    }
  }
`;

const REGISTER_USER_WITH_TOKEN = gql`
  mutation registerUserWithToken($payload: RegisterWithTokenPayload!) {
    users {
      registerWithToken(payload: $payload) {
        id
        email
        fullName
        avatarUrl
        firebaseId
      }
    }
  }
`;

export const Screen = (_props: Props): JSX.Element => {
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
          type: 'ERROR',
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
    return (
      <Container center centerVertical>
        <Loading />
      </Container>
    );
  }

  return (
    <Container center centerVertical>
      <LinearGradient colors={['#89f7fe', '#66a6ff']} style={styles.appIconContainer}>
        <Image style={styles.appIcon} source={appIconSource} />
      </LinearGradient>

      <View style={styles.welcomeContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>Welcome!!</Text>
        </View>
        <View>
          <Text style={styles.textCenter}>
            Create your account to get started. After that, you can share books and make friends
          </Text>
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
