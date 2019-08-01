import React from 'react';
import { Card, CardItem, Text, View, Button } from '@app/components';
import { styles } from './styles';

interface Props {}

export const CrashSample = ({  }: Props) => {
  const crashTest = () => (null as any).crash();

  const crashTestAsync = async () => {
    console.log('crashTestAsync');
    (null as any).crash();
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
