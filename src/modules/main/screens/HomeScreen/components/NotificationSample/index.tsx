import React from 'react';
import { Card, CardItem, Text, View, Button } from '@app/components';
import { showNotification } from '@app/core';
import { styles } from './styles';

export const NotificationSample = (): JSX.Element => {
  const showMessage = (): void => {
    showNotification({
      type: 'SUCCESS',
      message: 'Hello',
    });
  };
  return (
    <Card>
      <CardItem bordered header>
        <Text bold>Notification</Text>
      </CardItem>
      <CardItem bordered>
        <View column>
          <Button onPress={showMessage} style={styles.button}>
            <Text white>Show notification</Text>
          </Button>
        </View>
      </CardItem>
    </Card>
  );
};
