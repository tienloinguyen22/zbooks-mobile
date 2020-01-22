import React from 'react';
import { ScreenProps } from '@app/core';
import { Container } from '@app/components';
import { Text } from 'react-native';

type Props = ScreenProps;

const BaseScreen = (_props: Props): JSX.Element => {
  return (
    <Container>
      <Text>My favorites</Text>
    </Container>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
