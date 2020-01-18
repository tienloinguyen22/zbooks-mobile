import React from 'react';
import { View } from 'react-native';
import { Text } from '@app/components';
import { ScreenProps } from '@app/core';

type Props = ScreenProps;

export const Screen = (_props: Props): JSX.Element => {
  return (
    <View>
      <Text>Finish register</Text>
    </View>
  );
};
