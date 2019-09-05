import React from 'react';
import { Card, CardItem, Text, View, Animation } from '@app/components';
import { jsonSources } from '@app/assets';
import { styles } from './styles';

const loading = jsonSources.loading();
export const LottieSample = (): JSX.Element => {
  return (
    <Card>
      <CardItem bordered header>
        <Text primary>Lottie Animations</Text>
      </CardItem>
      <CardItem bordered>
        <View column style={styles.container}>
          <Animation source={loading} width={100} height={100} autoPlay loop />
        </View>
      </CardItem>
    </Card>
  );
};
