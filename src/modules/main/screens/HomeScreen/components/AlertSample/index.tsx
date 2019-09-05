import React from 'react';
import { Card, CardItem, Text, View, Button, Alert } from '@app/components';
import { styles } from './styles';

export const AlertSample = (): JSX.Element => {
  const showInfoAlert = (): void => {
    Alert.show({
      type: 'INFO',
      title: 'Info',
      message: 'Hello React',
      actions: [
        {
          title: 'Button1',
          onPress: Alert.hide,
        },
        {
          title: 'Button2',
          onPress: Alert.hide,
        },
        {
          title: 'Cancel',
          onPress: Alert.hide,
          outline: true,
        },
      ],
    });
  };

  const showWarningAlert = (): void => {
    Alert.show({
      type: 'WARNING',
      title: 'Hello',
      message: 'Hello React',
    });
  };

  const showErrorAlert = (): void => {
    Alert.show({
      type: 'ERROR',
      title: 'Error',
      message: 'Error happen',
    });
  };

  const showSuccessAlert = (): void => {
    Alert.show({
      type: 'SUCCESS',
      title: 'Success',
      message: 'Good job!',
    });
  };

  return (
    <Card>
      <CardItem bordered header>
        <Text bold>Alert</Text>
      </CardItem>
      <CardItem bordered>
        <View column>
          <Button onPress={showInfoAlert} style={styles.button}>
            <Text white>Show info alert</Text>
          </Button>
          <Button onPress={showWarningAlert} style={styles.button}>
            <Text white>Show warning alert</Text>
          </Button>
          <Button onPress={showErrorAlert} style={styles.button}>
            <Text white>Show error alert</Text>
          </Button>
          <Button onPress={showSuccessAlert} style={styles.button}>
            <Text white>Show success alert</Text>
          </Button>
        </View>
      </CardItem>
    </Card>
  );
};
