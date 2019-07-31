import React from 'react';
import { Card, CardItem, Text, View, MaterialVectorIcon, Icon } from '@app/components';

interface Props {}

export const IconSample = ({  }: Props) => {
  return (
    <Card>
      <CardItem header bordered>
        <Text primary>Icons</Text>
      </CardItem>
      <CardItem bordered>
        <View flex column>
          <MaterialVectorIcon name='face-profile' size={60} color='red' />
          <Icon name='ios-analytics' style={{ fontSize: 30, color: 'red' }} />
        </View>
      </CardItem>
    </Card>
  );
};
