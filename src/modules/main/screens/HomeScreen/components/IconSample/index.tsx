import React from 'react';
import { Card, CardItem, Text, View, MaterialVectorIcon, Icon } from '@app/components';
import { styles } from './styles';

export const IconSample = (): JSX.Element => (
  <Card>
    <CardItem header bordered>
      <Text primary>Icons</Text>
    </CardItem>
    <CardItem bordered>
      <View>
        <MaterialVectorIcon name='face-profile' size={60} color='red' />
        <Icon name='ios-analytics' style={styles.icon} />
      </View>
    </CardItem>
  </Card>
);
