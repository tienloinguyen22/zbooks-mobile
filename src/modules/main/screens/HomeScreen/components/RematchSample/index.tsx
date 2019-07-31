import React from 'react';
import { Card, CardItem, Text, View, Button } from '@app/components';
import { styles } from './styles';
import { SharksState, DolphinsState } from '@app/store';

interface Props {
  sharks: SharksState;
  dolphins: DolphinsState;
  incrementShark: () => void;
  incrementSharkAsync: () => void;
  incrementDolphin: () => void;
  incrementDolphinAsync: () => void;
}

export const RematchSample = ({
  sharks,
  dolphins,
  incrementDolphin,
  incrementDolphinAsync,
  incrementShark,
  incrementSharkAsync,
}: Props) => {
  return (
    <>
      <Card>
        <CardItem header bordered>
          <Text primary>Rematch with redux-persist</Text>
        </CardItem>
        <CardItem bordered>
          <View flex column>
            <Text>Sharks: {sharks.count}</Text>
            <Button onPress={incrementShark} style={styles.button}>
              <Text>Raise shark</Text>
            </Button>
            <Button onPress={incrementSharkAsync} style={styles.button}>
              <Text>Raise shark async</Text>
            </Button>
          </View>
        </CardItem>
      </Card>
      <Card>
        <CardItem header bordered>
          <Text primary>Rematch without redux-persist</Text>
        </CardItem>
        <CardItem bordered>
          <View flex column>
            <Text>Dolphins: {dolphins.count}</Text>
            <Button onPress={incrementDolphin} style={styles.button}>
              <Text>Raise dolphin</Text>
            </Button>
            <Button onPress={incrementDolphinAsync} style={styles.button}>
              <Text>Raise dolphin async</Text>
            </Button>
          </View>
        </CardItem>
      </Card>
    </>
  );
};
