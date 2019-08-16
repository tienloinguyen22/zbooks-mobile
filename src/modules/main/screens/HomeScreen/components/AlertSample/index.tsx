import React from 'react';
import { Card, CardItem, Text, View, Button } from '@app/components';
import Alert from '@app/components/Alert';
import { styles } from './styles';

export const AlertSample = (): JSX.Element => {
  const destroySibling = (): void => {
    Alert.hide();
  };
  const addAlertSample = (): void => {
    Alert.show({
      visible: true,
      title: 'Hello',
      message: 'Hello React',
      onPressCancel: destroySibling,
      error: true,
      actions: [
        {
          title: 'Button1',
          onPress: destroySibling,
          special: true,
        },
        {
          title: 'Button2',
          onPress: destroySibling,
          special: false,
        },
        {
          title: 'Cancel',
          onPress: destroySibling,
          special: true,
        },
      ],
    });
  };
  return (
    <Card>
      <CardItem header bordered>
        <Text primary>Alert</Text>
      </CardItem>
      <CardItem bordered>
        <View column>
          <Button onPress={addAlertSample} style={styles.button}>
            <Text>Show alert</Text>
          </Button>
        </View>
      </CardItem>
    </Card>
  );
};
