import React from 'react';
import { Card, CardItem, Text, View, Button } from '@app/components';
import { styles } from './styles';

export const CrashSample = (): JSX.Element => {
  const crashTest = (): void => {
    throw new Error('crashTestAsync');
  };

  const crashTestAsync = async (): Promise<void> => {
    throw new Error('crashTestAsync');
  };

  return (
    <Card>
      <CardItem header bordered>
        <Text primary>Crash Handle (open debugger to view console)</Text>
      </CardItem>
      <CardItem bordered>
        <View column>
          <Button onPress={crashTest} style={styles.button}>
            <Text>Crash Test</Text>
          </Button>
          <Button onPress={crashTestAsync} style={styles.button}>
            <Text>Crash Test Async</Text>
          </Button>
        </View>
      </CardItem>
    </Card>
  );
};
