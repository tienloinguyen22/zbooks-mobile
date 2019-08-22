import React from 'react';
import { Card, CardItem, Text, View, Button, Alert } from '@app/components';
import { styles } from './styles';

export const AlertSample = (): JSX.Element => {
  const hideAlert = (): void => {
    Alert.hide();
  };
  const showWarningAlert = (): void => {
    Alert.show({
      visible: true,
      title: 'Hello',
      message: 'Hello React',
      onPressCancel: hideAlert,
      warning: true,
      actions: [
        {
          title: 'Button1',
          onPress: hideAlert,
          special: true,
        },
        {
          title: 'Button2',
          onPress: hideAlert,
          special: false,
        },
        {
          title: 'Cancel',
          onPress: hideAlert,
          special: true,
        },
      ],
    });
  };
  const showInfoAlert = (): void => {
    Alert.show({
      visible: true,
      title: 'Info',
      message: 'Hello React',
      onPressCancel: hideAlert,
      info: true,
    });
  };
  const showErrorAlert = (): void => {
    Alert.show({
      visible: true,
      title: 'Error',
      message: 'Error happen',
      onPressCancel: hideAlert,
      error: true,
    });
  };
  const showSuccessAlert = (): void => {
    Alert.show({
      visible: true,
      title: 'Success',
      message: 'Good job!',
      onPressCancel: hideAlert,
      success: true,
    });
  };
  return (
    <Card>
      <CardItem header bordered>
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
