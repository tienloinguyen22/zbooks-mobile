import React from 'react';
import { Card, CardItem, Text, View, Button } from '@app/components';
import { styles } from './styles';

interface Props {
  pushNewScreen: () => void;
  changeTab: () => void;
}

export const NavigationSample = ({ pushNewScreen, changeTab }: Props): JSX.Element => (
  <Card>
    <CardItem header bordered>
      <Text primary>Navigation</Text>
    </CardItem>
    <CardItem bordered>
      <View column>
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
