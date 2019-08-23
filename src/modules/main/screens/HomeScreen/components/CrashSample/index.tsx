import React from 'react';
import { Card, CardItem, Text, View, Button } from '@app/components';
import { sleep } from '@app/core';
import { styles } from './styles';

export const CrashSample = (): JSX.Element => {
  const crashTest = (): void => {
    throw new Error('crashTest');
  };

  const crashTestAsync = async (): Promise<void> => {
    await sleep(500);
    throw new Error('crashTestAsync');
  };

  return (
    <Card>
      <CardItem bordered header>
        <Text bold>Crash Handle (open debugger to view console)</Text>
      </CardItem>
      <CardItem bordered>
        <View column>
          <Button onPress={crashTest} style={styles.button}>
            <Text white>Crash Test</Text>
          </Button>
          <Button onPress={crashTestAsync} style={styles.button}>
            <Text white>Crash Test Async</Text>
          </Button>
        </View>
      </CardItem>
    </Card>
  );
};
