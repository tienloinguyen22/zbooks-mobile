import React from 'react';
import { Card, CardItem, Text, View, Button } from '@app/components';
import { styles } from './styles';
import { showNotification } from '@app/core';

interface Props {}

export const NotificationSample = ({  }: Props) => {
  const showMessage = () => {
    showNotification({ type: 'success', message: 'Hello' });
  };
  return (
    <Card>
      <CardItem header bordered>
        <Text primary>Notification</Text>
      </CardItem>
      <CardItem bordered>
        <View column>
          <Button onPress={showMessage} style={styles.button}>
            <Text>Show notification</Text>
          </Button>
        </View>
      </CardItem>
    </Card>
  );
};
