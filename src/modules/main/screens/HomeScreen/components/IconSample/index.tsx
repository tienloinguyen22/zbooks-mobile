import React from 'react';
import { Card, CardItem, Text, View, Icon } from '@app/components';
import { useTheme } from '@app/core';

export const IconSample = (): JSX.Element => {
  const { primaryColor } = useTheme();
  return (
    <Card>
      <CardItem header bordered>
        <Text bold>Icons</Text>
      </CardItem>
      <CardItem bordered>
        <View>
          <Icon name='face-profile' size={60} color={primaryColor} />
          <Icon name='face-profile' color={primaryColor} />
        </View>
      </CardItem>
    </Card>
  );
};
