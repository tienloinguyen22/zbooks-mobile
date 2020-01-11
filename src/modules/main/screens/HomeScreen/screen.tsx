import React from 'react';
import gql from 'graphql-tag';
import { ScreenProps, screenNames, THEME_DARK } from '@app/core';
import { navigationService } from '@app/services';
import { ScrollView, Container } from '@app/components';
import { AlertSample } from '@app/modules/main/screens/HomeScreen/components/AlertSample';
import { LottieSample } from '@app/modules/main/screens/HomeScreen/components/LottieSample';
import { useQuery } from '@apollo/client';
import { TouchableOpacity, Text } from 'react-native';
import { apolloClient } from '@app/graphql';
import {
  NavigationSample,
  IconSample,
  CrashSample,
  NotificationSample,
  PickerSample,
  AnalyticsSample,
  TextStyleSample,
} from './components';

type Props = ScreenProps;

const APP_SETTINGS = gql`
  query GetAppSettings {
    appSettings @client
  }
`;

export const Screen = ({ componentId }: Props): JSX.Element => {
  const { data } = useQuery(APP_SETTINGS);
  // eslint-disable-next-line no-console
  console.log('TCL: data', data);

  const pushNewScreen = (): void => {
    navigationService.navigateTo({
      componentId,
      screenName: screenNames.NewScreen,
    });
  };

  const changeTab = (): void => {
    navigationService.changeTab({
      componentId,
      tabIndex: 1,
    });
  };

  const changeTheme = (): void => {
    apolloClient.writeData({
      data: {
        appSettings: {
          theme: THEME_DARK,
        },
      },
    });
  };

  return (
    <Container componentId={componentId}>
      <ScrollView>
        <TouchableOpacity onPress={changeTheme}>
          <Text>Test</Text>
        </TouchableOpacity>
        <AnalyticsSample />
        <CrashSample />
        <PickerSample />
        <NavigationSample pushNewScreen={pushNewScreen} changeTab={changeTab} />
        <IconSample />
        <NotificationSample />
        <AlertSample />
        <LottieSample />
        <TextStyleSample />
      </ScrollView>
    </Container>
  );
};
