import React from 'react';
import { View } from 'react-native';
import { Text } from '@app/components';
import { ScreenProps } from '@app/core';

type Props = ScreenProps;

const BaseScreen = (_props: Props): JSX.Element => {
  return (
    <View>
      <Text>Finish register</Text>
    </View>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
