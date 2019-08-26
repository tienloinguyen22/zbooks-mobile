import React from 'react';
import { Card, CardItem, Text, View, Button, Alert } from '@app/components';
import { styles } from './styles';

export const AlertSample = (): JSX.Element => {
  const showWarningAlert = (): void => {
    Alert.show({
      type: 'WARNING',
      title: 'Hello',
      message: 'Hello React',
      onPressCancel: Alert.hide,
      actions: [
        {
          title: 'Button1',
          onPress: Alert.hide,
          special: true,
        },
        {
          title: 'Button2',
          onPress: Alert.hide,
          special: false,
        },
        {
          title: 'Cancel',
          onPress: Alert.hide,
          special: true,
        },
      ],
    });
  };
  const showInfoAlert = (): void => {
    Alert.show({
      type: 'INFO',
      title: 'Info',
      message: 'Hello React',
      onPressCancel: Alert.hide,
    });
  };
  const showErrorAlert = (): void => {
    Alert.show({
      type: 'ERROR',
      title: 'Error',
      message: 'Error happen',
      onPressCancel: Alert.hide,
    });
  };
  const showSuccessAlert = (): void => {
    Alert.show({
      type: 'SUCCESS',
      title: 'Success',
      message: 'Good job!',
      onPressCancel: Alert.hide,
    });
  };
  return (
    <Card>
      <CardItem bordered header>
        <Text bold>Alert</Text>
      </CardItem>
      <CardItem bordered>
        <View column>
          <Button onPress={showWarningAlert} style={styles.button}>
            <Text white>Show warning alert</Text>
          </Button>
          <Button onPress={showInfoAlert} style={styles.button}>
            <Text white>Show info alert</Text>
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
