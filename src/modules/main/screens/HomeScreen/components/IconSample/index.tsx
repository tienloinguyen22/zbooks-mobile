import React from 'react';
import { Card, CardItem, Text, View, Icon } from '@app/components';

export const IconSample = (): JSX.Element => (
  <Card>
    <CardItem header bordered>
      <Text primary>Icons</Text>
    </CardItem>
    <CardItem bordered>
      <View>
        <Icon name='face-profile' size={60} color='red' />
        <Icon name='face-profile' />
      </View>
    </CardItem>
  </Card>
);
