import React from 'react';
import { styles } from './styles';
import { Card, CardItem, Text, View, Button } from '@app/components';

interface Props {
  pushNewScreen: () => void;
  changeTab: () => void;
}

export const NavigationSample = ({ pushNewScreen, changeTab }: Props) => {
  return (
    <Card>
      <CardItem header bordered>
        <Text>Navigation</Text>
      </CardItem>
      <CardItem bordered>
        <View flex column>
          <Button onPress={pushNewScreen} style={styles.button}>
            <Text>Push New Screen</Text>
          </Button>
          <Button onPress={changeTab} style={styles.button}>
            <Text>Change Tab Settings</Text>
          </Button>
        </View>
      </CardItem>
    </Card>
  );
};
