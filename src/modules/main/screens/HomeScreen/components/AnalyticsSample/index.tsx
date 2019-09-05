import React from 'react';
import analytics from '@react-native-firebase/analytics';
import { Card, CardItem, Text, View, Button } from '@app/components';
import { screenNames } from '@app/core';
import { styles } from './styles';

export const AnalyticsSample = (): JSX.Element => {
  const recordCurrentScreen = async (): Promise<void> => {
    await analytics().setCurrentScreen(screenNames.HomeScreen, screenNames.HomeScreen);
  };

  const recordSampleEvent = async (): Promise<void> => {
    await analytics().logEvent('sample_event', {
      id: '123456789',
      color: 'red',
      via: 'ProductCatalog',
    });
  };

  return (
    <Card>
      <CardItem bordered header>
        <Text bold>Analytics</Text>
      </CardItem>
      <CardItem bordered>
        <View column>
          <Button onPress={recordCurrentScreen} style={styles.button}>
            <Text white>{'Record current screen (Home)'}</Text>
          </Button>
          <Button onPress={recordSampleEvent} style={styles.button}>
            <Text white>Record event sample_event</Text>
          </Button>
        </View>
      </CardItem>
    </Card>
  );
};
